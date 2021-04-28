import { Box, CircularProgress } from "@material-ui/core";

export default function PageLoading() {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={40} />
    </Box>
  );
}
