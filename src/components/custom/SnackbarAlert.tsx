import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearAlert } from "../../reducers/alert.reducer";

const SnackbarAlert = () => {
  const { visible, message, severity } = useAppSelector(({ alert }) => alert);

  const dispatch = useAppDispatch();

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;

    dispatch(clearAlert());
  };

  return (
    <Snackbar open={visible} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message || "Something went wrong"}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
