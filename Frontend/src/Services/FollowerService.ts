import axios from "axios";
import FollowerCountModel from "../Models/FollowerCountModel";
import FollowerModel from "../Models/FollowerModel";
import { FollowerActionType, followerStore } from "../Redux/FollowerState";
import appConfig from "../Utils/AppConfig";

class FollowerService {
  public async getAllFollowersByVacations(): Promise<FollowerCountModel[]> {
    const response = await axios.get<FollowerCountModel[]>(
      appConfig.followersUrl + "by-vacations"
    );
    const followerCount = response.data;
    followerStore.dispatch({
      type: FollowerActionType.GetFollowersByVacations,
      payload: followerCount,
    });
    return followerCount;
  }

  public async addNewFollower(follower: FollowerModel): Promise<FollowerModel> {
    const response = await axios.post<FollowerModel>(
      appConfig.followersUrl,
      follower
    );
    const newFollower = response.data;
    const destination = followerStore
      .getState()
      .followersByVacations.find(
        (f) => f.vacationId === follower.vacationId
      ).destination;
    followerStore.dispatch({
      type: FollowerActionType.AddFollower,
      payload: destination,
    });
    return newFollower;
  }

  public async deleteFollower(follower: FollowerModel): Promise<void> {
    await axios.delete<FollowerModel>(
      appConfig.followersUrl +
        `/user/${follower.userId}/vacation/${follower.vacationId}`
    );
    const destination = followerStore
      .getState()
      .followersByVacations.find(
        (f) => f.vacationId === follower.vacationId
      ).destination;
    followerStore.dispatch({
      type: FollowerActionType.RemoveFollower,
      payload: destination,
    });
  }
}

const followerService = new FollowerService();

export default followerService;
