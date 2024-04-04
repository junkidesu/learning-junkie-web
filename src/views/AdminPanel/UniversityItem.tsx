import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  Container,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { University } from "../../types";
import { useNavigate } from "react-router-dom";
import universityLogo from "../../assets/university-logo.jpg";
import { DeleteForeverOutlined } from "@mui/icons-material";
import {
  useDeleteLogoMutation,
  useDeleteUniversityMutation,
  useUploadLogoMutation,
} from "../../services/universities.service";
import { useFilePicker } from "use-file-picker";
import { useEffect, useState } from "react";

const UniversityItem = ({ university }: { university: University }) => {
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
  };

  return (
    <Card square={false} elevation={5}>
      <Stack>
        <CardActionArea sx={{ p: 2 }}>
          <Stack direction="row">
            <IconButton
              sx={{ p: 0, width: 80, height: 80, mr: 2 }}
              onClick={() => openFilePicker()}
            >
              <Avatar
                sx={{ height: 80, width: 80 }}
                src={university.logo || universityLogo}
              />
            </IconButton>

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
        </CardActionArea>

        <Divider />

        <Container sx={{ p: 1 }}>
          <Button onClick={() => navigate(`/universities/${university.id}`)}>
            Visit
          </Button>

          <Button
            // sx={{ float: "right" }}
            color="error"
            onClick={handleDeleteLogo}
          >
            Remove logo
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
