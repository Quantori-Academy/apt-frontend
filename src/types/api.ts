export type ApiStatus = {
  status: string;
  message: string;
};

export type Token = {
  token: string;
};

export type MutationSubstanceResponse = {
  status: number;
  data: {
    message: string;
  };
};
