import { useQuery } from "@tanstack/react-query";
import { fetchPagedChapters } from "../../../api/chapters/chapters.queries";
import { fetchMetrics } from "../../../api/dashboard/dashboard.queries";
import { fetchPagedLogs } from "../../../api/logs/logs.queries";
import { fetchPagedMangas } from "../../../api/manga/manga.queries";
import { fetchSourceDistribution } from "../../../api/source/source.queries";

export const useHomeData = () => {
  const { data: metricsData, isLoading: isMetricsLoading } = useQuery({
    queryKey: ["metrics"],
    queryFn: fetchMetrics,
  });

  const { data: logsData, isLoading: isLogsLoading } = useQuery({
    queryKey: ["logs", { pageNumber: 1, pageSize: 8 }],
    queryFn: fetchPagedLogs,
    select: (result) => ({
      ...result,
      items: result.items.map((log) => ({
        ...log,
        timestamp: new Date(log.timestamp).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      })),
    }),
  });

  const { data: mangasData, isLoading: isMangasLoading } = useQuery({
    queryKey: ["mangas", { pageNumber: 1, pageSize: 5 }],
    queryFn: fetchPagedMangas,
  });

  const { data: chaptersData, isLoading: isChaptersLoading } = useQuery({
    queryKey: ["chaptersLog", { pageNumber: 1, pageSize: 5 }],
    queryFn: fetchPagedChapters,
  });

  const {
    data: mangaSourceDistribution,
    isLoading: isMangaSourceDistributionLoading,
  } = useQuery({
    queryKey: ["mangaSourceDistribution"],
    queryFn: fetchSourceDistribution,
  });

  return {
    metricsData,
    logsData,
    mangasData,
    chaptersData,
    mangaSourceDistribution,
    isMetricsLoading,
    isLogsLoading,
    isMangasLoading,
    isChaptersLoading,
    isMangaSourceDistributionLoading,
  };
};
