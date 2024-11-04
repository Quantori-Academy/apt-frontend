import { ReagentRequests, RequestedReagentBackend } from "@/types";

export const transformRequestData = (requestedReagents: Array<RequestedReagentBackend>): ReagentRequests => {
  return requestedReagents.map((request) => {
    return {
      id: request.id,
      name: request.reagent_name,
      structure: request.structure,
      CAS: request.cas_number,
      desiredQuantity: request.quantity,
      status: request.status,
      userComments: request.user_comment?.comment,
      procurementComments: request.procurement_comment?.comment,
      dateCreated: request.created_at,
      dateModified: request.modified_at || "",
    };
  });
};
