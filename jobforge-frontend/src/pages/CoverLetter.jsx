import React, { useState, useRef } from "react";
import {
  Box,
  Sheet,
  Typography,
  Button,
  Card,
  CircularProgress,
  Stack,
  Textarea,
  Select,
  Option,
  Input,
} from "@mui/joy";
import { getCoverLetter } from "../api/coverletter";
import jsPDF from "jspdf";

const CoverLetterPage = () => {
  const [resume, setResume] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [tone, setTone] = useState("Professional");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => setResume(e.target.files[0]);
  const handleUploadClick = () => fileInputRef.current.click();

  const handleGenerate = async () => {
    if (!resume || !jobTitle || !companyName) {
      alert("Please upload a resume and fill Job Title and Company Name");
      return;
    }

    try {
      setLoading(true);
      setCoverLetter("");

      const formData = new FormData();
      formData.append("file", resume);
      formData.append("job_title", jobTitle);
      formData.append("company_name", companyName);
      formData.append("job_description", jobDesc);
      formData.append("tone", tone);

      const response = await getCoverLetter(formData);
      setCoverLetter(response.data.cover_letter);
    } catch (err) {
      console.error(err);
      alert("Failed to generate cover letter");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResume(null);
    setJobTitle("");
    setCompanyName("");
    setJobDesc("");
    setTone("Professional");
    setCoverLetter("");
  };

  // Download cover letter as PDF
  const handleDownload = () => {
    if (!coverLetter) return;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const maxLineWidth = pageWidth - margin * 2;

    // Split text into lines
    const lines = doc.splitTextToSize(coverLetter, maxLineWidth);
    doc.text(lines, margin, 20);
    doc.save(`${jobTitle}_Cover_Letter.pdf`);
  };

  return (
    <Box sx={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", py: 6, px: 2, bgcolor: "#f9fafb" }}>
      <Sheet variant="outlined" sx={{ p: 5, maxWidth: 700, width: "100%", borderRadius: "xl", boxShadow: "md", bgcolor: "#ffffff" }}>
        <Typography level="h3" sx={{ mb: 4, textAlign: "center", fontWeight: 700 }}>
          Cover Letter Generator
        </Typography>

        <Stack spacing={3}>
          {/* Resume Upload */}
          <Box>
            <Typography level="body1" sx={{ mb: 1, fontWeight: 600 }}>Upload Your Resume</Typography>
            <input type="file" accept=".pdf,.doc,.docx" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
            <Button variant="outlined" color="primary" size="lg" onClick={handleUploadClick} sx={{ width: "100%", justifyContent: "space-between" }}>
              {resume ? resume.name : "Click to Upload Resume"}
            </Button>
          </Box>

          {/* Job Title */}
          <Box>
            <Typography level="body1" sx={{ mb: 1, fontWeight: 600 }}>Job Title</Typography>
            <Input placeholder="Enter Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
          </Box>

          {/* Company Name */}
          <Box>
            <Typography level="body1" sx={{ mb: 1, fontWeight: 600 }}>Company Name</Typography>
            <Input placeholder="Enter Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </Box>

          {/* Job Description */}
          <Box>
            <Typography level="body1" sx={{ mb: 1, fontWeight: 600 }}>Job Description</Typography>
            <Textarea minRows={5} placeholder="Paste the job description here..." value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} variant="outlined" size="lg" />
          </Box>

          {/* Tone Selection */}
          <Box>
            <Typography level="body1" sx={{ mb: 1, fontWeight: 600 }}>Tone</Typography>
            <Select value={tone} onChange={(e) => setTone(e.target.value)}>
              <Option value="Professional">Professional</Option>
              <Option value="Friendly">Friendly</Option>
              <Option value="Casual">Casual</Option>
              <Option value="Persuasive">Persuasive</Option>
            </Select>
          </Box>

          {/* Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="solid" color="primary" size="lg" onClick={handleGenerate} disabled={loading} sx={{ px: 6 }}>
              {loading ? <CircularProgress size="sm" /> : "Generate Cover Letter"}
            </Button>
            <Button variant="outlined" color="neutral" size="lg" onClick={handleClear} sx={{ px: 6 }}>Clear</Button>
          </Box>

          {/* Generated Cover Letter */}
          {coverLetter && (
            <Card variant="outlined" sx={{ p: 3, bgcolor: "#f5f5f5", mt: 2, borderRadius: "md" }}>
              <Typography level="h6" sx={{ mb: 2 }}>Generated Cover Letter:</Typography>
              <Typography sx={{ whiteSpace: "pre-line", mb: 2 }}>{coverLetter}</Typography>
              <Button variant="solid" color="success" onClick={handleDownload}>Download PDF</Button>
            </Card>
          )}
        </Stack>
      </Sheet>
    </Box>
  );
};

export default CoverLetterPage;
