import React from 'react';
import { PieChart, Pie,Cell, ResponsiveContainer } from "recharts";
// import GenerateRandomColor from "D:/JavaScript/JavaScript Project/AI_Analyzer_Webapp/src/GenerateRandomColor.js";

const sampleData = [
  { name: "JavaScript", score: 90 },
  { name: "React", score: 80 },
  { name: "Node.js", score: 70 },
  { name: "Python", score: 85 },
  { name: "SQL", score: 75 },
];
// function generatecolor(){
//     sampleData.map((item)=>({
//     ...item,
//     color: GenerateRandomColor(),
//   })
//   );
//   }
const PieChartWithPaddingAngle = () => {  
  
  return(
    <ResponsiveContainer className = 'h-full w-full '>
      <PieChart width = {400} height = {400}>
       <Pie
        data={sampleData}
        dataKey="score"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={120}
        fill="#8bc1c5"
        label
      />
      {/* {sampleData.map((entry, index) => (
      <Cell key={index} fill={entry.color} />
    ))} */}
    </PieChart>



    </ResponsiveContainer>
    
  );
};

export default PieChartWithPaddingAngle;
