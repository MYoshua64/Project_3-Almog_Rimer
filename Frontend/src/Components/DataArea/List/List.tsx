import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { RoleModel } from "../../../Models/RoleModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import { vacationStore } from "../../../Redux/VacationState";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import FilteringOptions from "../FilteringOptions/FilteringOptions";
import Pagination from "../Pagination/Pagination";
import VacationCard from "../VacationCard/VacationCard";
import "./List.css";

function List(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [page, setPage] = useState<number>(0);

  const [showingFollowing, setShowingFollowing] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Vacations List Page";
    setVacations(vacationStore.getState().vacations);

    const unsubscribe = vacationStore.subscribe(() => {
      setVacations(vacationStore.getState().vacations);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function toggleFollowing(checked: boolean) {
    if (checked) {
      setVacations(vacations.filter((v) => v.doesFollow));
      setShowingFollowing(true);
    } else {
      setVacations(vacationStore.getState().vacations);
      setShowingFollowing(false);
    }
  }

  function toggleNotStarted(checked: boolean) {
    if (checked) {
      setVacations(vacations.filter((v) => new Date(v.startDate) > new Date()));
    } else {
      if (showingFollowing) {
        setVacations(
          vacationStore.getState().vacations.filter((v) => v.doesFollow)
        );
      } else {
        setVacations(vacationStore.getState().vacations);
      }
    }
  }

  function toggleInProgress(checked: boolean) {
    const today = new Date();
    if (checked) {
      setVacations(
        vacationStore
          .getState()
          .vacations.filter(
            (v) => new Date(v.startDate) < today && new Date(v.endDate) > today
          )
      );
    } else {
      if (showingFollowing) {
        setVacations(
          vacationStore.getState().vacations.filter((v) => v.doesFollow)
        );
      } else {
        setVacations(vacationStore.getState().vacations);
      }
    }
  }

  async function confirmDeleteVacation(vacationId: number) {
    try {
      const confirm = window.confirm(
        `Are you sure you want to delete this vacation?`
      );
      if (confirm) {
        await vacationService.deleteVacation(vacationId);
        notifyService.success("Vacation was deleted successfully!");
      }
    } catch (err) {
      notifyService.error(err);
    }
  }

  return (
    <div className="List">
      {authStore.getState().user?.roleId === RoleModel.Admin && (
        <div className="AdminActions">
          <NavLink to={"/insert"}>➕</NavLink>
          <span> | </span>
          <NavLink to={"/vacations/report"}>Report</NavLink>
        </div>
      )}
      {authStore.getState().user?.roleId === RoleModel.User && (
        <FilteringOptions
          onToggleFollowing={toggleFollowing}
          onToggleFuture={toggleNotStarted}
          onToggleInProgress={toggleInProgress}
        />
      )}
      <div>
        {vacations.slice(page * 10, (page + 1) * 10).map((v) => (
          <VacationCard
            vacation={v}
            onPressedDelete={confirmDeleteVacation}
            key={v.vacationId}
          />
        ))}
      </div>
      <Pagination onMovePage={(newPage) => setPage(newPage)} />
    </div>
  );
}

export default List;
