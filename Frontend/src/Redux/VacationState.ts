import { configureStore } from "@reduxjs/toolkit";
import VacationModel from "../Models/VacationModel";

// 1. Vacation State
export class VacationState {
  public vacations: VacationModel[];
}
// 2. Vacation Action Enum
export enum VacationActionType {
  GetVacations,
  AddNewVacation,
  UpdateVacation,
  DeleteVacation,
}
// 3. Vacation Action Interface
export interface VacationAction {
  type: VacationActionType;
  payload: any;
}
// 4. Reducer
function vacationReducer(
  currentState = new VacationState(),
  action: VacationAction
): VacationState {
  const newState: VacationState = JSON.parse(JSON.stringify(currentState));
  switch (action.type) {
    case VacationActionType.GetVacations: //Here the payload is a VacationModel[]
      newState.vacations = action.payload;
      break;
    case VacationActionType.AddNewVacation: //Here the payload is a VacationModel
      newState.vacations.push(action.payload);
      break;
    case VacationActionType.UpdateVacation: {
      //Here the payload is a VacationModel
      const vacationIndex = newState.vacations.findIndex(
        (v) => v.vacationId === action.payload.vacationId
      );
      newState.vacations[vacationIndex] = action.payload;
      break;
    }
    case VacationActionType.DeleteVacation: {
      //Here the payload is a VacatinoModel index
      const vacationIndex = newState.vacations.findIndex(
        (v) => v.vacationId === action.payload
      );
      newState.vacations.splice(vacationIndex, 1);
      break;
    }
  }

  return newState;
}
// 5. Vacation Store
export const vacationStore = configureStore({
  reducer: vacationReducer,
});
