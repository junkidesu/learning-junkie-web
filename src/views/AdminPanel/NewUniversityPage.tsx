import {
  Alert,
  Button,
  Collapse,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useAddUniversityMutation } from "../../services/universities.service";
import { CloseTwoTone } from "@mui/icons-material";
import useAuthUser from "../../hooks/useAuthUser";
import { Role } from "../../types";

const NewUniversityPage = () => {
  const { existsId, userLoading, authUser, userError } = useAuthUser();

  const [alertOpen, setAlertOpen] = useState(false);

  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [year, setYear] = useState("");
  const [url, setUrl] = useState("");

  const [addUniversity] = useAddUniversityMutation();

  if (!existsId) return null;

  if (userLoading) return <Typography>Loading...</Typography>;

  if (!authUser || userError)
    return <Typography>Some error has occurred</Typography>;

  if (authUser.role !== Role.Admin) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(name, abbreviation, year, url);

    try {
      await addUniversity({ name, abbreviation, year: Number(year), url });

      console.log("Success!");
    } catch (error) {
      setAlertOpen(true);
      console.error(error);
    }
  };

  return (
    <Stack>
      <Collapse in={alertOpen}>
        <Alert
          severity="error"
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseTwoTone fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Something went wrong :(
        </Alert>
      </Collapse>

      <Paper sx={{ p: 2 }}>
        <Stack
          component="form"
          gap={4}
          sx={{ p: 3, alignItems: "center" }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h5">Add a University</Typography>

          <TextField
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            label="University Name"
            helperText="Please enter the name of the university"
          />

          <TextField
            fullWidth
            value={abbreviation}
            onChange={(e) => setAbbreviation(e.target.value)}
            label="Abbreviation"
            helperText="Please enter the abbreviation (if any)"
          />

          <TextField
            fullWidth
            value={year}
            onChange={(e) => setYear(e.target.value)}
            label="Year"
            helperText="Please enter the year of foundation"
          />

          <TextField
            required
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            label="Website"
            helperText="Please enter the URL of the university"
          />

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default NewUniversityPage;
