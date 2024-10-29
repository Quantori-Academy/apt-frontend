export type ReagentRequests = Array<RequestedReagent>;
export type RequestedReagent = {
  id: number;
  reagentName: string;
  structure: string;
  CAS: string;
  desiredQuantity: string;
  status: RequestStatus;
  userComments: string;
  procurementComments: string;
  dateCreated: string;
  dateModified: string;
};

export type RequestStatus = "pending" | "ordered" | "declined";
