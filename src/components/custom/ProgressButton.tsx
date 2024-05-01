import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
} from "@mui/material";

interface ProgressButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const ProgressButton = ({
  isLoading,
  disabled,
  ...props
}: ProgressButtonProps) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Button variant="contained" disabled={isLoading || disabled} {...props} />

      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
};

export default ProgressButton;
