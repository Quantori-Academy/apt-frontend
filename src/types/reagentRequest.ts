import { UserRole } from "@/types/user.ts";

export type ReagentRequests = Array<RequestedReagent>;

export type RequestedReagent = {
  id: string;
  name: string;
  structure: string;
  CAS: string;
  desiredQuantity: string;
  status: RequestStatus;
  userComments: string;
  procurementComments: string;
  dateCreated: string;
  dateModified: string | null;
};

export type RequestsSortColumns = "name" | "dateCreated" | "status";

export type RequestStatus = "Pending" | "Ordered" | "Declined";

export type StatusFilterOption = RequestStatus | "All";

export type RequestCommentBackend = {
  id: string;
  comment_text: string;
  created_at: string;
  modified_at: string | null;
};
export type RequestUserCommentBackend = {
  commenter_id: number;
  commenter_role: UserRole;
  comment: RequestCommentBackend;
};

export type RequestedReagentBackend = {
  id: string;
  reagent_name: string;
  structure: string;
  cas_number: string;
  quantity: string;
  status: RequestStatus;
  created_at: string;
  modified_at: string | null;
  user_comment: RequestUserCommentBackend;
  procurement_comment: RequestUserCommentBackend;
};
