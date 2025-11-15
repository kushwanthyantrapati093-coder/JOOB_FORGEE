import React from "react";
import { Box, Button, Sheet, Typography } from "@mui/joy";
import { Link, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation(); // To highlight active button

  const buttons = [
    { label: "ATS Score", path: "ats", color: "primary" },
    { label: "Cover Letter", path: "cover-letter", color: "neutral" },
    { label: "Job Finder", path: "job-finder", color: "success" },
  ];

  return (
    <Sheet
      sx={{
        minHeight: "100vh",
        bgcolor: "background.body",
      }}
    >
      {/* Top Button Menu */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 3,
          p: 3,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.surface",
          boxShadow: "sm",
        }}
      >
        {buttons.map((btn) => (
          <Button
            key={btn.path}
            component={Link}
            to={btn.path}
            variant={location.pathname.includes(btn.path) ? "solid" : "outlined"}
            color={btn.color}
            size="lg"
            sx={{
              px: 5,
              py: 1.5,
              fontWeight: 600,
              borderRadius: "lg",
              transition: "all 0.2s",
              ":hover": { boxShadow: "md", transform: "translateY(-2px)" },
            }}
          >
            {btn.label}
          </Button>
        ))}
      </Box>

      {/* Content */}
      <Box
        sx={{
          p: 4,
          maxWidth: 1000,
          mx: "auto",
          mt: 3,
          minHeight: "70vh",
          bgcolor: "background.surface",
          borderRadius: "xl",
          boxShadow: "sm",
        }}
      >
        <Outlet />
      </Box>
    </Sheet>
  );
};

export default Dashboard;
