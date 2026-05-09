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
        cy="45%"
        outerRadius={82}
        innerRadius={36}
        label={false}
        labelLine={false}
      >
        {data.map((_, index) => (
          <Cell key={index} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip
        formatter={(value: number) => `${value} mangas`}
        contentStyle={{
          backgroundColor: "rgba(15, 23, 33, 0.96)",
          border: "1px solid rgba(148, 163, 184, 0.14)",
          borderRadius: 12,
          color: "#fff",
        }}
        itemStyle={{ color: "#fff" }}
        labelStyle={{ color: "rgba(226, 232, 240, 0.72)" }}
      />
      <Legend
        wrapperStyle={{ color: "rgba(226, 232, 240, 0.78)", paddingTop: 6, fontSize: 12 }}
        iconSize={10}
      />
    </PieChart>
  </ResponsiveContainer>
);
