import {
  Alert,
  Avatar,
  Button,
  Collapse,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, FormEvent, SetStateAction } from "react";
import { defaultUniversityLogo } from "../../../assets";
import usePickImage from "../../../hooks/usePickImage";
import {
  useAddUniversityMutation,
  useUploadLogoMutation,
} from "../../../services/universities.service";
import { CloseTwoTone } from "@mui/icons-material";
import useAlert from "../../../hooks/useAlert";

const NewUniversityForm = ({
  setActiveStep,
  setUniversityId,
}: {
  setActiveStep: React.Dispatch<SetStateAction<number>>;
  setUniversityId: React.Dispatch<SetStateAction<number | undefined>>;
}) => {
  const { showAlert } = useAlert();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

  const [alertOpen, setAlertOpen] = useState(false);

  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [year, setYear] = useState("");
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState<File | undefined>();

  const { openImagePicker, reset, imageContent } = usePickImage({
    image: logo,
    setImage: setLogo,
  });

  const [addUniversity] = useAddUniversityMutation();
  const [uploadLogo] = useUploadLogoMutation();

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

      setUniversityId(addedUniversity.id);
      setActiveStep(1);

      showAlert({
        message: "Added university successfully!",
        severity: "success",
      });
    } catch (error) {
      setAlertOpen(true);
      console.error(error);
      showAlert({
        message: "Could not add university :(",
        severity: "error",
      });
    }
  };

  const handleChoose = () => {
    openImagePicker();
    setAnchorEl(null);
  };

  const handleReset = () => {
    reset();
    setLogo(undefined);
    setAnchorEl(null);
  };

  const chosenLogo = logo && imageContent;

  return (
    <Stack component="form" gap={2} onSubmit={handleSubmit}>
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
              src={chosenLogo || defaultUniversityLogo}
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

      <Button type="submit" sx={{ alignSelf: "end" }}>
        Next
      </Button>
    </Stack>
  );
};

export default NewUniversityForm;
