import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { Box, IconButton, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { decrement, increment, selectCount } from "@/store/slices/counterSlice";

const Counter: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);

  return (
    <Box maxWidth={"lg"} display={"flex"} alignItems={"center"}>
      <IconButton onClick={() => dispatch(decrement())}>
        <RemoveCircleRoundedIcon />
      </IconButton>

      <Box width={20} textAlign={"center"}>
        <Typography>{count}</Typography>
      </Box>

      <IconButton onClick={() => dispatch(increment())}>
        <AddCircleRoundedIcon />
      </IconButton>
    </Box>
  );
};

export default Counter;
