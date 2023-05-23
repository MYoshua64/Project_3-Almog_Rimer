import UserModel from "../2-models/user-model";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Request } from "express";
import { UnauthorizedError } from "../2-models/client-errors";
import { RoleModel } from "../2-models/role-model";

const secretKey = "Vacations4All2023";
const salt = "MyV@c4710n5173";

function createToken(user: UserModel): string {
  //Remove password before creating the token
  delete user.password;

  //Create container containing the user:
  const container = { user };

  //Create options:
  const options = {
    expiresIn: "3h",
  };

  //Create token:
  const token = jwt.sign(container, secretKey, options);

  return token;
}

function createHash(sequence: string): string {
  return crypto
    .createHash("sha512")
    .update(sequence)
    .update(salt, "utf-8")
    .digest("hex");
}

//The token is in a header named authorization
//authorization: "Bearer the-token"
//                01234567
async function verifyToken(request: Request): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    checkTokenValidity(request, resolve, reject);
  });
}

async function verifyAdmin(request: Request): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    checkTokenValidity(request, resolve, reject, true);
  });
}

function checkTokenValidity(
  request: Request,
  resolve,
  reject,
  checkForAdmin = false
) {
  //Extract header:
  const header = request.header("authorization");

  //If no header:
  if (!header) {
    reject(new UnauthorizedError("Incorrect mail or password 1"));
    return;
  }

  //Extract token from within header:
  const token = header.substring(7);

  //If no token:
  if (!token) {
    reject(new UnauthorizedError("Incorrect mail or password 2"));
    return;
  }

  //Verify:
  jwt.verify(token, secretKey, (err, container: { user: UserModel }) => {
    if (err) {
      reject(new UnauthorizedError("Invalid token"));
      return;
    }

    if (checkForAdmin) {
      //Extract user from token
      const user = container.user;

      //If user is not admin:
      if (user.roleId !== RoleModel.Admin) {
        reject(new UnauthorizedError("Access denied"));
        return;
      }
    }

    //All is good:
    resolve(true);
  });
}

export default {
  createToken,
  createHash,
  verifyToken,
  verifyAdmin,
};
