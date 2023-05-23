import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import "./AddVacation.css";
import { formValidator } from "../../../Utils/FormValidator";
import { useEffect } from "react";

function AddVacation(): JSX.Element {
  const { register, handleSubmit } = useForm<VacationModel>();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Vacation Page";
  });

  async function send(vacation: VacationModel) {
    try {
      vacation.image = (vacation.image as unknown as FileList)[0];
      formValidator.validateVacationAddForm(vacation);
      await vacationService.addNewVacation(vacation);
      notifyService.success("Vacation added successfully!");
      navigate("/list");
    } catch (err) {
      notifyService.error(err);
    }
  }

  return (
    <div className="AddVacation Box">
      <h2>Add New Vacation</h2>

      <form onSubmit={handleSubmit(send)}>
        <label>Destination:</label>
        <input type="text" {...register("destination")} />
        <label>Description:</label>
        <textarea rows={10} {...register("description")}></textarea>
        <label>Start Date:</label>
        <input type="date" {...register("startDate")} />
        <label>End Date:</label>
        <input type="date" {...register("endDate")} />
        <label>Price:</label>
        <input type="number" step={0.01} {...register("price")} />
        <label>Image:</label>
        <input type="file" accept="image/*" {...register("image")} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddVacation;
