import { Box, Typography } from "@material-ui/core";

export default function Unauthorized() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <Typography variant="body1">Redirecting...</Typography>
    </Box>
  );
}
