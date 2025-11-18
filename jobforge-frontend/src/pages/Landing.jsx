import React from "react";
import { Box, Card, CardContent, Typography, Button, Stack } from "@mui/joy";

const Landing = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        px: 3,
        background: "linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)",
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          p: 5,
          maxWidth: 500,
          width: "100%",
          borderRadius: "xl",
          boxShadow: "lg",
          textAlign: "center",
          bgcolor: "#ffffffcc",
          backdropFilter: "blur(5px)",
        }}
      >
        <CardContent>
          <Typography
            level="h3"
            sx={{ mb: 2, fontWeight: 700, color: "neutral.800" }}
          >
             Welcome to JobForge
          </Typography>

          <Typography
            level="body-md"
            sx={{ mb: 4, color: "neutral.600", lineHeight: 1.6 }}
          >
            Supercharge your career with AI — analyze your resume, optimize for ATS, 
            and craft the perfect cover letter effortlessly.
          </Typography>

          <Stack justifyContent="center">
            <Button
              size="lg"
              variant="solid"
              color="primary"
              onClick={() => (window.location.href = "/dashboard")}
              sx={{
                px: 6,
                fontWeight: 600,
                boxShadow: "sm",
                ":hover": { boxShadow: "md" },
              }}
            >
              Go to Dashboard
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Landing;
