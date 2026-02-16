import { useState } from "react";
import CountUp from "react-countup";
import "./Dashboard.css";
import download from '../../../assets/download.svg';
import schedule from '../../../assets/schedule.svg';
import TrendChart from "../TrendChart/TrendChart";
import DrillPerformancePie from "../DrillPerformancePie/DrillPerformancePie";
import CaseBarChart from "../BarChart/BarChart";

export default function Dashboard() {
  const [showPortal, setShowPortal] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("low");

  // send legal notice instead of disaster alert
  const handleSend = async () => {
    if (!message) return alert("Notice cannot be empty");

    try {
      const res = await fetch("http://localhost:5000/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, severity }),
      });

      const data = await res.json();
      console.log("📨 Notice issued:", data);

      setMessage("");
      setSeverity("low");
      setShowPortal(false);
    } catch (err) {
      console.error("❌ Error issuing notice:", err);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <div className="dashboard-top-segment1">
          <h1>Judiciary Case Dashboard</h1>
          <p>Monitor court case activity, hearings, and legal notices</p>
        </div>

        <div className="dashboard-top-segment2">
          <div className="export">
            <img src={download} alt="" />
            <p>Download Case Report</p>
          </div>

          <div className="schedule-drill">
            <img src={schedule} alt="" />
            <p>Schedule Hearing</p>
          </div>

          <div className="export" onClick={() => setShowPortal(true)}>
            Issue Court Notice
          </div>

          {showPortal && (
            <div className="alert-portal-overlay">
              <div className="alert-portal">
                <h2>Issue Legal Notice</h2>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type court notice..."
                />

                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                >
                  <option value="low">Routine</option>
                  <option value="medium">Important</option>
                  <option value="high">Urgent</option>
                </select>

                <div className="portal-buttons">
                  <button onClick={handleSend}>Send</button>
                  <button onClick={() => setShowPortal(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="cards">
        <div className="card blue">
          <span>Pending Cases</span>
          {/* <CountUp end={15432} duration={1.2} separator="," /> */}
        </div>

        <div className="card green">
          <span>Cases Under Trial</span>
          {/* <CountUp end={9321} duration={1.5} separator="," /> */}
        </div>

        <div className="card purple">
          <span>Disposed Cases</span>
          {/* <CountUp end={12450} duration={1.8} separator="," /> */}
        </div>

        <div className="card yellow">
          <span>Registered Advocates</span>
          {/* <CountUp end={642} duration={1.2} /> */}
        </div>
      </div>

      {/* Charts */}
      <div className="charts">
        <div className="chart-card">
          <TrendChart />
        </div>

        <div className="chart-card">
          <DrillPerformancePie />
        </div>
      </div>

      <div className="barchart">
        <CaseBarChart />
      </div>
    </div>
  );
}
