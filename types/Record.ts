export interface Record {
  date: string | number | Date;
  id: string;
  text: string;
  amount: number;
  category: string;
  userId: string;
  createdAt: Date;
}

export interface RecordData {
  amount: number;
  text: string;
  category: string;
  date: string;
}

export interface RecordResult {
  data?: RecordData;
  error?: string;
}

export interface GetRecordsParams {
  start: Date;
  end: Date;
  limit?: number;
}