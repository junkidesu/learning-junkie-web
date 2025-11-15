import { useAppDispatch } from "../hooks";
import { clearAlert, setAlert } from "../reducers/alert.reducer";

type Props = {
  message?: string;
  severity?: "success" | "error" | "warning" | "info";
};

const useAlert = () => {
  const dispatch = useAppDispatch();

  const showAlert = ({ message, severity }: Props) => {
    const processId = setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);

    dispatch(setAlert({ message, severity, processId, visible: true }));
  };

  return { showAlert };
};

export default useAlert;
