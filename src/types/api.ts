export type Token = {
  token: string;
  refresh_token: string;
};

export type MutationResponse = {
  status: number;
  data: {
    message: string;
  };
};
