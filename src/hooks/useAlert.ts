import { useAppDispatch } from "../hooks";
import { setAlert } from "../reducers/alert.reducer";

type Props = {
  message?: string;
  severity?: "success" | "error" | "warning" | "info";
};

const useAlert = () => {
  const dispatch = useAppDispatch();

  const showAlert = ({ message, severity }: Props) => {
    dispatch(setAlert({ message, severity, visible: true }));
  };

  return { showAlert };
};

export default useAlert;
