import {
  Alert,
  Avatar,
  Button,
  Collapse,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import {
  useAddUniversityMutation,
  useUploadLogoMutation,
} from "../../services/universities.service";
import { CloseTwoTone } from "@mui/icons-material";
import useAuthUser from "../../hooks/useAuthUser";
import { Role } from "../../types";
import { useFilePicker } from "use-file-picker";
import universityLogo from "../../assets/university-logo.jpg";
import { useNavigate } from "react-router-dom";

const NewUniversityPage = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

  const { existsId, userLoading, authUser, userError } = useAuthUser();

  const [alertOpen, setAlertOpen] = useState(false);

  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [year, setYear] = useState("");
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState<File | undefined>();

  const { openFilePicker, filesContent, clear } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    onClear: () => setLogo(undefined),
    onFilesSuccessfullySelected: (files) => {
      setLogo(files.plainFiles[0]);
    },
  });

  const navigate = useNavigate();

  const [addUniversity] = useAddUniversityMutation();
  const [uploadLogo] = useUploadLogoMutation();

  if (!existsId) return null;

  if (userLoading) return <Typography>Loading...</Typography>;

  if (!authUser || userError)
    return <Typography>Some error has occurred</Typography>;

  if (authUser.role !== Role.Admin) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(name, abbreviation, year, url);

    try {
      const addedUniversity = await addUniversity({
        name,
        abbreviation,
        year: Number(year),
        url,
      }).unwrap();

      console.log("University added!");

      if (logo) {
        console.log("Uploading logo");

        const body = new FormData();

        body.append("file", logo);

        await uploadLogo({ id: addedUniversity.id, body });
      }

      console.log("Success!");

      navigate(`/admin`);
    } catch (error) {
      setAlertOpen(true);
      console.error(error);
    }
  };

  const handleChoose = () => {
    clear();
    openFilePicker();
    setAnchorEl(null);
  };

  const handleReset = () => {
    clear();
    setLogo(undefined);
    setAnchorEl(null);
  };

  const chosenLogo = logo && filesContent[0].content;

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

          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={handleChoose}>Choose</MenuItem>
            <MenuItem onClick={handleReset} disabled={!logo}>
              Reset
            </MenuItem>
          </Menu>

          <Stack direction="row" sx={{ width: "100%", alignItems: "center" }}>
            <Tooltip title="University Logo">
              <IconButton
                sx={{ p: 0 }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <Avatar
                  src={chosenLogo || universityLogo}
                  sx={{ width: 150, height: 150 }}
                />
              </IconButton>
            </Tooltip>

            <Stack sx={{ ml: 2, flexGrow: 1 }} gap={4}>
              <TextField
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                label="University Name"
                helperText="Please enter the name of the university"
              />

              <Stack direction="row" gap={2}>
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
              </Stack>
            </Stack>
          </Stack>

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
