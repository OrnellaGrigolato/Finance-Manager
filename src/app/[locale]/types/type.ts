export type Params = {
  params: { id: string };
};

export interface ApiResponse {
  id: number;
  username: string;
  email: string;
  password: string;
  login_date: string;
  maxExpenditure: number;
  emailVerified: boolean;
  available_money: string;
  lastmove_amount: string;
  lastmove_date: string;
  isBlocked: boolean;
}

export interface Movement {
  id_moves: number;
  description: string;
  income_amount: string;
  discount_amount: string;
  movement_date: string;
  user_id: number;
  title: string;
  currency_id: number;
  DorO_id: number;
}
