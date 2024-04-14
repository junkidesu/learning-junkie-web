import { ReactNode } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import { Typography } from "@mui/material";
import { Role } from "../../types";

interface Props {
  children: ReactNode;
  instructor?: boolean;
}

const Protected = ({ children, instructor }: Props) => {
  const { existsId, authUser, userLoading, userError } = useAuthUser();

  if (userLoading) return <Typography>Loading...</Typography>;

  if (userError || !authUser)
    return <Typography>Some error has occurred!</Typography>;

  if (!existsId) return null;

  if (instructor && authUser.role === Role.Instructor) return children;

  if (authUser.role === Role.Admin) return children;

  return null;
};

export default Protected;
