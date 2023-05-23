import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { RoleModel } from "../../../Models/RoleModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import { followerStore } from "../../../Redux/FollowerState";
import followerService from "../../../Services/FollowerService";
import { currencyFormatter } from "../../../Utils/CurrencyFormatter";
import dateFormatter from "../../../Utils/DateFormatter";
import "./VacationCard.css";

interface VacationCardProps {
  vacation: VacationModel;
  onPressedDelete(vacationId: number): void;
}

function VacationCard(props: VacationCardProps): JSX.Element {
  const [followerCount, setFollowerCount] = useState<number>(0);

  useEffect(() => {
    updateFollowerCount();

    const unsubscribe = followerStore.subscribe(() => {
      updateFollowerCount();
    });

    return () => {
      unsubscribe();
    };
  });

  function updateFollowerCount() {
    const vacationFollowData = followerStore
      .getState()
      .followersByVacations.find(
        (f) => f.vacationId === props.vacation.vacationId
      );
    setFollowerCount(vacationFollowData.followerCount);
  }

  async function toggleFollowState() {
    const followerOperation = props.vacation.doesFollow
      ? followerService.deleteFollower
      : followerService.addNewFollower;

    await followerOperation({
      userId: authStore.getState().user.userId,
      vacationId: props.vacation.vacationId,
    });
    // const newCount = props.vacation.doesFollow
    //   ? followerCount - 1
    //   : followerCount + 1;
    props.vacation.doesFollow = !props.vacation.doesFollow;
    // setFollowerCount(newCount);
  }

  async function sendDeleteEvent() {
    props.onPressedDelete(props.vacation.vacationId);
  }

  return (
    <div className="VacationCard">
      {authStore.getState().user.roleId === RoleModel.User ? (
        <button
          className={`button ${
            props.vacation.doesFollow ? "unfollow" : "follow"
          }`}
          onClick={() => toggleFollowState()}
        >
          Like ❤️ {followerCount}
        </button>
      ) : (
        <div className="ActionBtns">
          <NavLink to={"#"} onClick={() => sendDeleteEvent()}>
            ❌
          </NavLink>
          <NavLink to={`/vacations/update/${props.vacation.vacationId}`}>
            ✏️
          </NavLink>
        </div>
      )}
      <img src={props.vacation.imageName} alt={props.vacation.destination} />
      {props.vacation.destination} <br />
      {dateFormatter.formatDateForDisplay(props.vacation.startDate)} -{" "}
      {dateFormatter.formatDateForDisplay(props.vacation.endDate)}
      {authStore.getState().user?.roleId === RoleModel.User && (
        <div>
          {currencyFormatter.FormatCurrency(props.vacation.price)} per person
        </div>
      )}
      <hr />
      <div className="Description">{props.vacation.description}</div>
    </div>
  );
}

export default VacationCard;
