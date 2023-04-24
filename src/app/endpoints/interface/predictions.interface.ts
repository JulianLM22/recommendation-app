export interface General{
  prediction: Prediction[];
}

export interface Prediction {
  est: number;
  item_id: number;
  item_name: string;
}
