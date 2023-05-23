import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { vacationStore } from "../../../Redux/VacationState";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import "./UpdateVacation.css";
import { formValidator } from "../../../Utils/FormValidator";
import dateFormatter from "../../../Utils/DateFormatter";

function UpdateVacation(): JSX.Element {
  const { vacationId } = useParams();
  const { register, handleSubmit, setValue } = useForm<VacationModel>();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Update Vacation Page";
    const vacationToUpdate: VacationModel = vacationStore
      .getState()
      .vacations?.find((v) => v.vacationId === +vacationId);
    setValue("destination", vacationToUpdate?.destination);
    setValue("description", vacationToUpdate?.description);

    setValue(
      "startDate",
      dateFormatter.formatDateAsISO(vacationToUpdate.startDate)
    );
    setValue(
      "endDate",
      dateFormatter.formatDateAsISO(vacationToUpdate.endDate)
    );
    setValue("price", vacationToUpdate?.price);
  });

  async function send(vacation: VacationModel) {
    try {
      vacation.vacationId = +vacationId;

      if (vacation.image) {
        vacation.image = (vacation.image as unknown as FileList)[0];
      }

      formValidator.validateVacationEditForm(vacation);
      await vacationService.updateVacation(vacation);
      notifyService.success("Vacation updated successfully!");
      navigate("/list");
    } catch (err) {
      notifyService.error(err);
    }
  }

  return (
    <div className="UpdateVacation Box">
      <h2>Edit Vacation</h2>

      <form onSubmit={handleSubmit(send)}>
        <label>Destination:</label>
        <input type="text" name="destination" {...register("destination")} />
        <label>Description:</label>
        <textarea
          name="description"
          rows={10}
          {...register("description")}
        ></textarea>
        <label>Start Date:</label>
        <input name="startDate" type="date" {...register("startDate")} />
        <label>End Date:</label>
        <input name="endDate" type="date" {...register("endDate")} />
        <label>Price:</label>
        <input name="price" type="number" step={0.01} {...register("price")} />
        <label>Image:</label>
        <input
          name="image"
          type="file"
          accept="image/*"
          {...register("image")}
        />
        <button>Update</button>
      </form>
    </div>
  );
}

export default UpdateVacation;
