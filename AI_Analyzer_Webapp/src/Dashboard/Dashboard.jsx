import React, { useState } from "react";
import PieChartWithPaddingAngle from "./PieChartWithPaddingAngle";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const analysis = location.state?.analysis;
  let navigate = useNavigate();

  if (!analysis) {
    return (
      <div className="h-screen flex justify-center items-center bg-slate-900 text-white text-2xl">
        No Analysis Found
      </div>
    );
  }

  const [overallscore] = useState(analysis.overallMatch);
  const [atsScore] = useState(analysis.atsScore);
  const [cvStrength] = useState(analysis.cvStrength);
  const [skillsAlign] = useState(analysis.skillsAlign);

  const progs = analysis.skillScores.map((skill) => (
    <div
      key={skill.name}
      className="flex flex-col gap-2 text-white font-semibold mb-5"
    >
      <div className="flex justify-between">
        <span>{skill.name}</span>
        <span>{skill.score}%</span>
      </div>

      <progress
        value={skill.score}
        max={100}
        className="w-full h-4"
      ></progress>
    </div>
  ));

  function handleGoBack(){    
    navigate(-1);
  }

  return (
    <>    
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-slate-900 via-[#2A2D42] to-slate-950">
      <button className = 'text-white font-bold rounded-s-4xl bg-red-400 h-10 w-30' onClick = {handleGoBack}>GoBack</button>
      {/* Top Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-6 py-8 justify-items-center">

        {/* Overall Score */}
        <div
          className="h-50 w-50 rounded-full flex justify-center items-center text-2xl font-semibold"
          style={{
            background: `conic-gradient(red ${overallscore}%, lightgrey 0%)`,
          }}
        >
          <div className="flex justify-center items-center text-black bg-white h-44 w-44 rounded-full">
            Overall: {overallscore/10}/10
          </div>
        </div>

        {/* ATS Score */}
        <div
          className="h-50 w-50 rounded-full flex justify-center items-center text-2xl font-semibold"
          style={{
            background: `conic-gradient(red ${atsScore}%, lightgrey 0%)`,
          }}
        >
          <div className="flex justify-center items-center text-black bg-white h-44 w-44 rounded-full">
            ATS: {atsScore/10}/10
          </div>
        </div>

        {/* CV Strength */}
        <div
          className="h-50 w-50 rounded-full flex justify-center items-center text-2xl font-semibold"
          style={{
            background: `conic-gradient(red ${cvStrength * 10}%, lightgrey 0%)`,
          }}
        >
          <div className="flex justify-center items-center text-black bg-white h-44 w-44 rounded-full">
            CV: {cvStrength}/10
          </div>
        </div>

        {/* Skills Alignment */}
        <div
          className="h-50 w-50 rounded-full flex justify-center items-center text-2xl font-semibold"
          style={{
            background: `conic-gradient(red ${skillsAlign}%, lightgrey 0%)`,
          }}
        >
          <div className="flex justify-center items-center text-black bg-white h-44 w-44 rounded-full">
            Skills: {skillsAlign/10}/10
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-1 justify-center items-center">

        {/* Suggestion Bar */}
        <div className="border-10 border-orange-300 m-3 flex justify-center items-center w-2/5 text-white font-bold p-10">
          <p><p className = 'font-bold mb-4 text-4xl text-orange-500'>Suggestions:</p>{analysis.suggestions}</p>
        </div>

        {/* Skills */}
        <div className="m-8 p-6 rounded-xl bg-gradient-to-br from-slate-900 via-[#2A2AC3] to-slate-950 w-2/5 overflow-y-auto">
          <h2 className="text-white text-2xl font-bold mb-6">
            Skill Scores
          </h2>

          {progs}
        </div>

      </div>
    </div>
  </>
  );
};

export default Dashboard;