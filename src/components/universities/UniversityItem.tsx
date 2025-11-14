import {
  Avatar,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { University } from "../../types";
import { useNavigate } from "react-router-dom";
import { DeleteForeverOutlined } from "@mui/icons-material";
import {
  useDeleteLogoMutation,
  useDeleteUniversityMutation,
  useUploadLogoMutation,
} from "../../services/universities.service";
import { useFilePicker } from "use-file-picker";
import { useEffect, useState } from "react";
import { defaultUniversityLogo } from "../../assets";

const UniversityItem = ({ university }: { university: University }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

  const [logo, setLogo] = useState<File | undefined>();

  const [uploadLogo] = useUploadLogoMutation();
  const [deleteLogo] = useDeleteLogoMutation();

  useEffect(() => {
    const handleUploadLogo = async () => {
      if (logo) {
        const formData = new FormData();

        formData.append("file", logo);

        try {
          console.log("Uploading");

          await uploadLogo({ id: university.id, body: formData }).unwrap();

          console.log("Success!");
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (logo) {
      handleUploadLogo();
    }
  }, [logo, university.id, uploadLogo]);

  const { openFilePicker } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    onFilesSuccessfullySelected: (files) => {
      setLogo(files.plainFiles[0]);
    },
  });

  const navigate = useNavigate();

  const [deleteUniversity] = useDeleteUniversityMutation();

  const handleDelete = async () => {
    await deleteUniversity(university.id);
    console.log("Success!");
  };

  const handleDeleteLogo = async () => {
    await deleteLogo(university.id);
    console.log("Success!");
    setAnchorEl(undefined);
  };

  const handleUpdateLogo = () => {
    openFilePicker();
    setAnchorEl(null);
  };

  return (
    <Card square={false} elevation={5}>
      <Stack>
        <Stack direction="row" sx={{ p: 2 }}>
          <IconButton
            sx={{ p: 0, width: 80, height: 80, mr: 2 }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <Avatar
              sx={{ height: 80, width: 80 }}
              src={university.logo || defaultUniversityLogo}
            />
          </IconButton>

          <Menu
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorEl={anchorEl}
          >
            <MenuItem onClick={handleUpdateLogo}>Update</MenuItem>
            <MenuItem onClick={handleDeleteLogo} disabled={!university.logo}>
              <Typography color="error">Remove</Typography>
            </MenuItem>
          </Menu>

          <Container>
            <Typography
              sx={{ textDecoration: "none" }}
              variant="h5"
              color="inherit"
            >
              {university.name}
            </Typography>
            <Typography>Founded in {university.year}</Typography>
            <Typography>
              Member since {new Date(university.joined).toLocaleDateString()}
            </Typography>
            <Link component="a" href={university.url}>
              {university.url}
            </Link>
          </Container>
        </Stack>

        <Divider />

        <Container sx={{ p: 1 }}>
          <Button onClick={() => navigate(`/universities/${university.id}`)}>
            Visit
          </Button>

          <Button
            onClick={() => navigate(`/universities/${university.id}/edit`)}
          >
            Manage
          </Button>

          <Button
            color="error"
            sx={{ float: "right" }}
            onClick={handleDelete}
            startIcon={<DeleteForeverOutlined />}
          >
            Delete
          </Button>
        </Container>
      </Stack>
    </Card>
  );
};

export default UniversityItem;
