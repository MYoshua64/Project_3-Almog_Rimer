import { UploadedFile } from "express-fileupload";
import Joi, { ref } from "joi";

class VacationModel {
  public vacationId: number;
  public destination: string;
  public description: string;
  public startDate: string;
  public endDate: string;
  public price: number;
  public imageName: string;
  public image: UploadedFile;

  public constructor(vacation: VacationModel) {
    this.vacationId = vacation.vacationId;
    this.destination = vacation.destination;
    this.description = vacation.description;
    this.startDate = vacation.startDate;
    this.endDate = vacation.endDate;
    this.price = vacation.price;
    this.imageName = vacation.imageName;
    this.image = vacation.image;
  }

  public validateAdd() {
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
      imageName: Joi.string(),
      image: Joi.object().required().messages({
        "any.required": "Image is required!",
      }),
    });

    Joi.assert(this, vacationSchema);
  }

  public validateUpdate() {
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
      imageName: Joi.string(),
      image: Joi.object(),
    });

    Joi.assert(this, vacationSchema);
  }
}

export default VacationModel;
