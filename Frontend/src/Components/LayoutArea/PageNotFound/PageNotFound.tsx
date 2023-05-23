import "./PageNotFound.css";
import imageSrc from "../../../Assets/Images/795e69aa-3c24-4b56-a8f0-3028d7fa508d.jpg";
import { useEffect } from "react";

function PageNotFound(): JSX.Element {
  useEffect(() => {
    document.title = "Page Not Found";
  });

  return (
    <div className="PageNotFound">
      <h2>Page not found!</h2>
      <img src={imageSrc} alt="Page Not Found" />
    </div>
  );
}

export default PageNotFound;
