import "./Home.css";
import imageSrc from "../../../Assets/Images/abe53cec-e39a-4121-bd31-d44a3e1251d1.jpg";
import { useEffect } from "react";

function Home(): JSX.Element {
  useEffect(() => {
    document.title = "Home Page";
  });

  return (
    <div className="Home">
      <h2>Home Page</h2>
      <img src={imageSrc} />
    </div>
  );
}

export default Home;
