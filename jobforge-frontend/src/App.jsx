import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import { Box, Card, CardContent, Typography } from "@mui/joy";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ATSPage from "./pages/ATS";
import CoverLetterPage from "./pages/CoverLetter";
import JobFinderPage from "./pages/JobFinder";

function App() {
  return (
    <Box sx={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Logged-out view */}
      <SignedOut>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(to right, #f8fafc, #ffffff)",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              p: 4,
              width: 400,
              borderRadius: "xl",
              boxShadow: "md",
              bgcolor: "#ffffffcc",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent>
              <Typography
                level="h4"
                sx={{ mb: 2, textAlign: "center", fontWeight: 700 }}
              >
                Welcome to JobForge
              </Typography>
              <SignIn routing="hash" />
            </CardContent>
          </Card>
        </Box>
      </SignedOut>

      {/* Logged-in view */}
      <SignedIn>
        <Navbar />
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Landing />} />
          {/* Dashboard and child pages */}
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="ats" element={<ATSPage />} />
            <Route path="cover-letter" element={<CoverLetterPage />} />
            <Route path="job-finder" element={<JobFinderPage />} />
          </Route>
        </Routes>
      </SignedIn>
    </Box>
  );
}

export default App;
