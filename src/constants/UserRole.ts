export const UserRole = {
  Admin: "Administrator",
  ProcurementOfficer: "Procurement Officer",
  Researcher: "Researcher",
} as const;

export type UserRoleType = keyof typeof UserRole;
