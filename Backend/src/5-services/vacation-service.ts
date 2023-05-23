import { OkPacket } from "mysql";
import VacationModel from "../2-models/vacation-model";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import imageHandler from "../4-utils/image-handler";
import {
  ResourceNotFoundError,
  ValidationError,
} from "../2-models/client-errors";

async function getAllVacations(userId: number): Promise<VacationModel[]> {
  const sql = `
      SELECT 
        V.vacationId,
        V.destination,
        V.description,
        V.startDate,
        V.endDate,
        V.price,
        CONCAT('${appConfig.imagesUrl}', V.imageName) AS imageName,
        EXISTS(SELECT * FROM followers where F.vacationId = V.vacationId AND F.userId = ?) AS doesFollow
      FROM vacations AS V
      LEFT JOIN (SELECT * FROM followers where userId = ?) AS F
      ON V.vacationId = F.vacationId
      ORDER BY startDate;
    `;
  const result = await dal.execute(sql, [userId, userId]);
  for (let i = 0; i < result?.length; i++) {
    result[i].doesFollow = result[i].doesFollow === 1;
  }
  return result;
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
  //Validate vacation was sent correctly:
  vacation.validateAdd();

  let imageName: string = "";

  //if we have an image sent to us:
  if (vacation.image) {
    //Save image
    imageName = await imageHandler.saveImage(vacation.image);

    //Set back image name
    vacation.imageName = imageName;
  }

  //Add vacation to database:
  const sql = `INSERT INTO vacations
            VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;

  const response: OkPacket = await dal.execute(sql, [
    vacation.destination,
    vacation.description,
    vacation.startDate,
    vacation.endDate,
    vacation.price,
    vacation.imageName,
  ]);

  //Set back vacation id to match database
  vacation.vacationId = response.insertId;

  //Remove image file from returned vacation
  delete vacation.image;

  //Return vacation
  return vacation;
}

async function deleteVacation(vacationId: number): Promise<void> {
  const isVacationValid = await doesVacationExist(vacationId);
  if (!isVacationValid) {
    throw new ValidationError(
      "Vacation with id of " + vacationId + " was not found!"
    );
  }

  const sql = `
    DELETE
    FROM vacations
    WHERE vacationId = ?
  `;

  await dal.execute(sql, [vacationId]);
}

async function updateVacation(
  vacationData: VacationModel
): Promise<VacationModel> {
  //Validate vacation was sent correctly:
  vacationData.validateUpdate();

  //Check if vacation exists
  const isVacationValid = await doesVacationExist(vacationData.vacationId);
  if (!isVacationValid) {
    throw new ValidationError(
      "Vacation with id of " + vacationData.vacationId + " was not found!"
    );
  }

  //Vacation exists. Next we handle image.
  let imageName = await getImageNameFromDB(vacationData.vacationId);
  console.log(vacationData.image);

  if (vacationData.image) {
    imageName = await imageHandler.updateImage(vacationData.image, imageName);
  }

  //Set back image name
  vacationData.imageName = imageName;

  //We have the data. Update the db entry
  const sql = `
    UPDATE vacations
    SET
      destination = ?,
      description = ?,
      startDate = ?,
      endDate = ?,
      price = ?,
      imageName = ?
    WHERE vacationId = ?;
  `;

  const response: OkPacket = await dal.execute(sql, [
    vacationData.destination,
    vacationData.description,
    vacationData.startDate,
    vacationData.endDate,
    vacationData.price,
    vacationData.imageName,
    vacationData.vacationId,
  ]);

  //If no rows were affected, throw an error
  if (response.affectedRows === 0)
    throw new ResourceNotFoundError(vacationData.vacationId);

  //Change was made. Remove image file before returning
  delete vacationData.image;

  //Return the data
  return vacationData;
}

async function doesVacationExist(vacationId: number): Promise<boolean> {
  const sql = `
      SELECT
          EXISTS (
            SELECT *
            from vacations
            WHERE vacationId = ?
          )
          AS doesExist
      `;

  const result = await dal.execute(sql, [vacationId]);
  return result[0].doesExist === 1;
}

async function getImageNameFromDB(vacationId: number): Promise<string> {
  const sql = `
    SELECT imageName
    FROM vacations
    WHERE vacationId = ?;
  `;

  const response = await dal.execute(sql, [vacationId]);
  return response[0].imageName;
}

export default {
  getAllVacations,
  addVacation,
  deleteVacation,
  updateVacation,
};
