import { createQuery } from "../utils/utils.fetchQuery";
import { IMetricsResponse } from "./dashboard.types";

export const fetchMetrics = createQuery<IMetricsResponse>("api/metrics");
