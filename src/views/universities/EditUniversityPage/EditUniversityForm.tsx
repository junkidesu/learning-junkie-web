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
} from "@mui/material";
import { useState, FormEvent, useEffect } from "react";
import { defaultUniversityLogo } from "../../../assets";
import usePickImage from "../../../hooks/usePickImage";
import {
  useEditUniversityMutation,
  useUploadLogoMutation,
} from "../../../services/universities.service";
import { CloseTwoTone, Save } from "@mui/icons-material";
import { EditUniversity, University } from "../../../types";

const EditUniversityForm = ({ university }: { university: University }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

  const [alertOpen, setAlertOpen] = useState(false);

  const [name, setName] = useState(university.name);
  const [abbreviation, setAbbreviation] = useState(
    university.abbreviation || ""
  );
  const [year, setYear] = useState(university.year.toString());
  const [url, setUrl] = useState(university.url);
  const [logo, setLogo] = useState<File | undefined>();

  const { openImagePicker, reset } = usePickImage({
    image: logo,
    setImage: setLogo,
  });

  const [editUniversity] = useEditUniversityMutation();

  const [uploadLogo] = useUploadLogoMutation();

  useEffect(() => {
    const handleUpload = async () => {
      console.log("Upload new logo");

      if (logo) {
        console.log("Uploading logo");

        const body = new FormData();

        body.append("file", logo);

        try {
          await uploadLogo({ id: university.id, body });
        } catch (error) {
          console.error(error);
        }
      }
    };

    if (logo) handleUpload();
  }, [logo, university.id, uploadLogo]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(name, abbreviation, year, url);

    const body: EditUniversity = {
      name,
      abbreviation,
      year: Number(year),
      url,
    };

    try {
      await editUniversity({ id: university.id, body }).unwrap();

      console.log("Success!");
    } catch (error) {
      setAlertOpen(true);
      console.error(error);
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
              src={university.logo || defaultUniversityLogo}
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

      <Button type="submit" variant="contained" startIcon={<Save />}>
        Save
      </Button>
    </Stack>
  );
};

export default EditUniversityForm;
