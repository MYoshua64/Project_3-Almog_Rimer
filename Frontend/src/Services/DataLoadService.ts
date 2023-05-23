import followerService from "./FollowerService";
import vacationService from "./VacationService";

class DataLoadService {
  public async LoadAllData(): Promise<void> {
    await vacationService.getAllVacations();
    await followerService.getAllFollowersByVacations();
  }
}

const dataLoadService = new DataLoadService();
export default dataLoadService;
