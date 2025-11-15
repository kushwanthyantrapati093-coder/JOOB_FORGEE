import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Sheet,
  Typography,
  Textarea,
  CircularProgress,
  Stack,
  Card,
  CardContent,
} from "@mui/joy";
import axios from "axios";

const ATSPage = () => {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [score, setScore] = useState(null);
  const [tips, setTips] = useState("");
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => setResume(e.target.files[0]);
  const handleUploadClick = () => fileInputRef.current.click();

  const handleGenerate = async () => {
    if (!resume || !jobDesc) {
      alert("Please upload a resume and enter a job description");
      return;
    }

    const formData = new FormData();
    formData.append("file", resume);
    formData.append("job_description", jobDesc);

    try {
      setLoading(true);
      setScore(null);
      setTips("");
      setKeywords("");
      const response = await axios.post("http://localhost:8000/ats/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setScore(response.data.score);
      setTips(response.data.tips);
      setKeywords(response.data.keywords);
    } catch (err) {
      console.error(err);
      alert("Error generating ATS score");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
        px: 2,
        bgcolor: "#f9fafb",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          p: 5,
          maxWidth: 700,
          width: "100%",
          borderRadius: "xl",
          boxShadow: "md",
          bgcolor: "#ffffff",
        }}
      >
        <Typography
          level="h3"
          sx={{ mb: 4, textAlign: "center", fontWeight: 700 }}
        >
          ATS Score Generator
        </Typography>

        <Stack spacing={3}>
          {/* Resume Upload */}
          <Box>
            <Typography level="body1" sx={{ mb: 1, fontWeight: 600 }}>
              Upload Your Resume
            </Typography>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button
              variant="outlined"
              color="primary"
              size="lg"
              onClick={handleUploadClick}
              sx={{ width: "100%", justifyContent: "space-between" }}
            >
              {resume ? resume.name : "Click to Upload Resume"}
            </Button>
          </Box>

          {/* Job Description */}
          <Box>
            <Typography level="body1" sx={{ mb: 1, fontWeight: 600 }}>
              Job Description
            </Typography>
            <Textarea
              minRows={6}
              placeholder="Paste the job description here..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              variant="outlined"
              size="lg"
            />
          </Box>

          {/* Generate Button */}
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="solid"
              color="primary"
              size="lg"
              onClick={handleGenerate}
              disabled={loading}
              sx={{ px: 6 }}
            >
              {loading ? <CircularProgress size="sm" /> : "Generate Score"}
            </Button>
          </Box>

          {/* Results */}
          {score !== null && (
            <Card variant="outlined" sx={{ mt: 4, p: 3, bgcolor: "#f5f5f5" }}>
              <CardContent>
                <Typography level="h5" sx={{ mb: 2 }}>
                  ATS Score: <strong>{score}%</strong>
                </Typography>
                {tips && (
                  <Typography sx={{ mb: 2, whiteSpace: "pre-line" }}>
                    <strong>Improvement Tips:</strong> {tips}
                  </Typography>
                )}
                {keywords && (
                  <Typography sx={{ whiteSpace: "pre-line" }}>
                    <strong>Relevant Keywords:</strong> {keywords}
                  </Typography>
                )
                }
              </CardContent>
            </Card>
          )}
        </Stack>
      </Sheet>
    </Box>
  );
};

export default ATSPage;
