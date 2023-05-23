import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./FollowReport.css";
import { followerStore } from "../../../Redux/FollowerState";
import { CSVLink } from "react-csv";
import FollowerCountModel from "../../../Models/FollowerCountModel";

function FollowReport(): JSX.Element {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

  const [csvData, setCSVData] = useState<FollowerCountModel[]>([]);

  useEffect(() => {
    document.title = "Follow Report Page";
    setCSVData(followerStore.getState().followersByVacations);
  }, []);

  const headers = [
    { label: "Destination", key: "destination" },
    { label: "Follower Count", key: "followerCount" },
  ];

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Vacations Report",
      },
    },
  };

  const labels = csvData.map((data) => data.destination);

  const data = {
    labels,
    datasets: [
      {
        label: "Followers",
        data: csvData.map((data) => data.followerCount.toString()),
        backgroundColor: "#FFC090",
      },
    ],
  };

  return (
    <div className="FollowReport">
      <h2>Follower Report for Vacations</h2>
      <Bar data={data} options={options} />
      <CSVLink
        data={csvData}
        headers={headers}
        filename={`Vacation Follow Report ${new Date().toLocaleDateString()}`}
      >
        Download CSV
      </CSVLink>
    </div>
  );
}

export default FollowReport;
