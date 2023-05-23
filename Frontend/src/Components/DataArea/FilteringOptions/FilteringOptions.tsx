import { ChangeEvent, useState } from "react";
import "./FilteringOptions.css";

interface FilteringOptionsProps {
  onToggleFollowing(checked: boolean): void;
  onToggleFuture(checked: boolean): void;
  onToggleInProgress(checked: boolean): void;
}

function FilteringOptions(props: FilteringOptionsProps): JSX.Element {
  const [showingNotStarted, setShowingNotStarted] = useState<boolean>(false);
  const [showingInProgress, setShowingInProgress] = useState<boolean>(false);

  function toggleNotStarted(event: ChangeEvent<HTMLInputElement>) {
    props.onToggleFuture(event.target.checked);
    setShowingNotStarted(event.target.checked);
  }

  function toggleInProgress(event: ChangeEvent<HTMLInputElement>) {
    props.onToggleInProgress(event.target.checked);
    setShowingInProgress(event.target.checked);
  }

  return (
    <div className="FilteringOptions">
      <label>Toggle Only Following: </label>
      <input
        type="checkbox"
        onChange={(e) => props.onToggleFollowing(e.target.checked)}
      />
      <span> | </span>
      <label>Toggle Not Started Yet: </label>
      <input
        type="checkbox"
        onChange={toggleNotStarted}
        disabled={showingInProgress}
      />
      <span> | </span>
      <label>Toggle In Progress: </label>
      <input
        type="checkbox"
        onChange={toggleInProgress}
        disabled={showingNotStarted}
      />
    </div>
  );
}

export default FilteringOptions;
