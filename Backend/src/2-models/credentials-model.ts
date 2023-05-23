import Joi from "joi";
import cyber from "../4-utils/cyber";

class CredentialsModel {
  public mailAddress: string;
  public password: string;

  public constructor(credentials: CredentialsModel) {
    this.mailAddress = credentials.mailAddress;
    this.password = credentials.password;
  }

  public validate() {
    const credentialsSchema = Joi.object<CredentialsModel>({
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
    });

    Joi.assert(this, credentialsSchema);
  }
}

export default CredentialsModel;
