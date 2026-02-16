import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./DrillPerformancePie.css";

// Case status distribution
const data = [
  { name: "Disposed", value: 520 },
  { name: "Under Trial", value: 410 },
  { name: "Pending", value: 300 },
  { name: "Stayed", value: 120 },
  { name: "Appeals Filed", value: 90 },
];

const COLORS = ["#2ecc71", "#3498db", "#f1c40f", "#e67e22", "#e74c3c"];

function DrillPerformancePie() {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="pie-chart-container">
      <h2 className="pie-chart-title">Case Status Distribution</h2>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={140}
            dataKey="value"
            label={({ value }) => `${((value / total) * 100).toFixed(1)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip formatter={(value) => `${value} cases`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DrillPerformancePie;
