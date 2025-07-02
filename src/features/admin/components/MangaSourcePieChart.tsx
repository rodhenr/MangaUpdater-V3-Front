import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ISourceDistributionResponse } from "../../../api/source/source.types";

const colors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA66CC",
  "#FF6699",
];

export const MangaSourcePieChart: React.FC<{
  data: ISourceDistributionResponse[];
}> = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        dataKey="mangaCount"
        nameKey="sourceName"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label={false}
        labelLine={false}
      >
        {data.map((_, index) => (
          <Cell key={index} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value: number) => `${value} mangas`} />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);
