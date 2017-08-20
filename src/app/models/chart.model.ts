export interface Chart {
  renderLabels: boolean;
  data: ChartDataPoint[];
}

export interface ChartDataPoint {
  value: number;
  name: string;
  color: string;
}
