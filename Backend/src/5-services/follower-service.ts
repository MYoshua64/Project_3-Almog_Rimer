import { OkPacket } from "mysql";
import { ValidationError } from "../2-models/client-errors";
import FollowerModel from "../2-models/follower-model";
import dal from "../4-utils/dal";
import FollowerCountModel from "../2-models/follower-count-model";

async function getAllFollowers(): Promise<FollowerModel[]> {
  const sql = `SELECT
        userId,
        vacationId
        FROM followers`;
  const result = await dal.execute(sql);
  return result;
}

async function getAllFollowersByVacations(): Promise<FollowerCountModel[]> {
  const sql = `SELECT
      V.vacationId, 
      V.destination, 
      COUNT(F.userId) AS followerCount
      FROM followers AS F
      RIGHT JOIN vacations as V
      ON F.vacationId = V.vacationId
      GROUP BY V.destination;
  `;
  const result = await dal.execute(sql);
  return result;
}

async function addNewFollower(follower: FollowerModel): Promise<FollowerModel> {
  const sql = `INSERT INTO followers
        VALUES(DEFAULT, ?, ?)`;
  const response: OkPacket = await dal.execute(sql, [
    follower.userId,
    follower.vacationId,
  ]);
  return follower;
}

async function removeFollower(follower: FollowerModel): Promise<void> {
  const doesVacationFollowerExist = await doesFollowerExist(follower);
  if (!doesVacationFollowerExist)
    throw new ValidationError("Follower does not exist, cannot delete!");

  const sql = `
        DELETE
        FROM followers
        WHERE userId = ?
        AND vacationId = ?
    `;
  await dal.execute(sql, [follower.userId, follower.vacationId]);
}

async function doesFollowerExist(follower: FollowerModel): Promise<boolean> {
  const sql = `
        SELECT EXISTS(
            SELECT *
            FROM followers
            WHERE userId = ?
            AND vacationId = ?)
        AS doesExist
    `;
  const result = await dal.execute(sql, [follower.userId, follower.vacationId]);
  const doesExist = result[0].doesExist;
  return doesExist === 1;
}

export default {
  getAllFollowers,
  getAllFollowersByVacations,
  addNewFollower,
  removeFollower,
};
