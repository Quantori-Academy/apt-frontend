export type ApiStatus = {
  status: string;
  message: string;
};

export type Token = {
  token: string;
};

export type MutationResponse = {
  status: number;
  data: {
    message: string;
  };
};
