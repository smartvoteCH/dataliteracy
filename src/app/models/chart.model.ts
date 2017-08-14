export interface ChartData {
  data: ChartDataPoint[];
}

export interface ChartDataPoint {
  value: number;
  name: string;
  color: string;
}
