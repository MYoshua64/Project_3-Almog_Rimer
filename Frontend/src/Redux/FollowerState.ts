import { configureStore } from "@reduxjs/toolkit";
import FollowerCountModel from "../Models/FollowerCountModel";

// 1. Follower State
export class FollowerState {
  public followersByVacations: FollowerCountModel[];
}
// 2. Follower Action Types
export enum FollowerActionType {
  GetFollowersByVacations = "GetFollowersByVacations",
  AddFollower = "AddFollower",
  RemoveFollower = "RemoveFollower",
}
// 3. Follower Action
export interface FollowerAction {
  type: FollowerActionType;
  payload: any;
}
// 4. State Reducer:
function followerReducer(
  currentState = new FollowerState(),
  action: FollowerAction
): FollowerState {
  const newState: FollowerState = JSON.parse(JSON.stringify(currentState));
  // const newState = {
  //   ...currentState,
  // };

  switch (action.type) {
    case FollowerActionType.GetFollowersByVacations:
      //Here the payload is a FollowerCountModel[]
      newState.followersByVacations = action.payload;
      break;
    case FollowerActionType.AddFollower:
      //Here the payload is a destination string
      const vacationToAdd = newState.followersByVacations.findIndex(
        (f) => f.destination === action.payload
      );
      newState.followersByVacations[vacationToAdd].followerCount++;
      break;
    case FollowerActionType.RemoveFollower:
      //Here the payload is a destination string
      const vacationToRemove = newState.followersByVacations.findIndex(
        (f) => f.destination === action.payload
      );
      newState.followersByVacations[vacationToRemove].followerCount--;
      break;
  }

  return newState;
}

// 5. Follower Store
export const followerStore = configureStore({
  reducer: followerReducer,
});
