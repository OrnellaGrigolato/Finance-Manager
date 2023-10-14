export type Params = {
    params :{ id :string}
}

export interface ApiResponse {
    finder: {
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
    };
    message: string;
  }