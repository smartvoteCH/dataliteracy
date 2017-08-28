export interface Chart {
  renderLabels: boolean;
  scale: number;
  data: ChartDataPoint[];
}

export interface ChartDataPoint {
  value: number;
  name: string;
  color: string;
}
