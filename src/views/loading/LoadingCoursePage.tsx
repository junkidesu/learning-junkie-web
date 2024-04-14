import { Box, Container, Divider, Paper, Skeleton, Stack } from "@mui/material";

const LoadingCoursePage = () => {
  return (
    <Container>
      <Paper square={false} sx={{ overflow: "hidden", mb: 2 }}>
        <Skeleton variant="rectangular" width="100%" height="250px" />

        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ alignItems: { md: "center" }, p: 2 }}
          width="100%"
        >
          <Skeleton
            variant="text"
            height={40}
            sx={{ width: "100%", maxWidth: "400px", flexGrow: 1 }}
          />
        </Stack>

        <Divider />

        <Box sx={{ p: 2 }}>
          <Skeleton
            variant="text"
            height={36}
            sx={{ width: "100%", maxWidth: "200px" }}
          />
          <Skeleton variant="text" sx={{ width: "100%" }} />

          <Skeleton variant="text" sx={{ width: "100%" }} />

          <Skeleton variant="text" sx={{ width: "100%" }} />

          <Skeleton variant="text" sx={{ width: "100%", maxWidth: "300px" }} />
        </Box>
      </Paper>

      {/* <Enrollments course={course} /> */}
    </Container>
  );
};

export default LoadingCoursePage;
