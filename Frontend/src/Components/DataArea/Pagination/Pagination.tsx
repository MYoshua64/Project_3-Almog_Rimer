import { useEffect, useState } from "react";
import "./Pagination.css";
import { vacationStore } from "../../../Redux/VacationState";

interface PaginationProps {
  onMovePage(page: number): void;
}

function Pagination(props: PaginationProps): JSX.Element {
  const [page, setPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(1);

  useEffect(() => {
    updateMaxPages();

    const unsubscribe = vacationStore.subscribe(updateMaxPages);

    return () => {
      unsubscribe();
    };
  }, []);

  function updateMaxPages() {
    const vacationCount = vacationStore.getState().vacations.length;
    setMaxPage(Math.ceil(vacationCount / 10));
  }

  function changePage(nextPage: boolean) {
    const direction = nextPage ? 1 : -1;
    props.onMovePage(page + direction);
    setPage(page + direction);
  }

  return (
    <div className="Pagination">
      <button
        disabled={page === 0}
        onClick={() => changePage(false)}
        className="PageBtn"
      >
        ⬅️
      </button>
      <span>
        {" "}
        Page: {page + 1} of {maxPage}{" "}
      </span>
      <button
        disabled={page + 1 >= maxPage}
        onClick={() => changePage(true)}
        className="PageBtn"
      >
        ➡️
      </button>
    </div>
  );
}

export default Pagination;
