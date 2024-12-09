import { UserRole } from "@/types/user";

export type ReagentRequests = Array<RequestedReagent>;

export type RequestedReagent = {
  id: string;
  name: string;
  structure: string;
  CAS: string;
  amount: number;
  quantity: string;
  status: RequestStatus;
  userComment: string | null;
  procurementComment: string | null;
  dateCreated: string;
  dateModified: string | null;
};

export type RequestsSortColumns = "name" | "dateCreated" | "status";

export type RequestStatus = "Pending" | "Ordered" | "Declined" | "Completed" | "Taken";

export type StatusFilterOption = RequestStatus | "All";

export type RequestUserCommentBackend = {
  commenter_id: number;
  commenter_role: UserRole;
  comment: string;
};

export type RequestedReagentBackend = {
  id: string;
  reagent_name: string;
  structure: string;
  cas_number: string;
  initial_quantity: string;
  status: RequestStatus;
  created_at: string;
  modified_at: string | null;
  user_comment: RequestUserCommentBackend;
  procurement_comment: RequestUserCommentBackend;
  amount: number;
};

export type ReagentRequestInput = {
  reagentName: string;
  CAS: string;
  initialQuantity: number;
  userComment: string | null;
  unit: string;
  structure: string;
  amount: number;
};
