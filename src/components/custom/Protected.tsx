import { ReactNode } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import { Typography } from "@mui/material";
import { Role } from "../../types";

interface Props {
  children: ReactNode;
  universityRep?: boolean;
  instructor?: boolean;
}

const Protected = ({ children, universityRep, instructor }: Props) => {
  const { existsId, authUser, userLoading, userError } = useAuthUser();

  if (userLoading) return <Typography>Loading...</Typography>;

  if (userError || !authUser)
    return <Typography>Some error has occurred!</Typography>;

  if (!existsId) return null;

  if (authUser.role === Role.UniversityRep && (universityRep || instructor))
    return children;

  if (authUser.role === Role.Instructor && instructor) return children;

  if (authUser.role === Role.Admin) return children;

  return null;
};

export default Protected;
