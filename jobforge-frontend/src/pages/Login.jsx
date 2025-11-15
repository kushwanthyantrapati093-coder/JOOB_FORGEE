import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Typography,
  Card,
  Stack,
  Divider,
} from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await login({ username, password });
      navigate("/landing");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        px: 2,
        fontFamily: "'Open Sans', sans-serif",
        background: "linear-gradient(to right, #f0f4f8, #ffffff)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ===== Background Text (fixed alignment) ===== */}
      <Typography
        level="display-xl"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
          fontWeight: 800,
          color: "#d6e0eb",
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 0,
          whiteSpace: "nowrap",
          fontSize: { xs: "2.8rem", sm: "4rem", md: "5.5rem" },
          opacity: 0.35,
          letterSpacing: "-1px",
          filter: "blur(0.5px)",
        }}
      >
        Welcome to JobForge
      </Typography>

      {/* ===== Login Card ===== */}
      <Card
        variant="outlined"
        sx={{
          width: { xs: "100%", sm: 380 },
          p: 4,
          borderRadius: "xl",
          boxShadow: "lg",
          bgcolor: "#ffffffcc",
          backdropFilter: "blur(10px)",
          zIndex: 1,
        }}
      >
        <Typography
          level="h3"
          sx={{
            textAlign: "center",
            mb: 2,
            fontWeight: 600,
            color: "primary.solidBg",
          }}
        >
          JobForge
        </Typography>

        <Typography
          level="body-md"
          sx={{ textAlign: "center", mb: 3, color: "neutral.500" }}
        >
          Welcome back! Please sign in to continue.
        </Typography>

        <Stack spacing={2}>
          <Input
            variant="soft"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            variant="soft"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            size="lg"
            variant="solid"
            color="primary"
            onClick={handleSubmit}
            sx={{
              mt: 1,
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "sm",
              ":hover": { boxShadow: "md" },
            }}
          >
            Login
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }}>or</Divider>

        <Button
          variant="outlined"
          color="neutral"
          fullWidth
          sx={{ textTransform: "none" }}
          onClick={() => alert("OAuth not configured yet")}
        >
          Continue with Google
        </Button>

        <Typography
          level="body-sm"
          sx={{ textAlign: "center", mt: 3, color: "neutral.500" }}
        >
          Don’t have an account?{" "}
          <Button
            variant="plain"
            color="primary"
            onClick={() => navigate("/register")}
            sx={{ fontWeight: 600 }}
          >
            Sign up
          </Button>
        </Typography>
      </Card>
    </Box>
  );
};

export default Login;
