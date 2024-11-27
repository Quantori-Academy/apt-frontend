import { ORDER_STATUSES } from "@/constants";

export const statusColors = {
  Declined: "#b22a00",
  Pending: "#ff9800",
  Ordered: "#4caf50",
  Completed: "#4caf50",
  Taken: "#1769aa",
};

export const ORDER_STATUS_COLOR: Record<keyof typeof ORDER_STATUSES, string> = {
  Pending: statusColors.Pending,
  Submitted: statusColors.Ordered,
  Fulfilled: statusColors.Completed,
  Cancelled: statusColors.Declined,
};
