import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationActionType, vacationStore } from "../Redux/VacationState";
import appConfig from "../Utils/AppConfig";
import { authStore } from "../Redux/AuthState";

class VacationService {
  public async getAllVacations(): Promise<VacationModel[]> {
    const response = await axios.get<VacationModel[]>(
      appConfig.vacationsUrl + authStore.getState().user.userId
    );
    const vacations = response.data;

    vacationStore.dispatch({
      type: VacationActionType.GetVacations,
      payload: vacations,
    });
    return vacations;
  }

  public async addNewVacation(vacation: VacationModel): Promise<void> {
    //Create header for sending image to server
    const headers = {
      "Content-type": "multipart/form-data",
    };

    const response = await axios.post<VacationModel>(
      appConfig.vacationsUrl,
      vacation,
      {
        headers,
      }
    );
    const addedVacation = response.data;
    vacationStore.dispatch({
      type: VacationActionType.AddNewVacation,
      payload: addedVacation,
    });
  }

  public async deleteVacation(vacationId: number): Promise<void> {
    await axios.delete(appConfig.vacationsUrl + vacationId);
    vacationStore.dispatch({
      type: VacationActionType.DeleteVacation,
      payload: vacationId,
    });
  }

  public async updateVacation(vacation: VacationModel): Promise<void> {
    const headers = {
      "Content-type": "multipart/form-data",
    };

    const response = await axios.put(
      appConfig.vacationsUrl + vacation.vacationId,
      vacation,
      {
        headers,
      }
    );

    const updatedVacation = response.data;

    vacationStore.dispatch({
      type: VacationActionType.UpdateVacation,
      payload: updatedVacation,
    });
  }
}

const vacationService = new VacationService();

export default vacationService;
