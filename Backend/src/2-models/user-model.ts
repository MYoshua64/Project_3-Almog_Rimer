import Joi from "joi";
import cyber from "../4-utils/cyber";

class UserModel {
  public userId: number;
  public firstName: string;
  public lastName: string;
  public mailAddress: string;
  public password: string;
  public roleId: number;

  public constructor(user: UserModel) {
    this.userId = user.userId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.mailAddress = user.mailAddress;
    this.password = user.password;
    this.roleId = user.roleId;
  }

  public validate() {
    const userSchema = Joi.object<UserModel>({
      userId: Joi.number(),
      firstName: Joi.string().min(3).required().messages({
        "string.min": "First name needs to be at least 3 characters long!",
        "string.empty": "First name is a required field!",
      }),
      lastName: Joi.string().min(3).required().messages({
        "string.min": "Last name needs to be at least 3 characters long!",
        "string.empty": "Last name is a required field!",
      }),
      mailAddress: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          "string.empty": "Email Address is a required field!",
          "string.email": "Email address must be a valid email!",
        }),
      password: Joi.string().min(4).required().messages({
        "string.min": "Password needs to be at least 4 characters long!",
        "string.empty": "Password is a required field!",
      }),
      roleId: Joi.number(),
    });

    Joi.assert(this, userSchema);
  }
}

export default UserModel;
