import { Alert, Collapse, IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearAlert } from "../../reducers/alert.reducer";
import { CloseTwoTone } from "@mui/icons-material";

const CollapseAlert = () => {
  const { message, severity, visible } = useAppSelector(({ alert }) => alert);

  const dispatch = useAppDispatch();

  return (
    <Collapse in={visible}>
      <Alert
        severity={severity}
        variant="filled"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              dispatch(clearAlert());
            }}
          >
            <CloseTwoTone fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {message || "Something went wrong :("}
      </Alert>
    </Collapse>
  );
};

export default CollapseAlert;
