import React, { useRef, useState, useEffect } from "react";
import UploadImage from "./assets/Upload.png";
import Tesseract from "tesseract.js";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



function Hero() {
  
  const [count,setCount] = useState(0);
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [accuracy] = useState(90);
  
  const [InterviewRateLift] = useState(3.2);

  const [Description, setDescription] = useState("");
  const [response, setResponse] = useState("");             //Response from AI
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  function handleClick() {
    fileInputRef.current.click();
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function OCR(file) {
    Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      setText(text);
      console.log("Extracted Text:", text);
    });
  }

  function handlefileChange(e) {
    const file = e.target.files[0];
    if (file) OCR(file);
  }

  async function analyzeResume(resumeText, jobDescription) {
    setCount(prev =>prev+1);

    try {
      setLoading(true);
      setResponse("");

      const prompt = `

        You are an expert ATS Resume Analyzer.

        Analyze the provided resume against the provided job description.

        Return ONLY valid JSON.
        Do NOT include markdown.
        Do NOT include explanations.
        Do NOT wrap the JSON inside code blocks.
        The response must be valid JSON that can be parsed directly with JSON.parse().

        Evaluation Rules:

        1. Overall Match:
        - Return an integer from 0 to 100 indicating how well the resume matches the job description.

        2. ATS Score:
        - Return an integer from 0 to 100 based on ATS friendliness.
        Consider:
        - Keywords
        - Formatting
        - Sections
        - Readability
        - Action verbs

        3. CV Strength:
        - Return a decimal from 0 to 10.

        4. Skills Align:
        - Return an integer from 0 to 100.

        5. Skill Scores:
        Evaluate every important skill found in the job description.
        Return a score between 0 and 100 showing how well the resume demonstrates each skill.

        6. Skill Distribution:
        Create percentages for major categories.
        The values must add up to exactly 100.

        Example categories:
        Frontend
        Backend
        Database
        Cloud
        DevOps
        Programming
        Tools
        Other

        7. Strengths:
        Return 4–8 strengths.

        8. Weaknesses:
        Return 3–6 weaknesses.

        9. Missing Skills:
        Return skills required in the job description that are absent or weak.

        10. Suggestions:
        Return actionable suggestions to improve the resume.

        11. Resume Summary:
        Write a professional summary of 2–3 sentences describing how competitive the resume is.

        Return the response in exactly this format:

        {
          "overallMatch": 85,
          "atsScore": 91,
          "cvStrength": 8.7,
          "skillsAlign": 83,

          "skillScores": [
            {
              "name": "React",
              "score": 95
            },
            {
              "name": "JavaScript",
              "score": 90
            },
            {
              "name": "Node.js",
              "score": 60
            }
          ],

          "skillDistribution": [
            {
              "name": "Frontend",
              "value": 45
            },
            {
              "name": "Backend",
              "value": 20
            },
            {
              "name": "Database",
              "value": 15
            },
            {
              "name": "Cloud",
              "value": 10
            },
            {
              "name": "Other",
              "value": 10
            }
          ],

          "strengths": [
            "...",
            "..."
          ],

          "weaknesses": [
            "...",
            "..."
          ],

          "missingSkills": [
            "...",
            "..."
          ],

          "suggestions": [
            "...",
            "..."
          ],

          "summary": "..."
        }

        Resume:
        ${resumeText}

        Job Description:
        ${jobDescription}
`;

      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen2.5:7b",
          prompt,
          stream: false, 
        }),
      });
      
      
      const data = await res.json();
      setResponse(data.response);
      const analysis = JSON.parse(data.response);
      navigate("/dashboard",{
        state:{
          analysis:analysis,
        },       
      });
    } catch (err) {
      console.error(err);
      setResponse("Error: Unable to connect to Ollama.");
    } finally {
      setLoading(false);
    } 
  }


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-[#2A2D42] to-slate-950">

      {/* Hero Text */}
      <div className="mt-3 px-6">
        <h1 className="text-white text-6xl font-extrabold text-center">
          Land Your Next Role
        </h1>

        <p className="text-blue-400 text-6xl font-extrabold text-center mt-2">
          with Precision.
        </p>

        <p className="text-slate-400 text-lg text-center max-w-3xl mx-auto mt-8">
          Upload your resume and paste a job description. AI will analyze ATS
          match, skill gaps, keyword alignment, and give actionable insights.
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-8 mt-10 px-6">

        <div className="w-64 h-32 bg-slate-800/70 backdrop-blur-lg rounded-3xl border border-slate-700 flex flex-col justify-center items-center shadow-xl">
          <p className="text-4xl font-bold text-blue-400">{accuracy}%</p>
          <p className="text-slate-400 mt-2">ATS Accuracy</p>
        </div>

        <div className="w-64 h-32 bg-slate-800/70 backdrop-blur-lg rounded-3xl border border-slate-700 flex flex-col justify-center items-center shadow-xl">
          <p className="text-4xl font-bold text-green-400">
            {count}+
          </p>
          <p className="text-slate-400 mt-2">Resumes Analyzed</p>
        </div>

        <div className="w-64 h-32 bg-slate-800/70 backdrop-blur-lg rounded-3xl border border-slate-700 flex flex-col justify-center items-center shadow-xl">
          <p className="text-4xl font-bold text-purple-400">
            {InterviewRateLift}x
          </p>
          <p className="text-slate-400 mt-2">Interview Boost</p>
        </div>
      </div>

      {/* Upload + Input */}
      <div className="flex flex-wrap justify-center items-center gap-10 mt-10 px-6">

        <div
          onClick={handleClick}
          className="w-80 h-52 bg-slate-800/70 border-2 border-dashed border-blue-500 rounded-3xl cursor-pointer flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 shadow-xl"
        >
          <img src={UploadImage} alt="upload" className="h-20 w-20 mb-4" />
          <p className="text-white font-semibold text-lg">Upload Resume</p>
          <p className="text-slate-400 text-sm mt-2">
            PDF, JPG, PNG supported
          </p>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handlefileChange}
          className="hidden"
        />
        <textarea
          placeholder="Paste Job Description Here..."
          onChange={handleDescription}
          className="w-[600px] h-52 p-5 rounded-3xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Button */}
      <div className="flex justify-center mt-10">
        <button 
          disabled={loading}
          onClick={() => analyzeResume(text, Description)}
          className="px-10 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>
    </div>
  );
}

export default Hero;
