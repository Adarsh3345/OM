import React, { useState, useEffect } from "react";
import questions from "./question.json";
import { Link,useParams } from "react-router-dom";
function Problem() {
  const [problems, setProblems] = useState([]);
const { roomId } = useParams();
  useEffect(() => {
    setProblems(questions);
    console.log(roomId)
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl text-center">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700">
          Every Problem is a stepping Stone to success!
        </h1>
        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
          The greatest minds in history thrived on challenges. Every bug, every
          error, and every tough problem is an opportunity to learn, grow, and
          improve. Success isn't about never failing—it's about rising every
          time you do. So, embrace the struggle, push your limits, and turn
          obstacles into stepping stones. The journey to mastery begins with a
          single step—let’s code our way to greatness!
        </p>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-800 border-t py-6">
           📖 Study Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-lg">
            <div className="bg-[#5418ebd2] hover:bg-[#5318EB] text-white font-semibold py-3 px-6 rounded-lg shadow-md text-center cursor-pointer trransition duration-300">
               Top 75 Questions
            </div>
            <div className="bg-blue-100 hover:bg-blue-200 text-white font-semibold py-3 px-6 rounded-lg shadow-md text-center cursor-pointer transition duration-300">
               Top 100 Questions
            </div>
            <div className="bg-[#aa6ef9d7] hover:bg-[#AB6EF9] text-white font-semibold py-3 px-6 rounded-lg shadow-md text-center cursor-pointer transition durarion-300">
               Top 150 Questions
            </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto mt-6">
        <div className="grid grid-cols-4 font-bold bg-gray-200 p-3 rounded-md text-center">
          <div>Series</div>
          <div className="text-left pl-4">Title</div>
          <div>Solution</div>
          <div>Difficulty</div>
        </div>
        {problems.map((problem,index)=>{
          const isEven=parseInt(problem.series)%2==0;
           const formattedTitle = problem.title.toLowerCase().replace(/\s+/g, '-');
          const path = roomId
            ? `/questions/${formattedTitle}/${roomId}`
            : `/questions/${formattedTitle}`;
          return(
            <Link 
              key={index}
              to={path}
              state={{problem}}>
               <div className={`grid grid-cols-4 border-b py-2 text-center items-center cursor-pointer ${isEven?"bg-gray-100":""}`}>
                <div>{problem.series}</div>
                <div className="text-left pl-4">{problem.title}</div>
                <div className="text-blue-500 hover:underline">{problem.solution}</div>
                <div>{problem.difficulty}</div>
               </div>

              </Link>
          )
        })}
      </div>

    </div>
  )
}

export default Problem;