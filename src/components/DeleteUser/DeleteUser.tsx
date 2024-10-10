import { Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AlertSnackbar } from "@/components";
import { selectUserRole, useDeleteUserMutation } from "@/store";

type DeleteUserProps = {
  userId: string;
};

const DeleteUser: React.FC<DeleteUserProps> = ({ userId }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const userRole = useSelector(selectUserRole);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    const { error } = await deleteUser(userId);

    if (error) {
      setIsAlertOpen(true);
    } else {
      navigate("/users");
    }
  };

  if (userRole !== "Administrator") return null;

  return (
    <>
      <Button
        color="primary"
        fullWidth
        type="button"
        onClick={() => handleDeleteUser}
        disabled={isDeleting}
      >
        Delete User
      </Button>
      <AlertSnackbar
        severity={"error"}
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
      >
        Fail To Delete User
      </AlertSnackbar>
    </>
  );
};

export default DeleteUser;
