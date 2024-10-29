import { ReagentRequests } from "@/types";

export const paginateReagentRequestList = (items: ReagentRequests, page: number, pageSize: number) => {
  return items.slice((page - 1) * pageSize, page * pageSize);
};
