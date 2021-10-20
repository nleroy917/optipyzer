/// <reference types="@types/react" />

export interface Species {
  id: number;
  name: string;
  type: string | null;
}

export interface Weights {
  [id: number]: number;
}

export interface QueryResult {
  best_expression_ad: {
    [id: string]: number;
  };
  best_expression_sd: {
    [id: string]: number;
  };
  optimmized_ad: string;
  optimmized_sd: string;
  peptide_seq: string;
  seq_type: string;
  stop_codon: 0; 

}

export interface QueryError {
  response?: AxiosResponse
  stack?: Error
}