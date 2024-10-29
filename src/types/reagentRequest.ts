export type ReagentRequests = Array<RequestedReagent>;
export type RequestedReagent = {
  id: number;
  name: string;
  structure: string;
  CAS: string;
  desiredQuantity: string;
  status: RequestStatus;
  userComments: string;
  procurementComments: string;
  dateCreated: string;
  dateModified: string;
};
export type RequestsSortColumns = "name" | "dateCreated" | "status";

export type RequestStatus = "Pending" | "Ordered" | "Declined";

export type StatusFilterOption = RequestStatus | "All";
