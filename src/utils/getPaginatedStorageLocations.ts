import { StorageRoomsBrief } from "@/types";

export const paginateListData = (items: Array<StorageRoomsBrief>, page: number, pageSize: number) => {
  return items.slice((page - 1) * pageSize, page * pageSize);
};
