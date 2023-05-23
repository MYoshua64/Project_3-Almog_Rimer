import Joi, { ref } from "joi";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import VacationModel from "../Models/VacationModel";

class FormValidator {
  public validateRegisterForm(sentForm: UserModel) {
    const registerSchema = Joi.object<UserModel>({
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
    });

    Joi.assert(sentForm, registerSchema);
  }

  public validateLoginForm(sentForm: CredentialsModel) {
    const loginSchema = Joi.object<CredentialsModel>({
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

    Joi.assert(sentForm, loginSchema);
  }

  public validateVacationAddForm(sentForm: VacationModel) {
    const vacationSchema = Joi.object<VacationModel>({
      destination: Joi.string().min(3).required().messages({
        "string.min": "Destination must be at least 3 characters long!",
        "string.empty": "Destination is a required field!",
      }),
      description: Joi.string().required().min(10).messages({
        "string.min": "Description must be at least 10 characters long!",
        "string.empty": "Description is a required field!",
      }),
      startDate: Joi.date().greater("now").messages({
        "date.base": "Start Date is a required field!",
        "date.greater": "Start Date must not be in the past!",
      }),
      endDate: Joi.date().greater(ref("startDate")).required().messages({
        "date.base": "End date is a required field!",
        "date.greater": "End date must be after start date!",
      }),
      price: Joi.number().positive().max(10000).required().messages({
        "number.positive": "Price must be a positive number!",
        "number.max": "Price must be less than 10,000!",
      }),
      image: Joi.object().required().messages({
        "any.required": "Image is required!",
      }),
    });

    Joi.assert(sentForm, vacationSchema);
  }

  public validateVacationEditForm(sentForm: VacationModel) {
    const vacationSchema = Joi.object<VacationModel>({
      vacationId: Joi.number(),
      destination: Joi.string().min(3).required().messages({
        "string.min": "Destination must be at least 3 characters long!",
        "string.empty": "Destination is a required field!",
      }),
      description: Joi.string().required().min(10).messages({
        "string.min": "Description must be at least 10 characters long!",
        "string.empty": "Description is a required field!",
      }),
      startDate: Joi.date().greater("now").messages({
        "date.base": "Start Date is a required field!",
        "date.greater": "Start Date must not be in the past!",
      }),
      endDate: Joi.date().greater(ref("startDate")).required().messages({
        "date.base": "End date is a required field!",
        "date.greater": "End date must be after start date!",
      }),
      price: Joi.number().positive().max(10000).required().messages({
        "number.positive": "Price must be a positive number!",
        "number.max": "Price must be less than 10,000!",
      }),
      image: Joi.object(),
    });

    Joi.assert(sentForm, vacationSchema);
  }
}

export const formValidator = new FormValidator();
