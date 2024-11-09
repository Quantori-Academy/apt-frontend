import { RequestedReagentBackend } from "../src/types";

export const reagentRequestsMock: Array<RequestedReagentBackend> = [
  {
    id: "ca8b9790-cc3f-43f2-aab9-523633e7e879",
    reagent_name: "Acetic Acid",
    structure: "C2H4O2",
    cas_number: "64-19-7",
    quantity: "100 ml",
    status: "Pending",
    created_at: "2024-10-30T15:48:52.877Z",
    modified_at: "2024-10-30T15:49:46.476Z",
    user_comment: {
      commenter_id: 3,
      commenter_role: "Researcher",
      comment: "I would like to request additional information about the reagent.",
    },
    procurement_comment: {
      commenter_id: 2,
      commenter_role: "Procurement Officer",
      comment: "I have reviewed the request and it looks awesome.",
    },
  },
];
