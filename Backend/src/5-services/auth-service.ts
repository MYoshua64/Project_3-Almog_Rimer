import { OkPacket } from "mysql";
import { UnauthorizedError, ValidationError } from "../2-models/client-errors";
import { RoleModel } from "../2-models/role-model";
import UserModel from "../2-models/user-model";
import dal from "../4-utils/dal";
import cyber from "../4-utils/cyber";
import CredentialsModel from "../2-models/credentials-model";

//Register new user:
async function register(user: UserModel): Promise<string> {
  //Validate user was sent correctly
  user.validate();

  //Hash user's mail address
  user.mailAddress = cyber.createHash(user.mailAddress);

  //Check if user's email address is taken
  const isMailTaken = await isMailAddressTaken(user.mailAddress);
  if (isMailTaken) throw new ValidationError("Mail address already taken!");

  user.roleId = RoleModel.User; //Regular user

  //Hash user's password before registering to database
  user.password = cyber.createHash(user.password);

  //Insert user data into database
  const sql = `
        INSERT INTO users
        VALUES(DEFAULT, ?, ?, ?, ?, ?);
    `;

  const response: OkPacket = await dal.execute(sql, [
    user.firstName,
    user.lastName,
    user.mailAddress,
    user.password,
    user.roleId,
  ]);

  //Set back user id to match database
  user.userId = response.insertId;

  //Generate token and return it
  return cyber.createToken(user);
}

//Login existing user
async function login(credentials: CredentialsModel): Promise<string> {
  //Validate credentials were sent correctly
  credentials.validate();

  //Hash credentials mail address and password for comparing with db
  credentials.mailAddress = cyber.createHash(credentials.mailAddress);
  credentials.password = cyber.createHash(credentials.password);

  //Try to pull user from database using credentials
  const sql = `
    SELECT *
    FROM users
    WHERE mailAddress = ?
    AND password = ?
  `;
  const result = await dal.execute(sql, [
    credentials.mailAddress,
    credentials.password,
  ]);

  //If no result was found, throw unauthorized error
  if (result.length === 0)
    throw new UnauthorizedError("Mail address or password are incorrect!");

  //Result was found, get the returned user as UserModel
  const user = new UserModel(result[0]);

  //Create corresponding token and return it
  return cyber.createToken(user);
}

// Is mail address taken
async function isMailAddressTaken(address: string): Promise<boolean> {
  const sql = `
        SELECT EXISTS(
            SELECT *
            FROM users
            WHERE mailAddress = ?
            )
        AS isTaken
    `;

  const result = await dal.execute(sql, [address]);
  const isTaken = result[0].isTaken;
  return isTaken === 1;
}

export default {
  register,
  login,
};
