// import { Grid, MenuItem, TextField, Typography } from "@mui/material";
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
//
// import { userRoles } from "@/constants";
// import { useGetUserDetailsQuery } from "@/store/api.ts";
// import { selectUserId, selectUserRole } from "@/store/slices/authSlice.ts";
// import { UserRole } from "@/types";
//
const UpdateRole: React.FC = () => {
  return <div>hello</div>;
  //   const [isEditMode] = useState(false);
  //   // const userRole: UserRole = useSelector(selectUserRole);
  //   // const roles = Object.values(userRoles);
  //   const userId = useSelector(selectUserId)!;
  //
  //   const {
  //     data: userDetails,
  //     isLoading: isLoadingUserDetails,
  //     isError,
  //   } = useGetUserDetailsQuery(userId);
  //
  //   if (isLoadingUserDetails) {
  //     return <div>Loading...</div>;
  //   }
  //   if (isError) {
  //     return <div>Error fetching user details</div>;
  //   }
  //
  //   return (
  //     <Grid item xs={12}>
  //       <Typography variant="subtitle1" fontWeight="bold">
  //         Role:
  //       </Typography>
  //       {isEditMode && userRole === "Administrator" ? (
  //         // <TextField
  //         //   fullWidth
  //         //   select
  //         //   defaultValue={userRoles.Admin}
  //         //   {...register("role", { required: "Please select a role" })}
  //         // >
  //         //   {roles.map((option) => (
  //         //     <MenuItem key={option} value={option}>
  //         //       {option}
  //         //     </MenuItem>
  //         //   ))}
  //         // </TextField>
  //       ) : (
  //         <Typography>{userDetails.role}</Typography>
  //       )}
  //     </Grid>
  //   );
};

export default UpdateRole;
