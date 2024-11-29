import { ReagentRequests, RequestedReagentBackend } from "@/types";

export const transformRequestData = (requestedReagents: Array<RequestedReagentBackend>): ReagentRequests => {
  return requestedReagents.map((request) => {
    return {
      id: request.id,
      name: request.reagent_name,
      structure: request.structure,
      CAS: request.cas_number,
      amount: request.amount,
      quantity: request.quantity,
      status: request.status,
      userComment: request.user_comment?.comment,
      procurementComment: request.procurement_comment?.comment,
      dateCreated: request.created_at,
      dateModified: request.modified_at || "",
    };
  });
};
