import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Sheet,
  Typography,
  Select,
  Option,
  Button,
  Stack,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  FormControl,
  FormLabel,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  IconButton,
  Box,
} from "@mui/joy";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const roles = ["Python Developer", "Data Scientist", "AI/ML Engineer", "Generative AI Developer"];
const locations = [
  "India", "Bangalore", "Hyderabad", "Chennai", "Mumbai", "Delhi", "Pune", "Kolkata",
  "Noida", "Gurgaon", "Ahmedabad", "Jaipur", "Coimbatore", "Trivandrum", "Kochi"
];
const experiences = ["Fresher", "1-2 years", "3-5 years", "5-10 years", "10+ years"];
const companies = [
  "TCS", "Infosys", "Microsoft", "Google", "Amazon", "IBM", "Wipro", "HCL", "Capgemini",
  "Deloitte", "Cognizant", "Accenture", "Zoho", "Tech Mahindra", "Oracle"
];

const JobFinder = () => {
  const [query, setQuery] = useState("Python Developer");
  const [location, setLocation] = useState("India");
  const [experience, setExperience] = useState("");
  const [company, setCompany] = useState("");
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  // ✅ Load saved jobs from localStorage on mount
  useEffect(() => {
    const storedJobs = localStorage.getItem("savedJobs");
    if (storedJobs) {
      try {
        setSavedJobs(JSON.parse(storedJobs));
      } catch {
        console.error("Error parsing saved jobs from localStorage");
      }
    }
  }, []);

  // ✅ Save to localStorage whenever savedJobs changes
  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/jobs/", {
        params: { query, location },
      });
      setJobs(res.data.jobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [query, location]);

  // ✅ Toggle save/unsave job logic
  const toggleSaveJob = (job) => {
    const isSaved = savedJobs.some(
      (saved) => saved.title === job.title && saved.company === job.company
    );

    if (isSaved) {
      const updated = savedJobs.filter(
        (saved) => !(saved.title === job.title && saved.company === job.company)
      );
      setSavedJobs(updated);
    } else {
      setSavedJobs([...savedJobs, job]);
    }
  };

  const isJobSaved = (job) =>
    savedJobs.some((saved) => saved.title === job.title && saved.company === job.company);

  return (
    <Sheet
      sx={{
        width: "95%",
        maxWidth: "1200px",
        margin: "auto",
        mt: 4,
        p: 4,
        borderRadius: "md",
        boxShadow: "lg",
      }}
    >
      <Typography level="h4" mb={3} fontWeight="bold" textAlign="center">
        Job Finder Portal
      </Typography>

      <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)}>
        <TabList sx={{ mb: 3 }}>
          <Tab>Find Jobs</Tab>
          <Tab>Saved Jobs</Tab>
        </TabList>

        {/* ====================== FIND JOBS TAB ====================== */}
        <TabPanel value={0}>
          {/* Filters Section */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            mb={4}
            flexWrap="wrap"
            alignItems="flex-end"
            justifyContent="center"
            sx={{ gap: 2 }}
          >
            <FormControl sx={{ minWidth: 180 }}>
              <FormLabel>Role</FormLabel>
              <Select value={query} onChange={(e, val) => setQuery(val)}>
                {roles.map((role) => (
                  <Option key={role} value={role}>
                    {role}
                  </Option>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 180 }}>
              <FormLabel>Company</FormLabel>
              <Select value={company} onChange={(e, val) => setCompany(val)}>
                <Option value="">All</Option>
                {companies.map((c) => (
                  <Option key={c} value={c}>
                    {c}
                  </Option>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 180 }}>
              <FormLabel>Location</FormLabel>
              <Select value={location} onChange={(e, val) => setLocation(val)}>
                {locations.map((loc) => (
                  <Option key={loc} value={loc}>
                    {loc}
                  </Option>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 180 }}>
              <FormLabel>Experience</FormLabel>
              <Select value={experience} onChange={(e, val) => setExperience(val)}>
                <Option value="">All</Option>
                {experiences.map((exp) => (
                  <Option key={exp} value={exp}>
                    {exp}
                  </Option>
                ))}
              </Select>
            </FormControl>

            {/* ✅ Perfectly aligned Search Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                height: "100%",
              }}
            >
              <Button
                variant="solid"
                color="primary"
                onClick={fetchJobs}
                sx={{
                  px: 5,
                  py: 1.4,
                  fontWeight: 600,
                  borderRadius: "md",
                  boxShadow: "sm",
                  ":hover": { boxShadow: "md", transform: "translateY(-1px)" },
                }}
              >
                Search Jobs
              </Button>
            </Box>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          {/* Job Cards */}
          <Stack spacing={2}>
            {jobs
              .filter((job) => (company ? job.company === company : true))
              .map((job, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    flexWrap: "wrap",
                    transition: "all 0.2s",
                    "&:hover": { boxShadow: "xl", transform: "translateY(-3px)" },
                  }}
                >
                  <CardContent sx={{ flex: "1 1 70%" }}>
                    <Typography level="h6" fontWeight="bold">
                      {job.title}
                    </Typography>
                    <Typography level="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
                      {job.company} | {job.location} | {job.portal}
                    </Typography>
                    <Typography level="body3" sx={{ mt: 0.3, color: "text.tertiary" }}>
                      Experience: {job.experience || "Not specified"}
                    </Typography>
                  </CardContent>

                  <CardOverflow
                    sx={{
                      flex: "1 1 25%",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: 1,
                      mt: { xs: 2, sm: 0 },
                    }}
                  >
                    <IconButton
                      variant="plain"
                      color={isJobSaved(job) ? "warning" : "neutral"}
                      onClick={() => toggleSaveJob(job)}
                      sx={{
                        transition: "0.2s",
                        "&:hover": { transform: "scale(1.2)" },
                      }}
                    >
                      {isJobSaved(job) ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>

                    <Button
                      variant="solid"
                      color="primary"
                      onClick={() => window.open(job.apply_url, "_blank")}
                    >
                      Apply
                    </Button>
                  </CardOverflow>
                </Card>
              ))}
          </Stack>
        </TabPanel>

        {/* ====================== SAVED JOBS TAB ====================== */}
        <TabPanel value={1}>
          {savedJobs.length === 0 ? (
            <Typography level="body1" textAlign="center" mt={3}>
              No saved jobs yet.
            </Typography>
          ) : (
            <Stack spacing={2}>
              {savedJobs.map((job, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    flexWrap: "wrap",
                    transition: "0.2s",
                    "&:hover": { boxShadow: "lg" },
                  }}
                >
                  <CardContent sx={{ flex: "1 1 70%" }}>
                    <Typography level="h6" fontWeight="bold">
                      {job.title}
                    </Typography>
                    <Typography level="body2" sx={{ mt: 0.5 }}>
                      {job.company} | {job.location} | {job.portal}
                    </Typography>
                    <Typography level="body3" sx={{ mt: 0.3 }}>
                      Experience: {job.experience || "Not specified"}
                    </Typography>
                  </CardContent>

                  <CardOverflow
                    sx={{
                      flex: "1 1 20%",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <IconButton
                      variant="plain"
                      color="warning"
                      onClick={() => toggleSaveJob(job)}
                      sx={{
                        transition: "0.2s",
                        "&:hover": { transform: "scale(1.2)" },
                      }}
                    >
                      <StarIcon />
                    </IconButton>
                    <Button
                      variant="solid"
                      color="primary"
                      onClick={() => window.open(job.apply_url, "_blank")}
                    >
                      Apply
                    </Button>
                  </CardOverflow>
                </Card>
              ))}
            </Stack>
          )}
        </TabPanel>
      </Tabs>
    </Sheet>
  );
};

export default JobFinder;
