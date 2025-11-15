import React from "react";
import {
  Box,
  Typography,
  Button,
  Sheet,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/joy";
import { SignedIn, SignedOut, UserButton, useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut(); // properly signs out user
    navigate("/"); // redirects to login page
  };

  return (
    <Sheet
      variant="outlined"
      color="neutral"
      sx={{
        px: { xs: 3, md: 6 },
        py: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "sticky",
        top: 0,
        zIndex: 20,
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255,255,255,0.8)",
        boxShadow: "sm",
      }}
    >
      {/* ===== Logo / Brand Name ===== */}
      <Typography
        level="title-lg"
        fontWeight="xl"
        sx={{
          color: "primary.solidBg",
          cursor: "pointer",
          transition: "color 0.2s",
          "&:hover": { color: "primary.plainColor" },
        }}
        onClick={() => navigate("/landing")}
      >
        JobForge
      </Typography>

      {/* ===== Right Section ===== */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <SignedIn>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography level="body-sm" sx={{ fontWeight: "md" }}>
              {user?.firstName ? `Hi, ${user.firstName}` : "Welcome"}
            </Typography>
            <Tooltip title="Account">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: { width: 36, height: 36 },
                  },
                }}
              />
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton
                variant="outlined"
                color="danger"
                onClick={handleLogout}
                sx={{ borderRadius: "50%" }}
              >
                <LogoutRoundedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </SignedIn>

        <SignedOut>
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              color="neutral"
              startDecorator={<LoginRoundedIcon />}
              onClick={() => navigate("/")}
              sx={{ fontWeight: "md" }}
            >
              Sign In
            </Button>
            <Button
              variant="solid"
              color="primary"
              startDecorator={<AppRegistrationRoundedIcon />}
              onClick={() => navigate("/sign-up")}
              sx={{ fontWeight: "md" }}
            >
              Sign Up
            </Button>
          </Stack>
        </SignedOut>
      </Box>
    </Sheet>
  );
};

export default Navbar;
