import {
  Container,
  Divider,
  Paper,
  Skeleton,
  Stack,
} from "@mui/material";

const LoadingUserPage = () => {
  return (
    <Container>
      <Stack gap={3}>
        <Paper sx={{ p: 2 }}>
          <Stack gap={3}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              sx={{ alignItems: "center" }}
              gap={2}
              width="100%"
            >
              <Skeleton
                variant="circular"
                sx={{
                  width: { xs: 80, sm: 115, md: 115 },
                  height: { xs: 80, sm: 115, md: 115 },
                }}
              />

              <Stack
                sx={{
                  flexGrow: 1,
                  alignItems: { xs: "center", md: "initial" },
                }}
                // width="100%"
              >
                <Skeleton
                  variant="text"
                  height={50}
                  width="100%"
                  sx={{ maxWidth: "400px" }}
                />
                <Skeleton
                  variant="text"
                  height={36}
                  width="100%"
                  sx={{ maxWidth: "150px" }}
                />
              </Stack>
            </Stack>

            <Divider />

            <Skeleton variant="text" />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default LoadingUserPage;
