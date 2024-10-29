import { StorageRoomsBrief } from "@/types";

export const paginateStorages = (items: Array<StorageRoomsBrief>, page: number, pageSize: number) => {
  return items.slice((page - 1) * pageSize, page * pageSize);
};
