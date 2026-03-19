import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  ChevronDown, ChevronUp, RotateCcw, Copy,
  Timer as TimerIcon, Pause, AlignLeft
} from "lucide-react";
import InteractionBox from "./InteractionBox";
import questions from "./question.json";
import Editor from "@monaco-editor/react";

const API_URL = "https://om-mh8v.onrender.com";

function Questions() {
  const location = useLocation();
  const { questionName } = useParams();

  const [problem, setProblem] = useState(location.state?.problem || null);
  const [selectedOption, setSelectedOption] = useState("Java");
  const [isOpen, setIsOpen] = useState(false);
  const [outputs, setOutputs] = useState([]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const [timerActive, setTimerActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  const options = ["Java", "Python", "C", "C++", "JavaScript"];

  // Load problem
  useEffect(() => {
    if (!problem && questionName) {
      const found = questions.find(
        q => q.title.toLowerCase().replace(/\s+/g, "-") === questionName
      );
      setProblem(found || null);
    }
  }, [problem, questionName]);

  // Load default code when problem OR language changes
  useEffect(() => {
    if (problem) {
      setCode(getCodeByLanguage(problem, selectedOption));
    }
  }, [problem, selectedOption]);

  // Timer
  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive]);

  const getCodeByLanguage = (problem, language) => {
    const result = problem.header?.find(item => item.language === language);
    return result ? result.code : "// Write your code here";
  };

  // 🚀 RUN CODE
  const handleRunCode = async () => {
    if (!problem) return;

    const lang = selectedOption;
    const imports = problem.imports?.[lang] || "";
    const mainClass = problem.main_class?.[lang] || "";
    const testCasesArr = problem.testcases?.[lang] || [];
    const testCasesCode = Array.isArray(testCasesArr)
      ? testCasesArr.join("\n")
      : "";

    const payload = {
      language: lang.toLowerCase(),
      version:
        problem.header?.find(item => item.language === lang)?.version || "",
      code:
        imports +
        "\n" +
        code.trim() +
        "\n" +
        mainClass.replace("${testcases}", testCasesCode),
    };

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.error) {
        setOutputs([data.error]);
      } else {
        setOutputs(data.output ? data.output.split("\n") : ["No output"]);
      }
    } catch (err) {
      console.error(err);
      setOutputs(["Execution failed"]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCode(getCodeByLanguage(problem, selectedOption));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleFormat = () => {
    let indent = 0;
    const formatted = code
      .split("\n")
      .map(line => line.trim())
      .map(line => {
        if (line.endsWith("}")) indent--;
        const res = "    ".repeat(Math.max(indent, 0)) + line;
        if (line.endsWith("{")) indent++;
        return res;
      })
      .join("\n");

    setCode(formatted);
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!problem) {
    return (
      <div className="text-center mt-10 text-2xl font-bold text-red-500">
        No problem data available.
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-[87vh] p-2 gap-4">
      <InteractionBox title={problem.title} problem={problem} />

      <div className="w-full md:w-3/5 bg-gray-100 p-2 rounded-lg shadow-md overflow-y-auto">

        {/* Problem */}
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h2 className="text-xl font-bold">
            {problem.series}.{problem.title}
          </h2>
          <p className="mt-2 text-gray-700">{problem.description}</p>
        </div>

        {/* Editor */}
        <div className="bg-white p-4 rounded-lg shadow mb-4">

          <div className="flex justify-between items-center">

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2"
              >
                {selectedOption}
                {isOpen ? <ChevronUp /> : <ChevronDown />}
              </button>

              {isOpen && (
                <ul className="absolute bg-purple-600 text-white p-2 rounded shadow z-10">
                  {options.map((option) => (
                    <li
                      key={option}
                      className="cursor-pointer px-2 py-1 hover:bg-purple-800"
                      onClick={() => {
                        setSelectedOption(option);
                        setIsOpen(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Tools */}
            <div className="flex gap-2">
              <button onClick={handleFormat}><AlignLeft /></button>
              <button onClick={handleReset}><RotateCcw /></button>
              <button onClick={handleCopy}><Copy /></button>
            </div>
          </div>

          {/* Monaco Editor */}
          <Editor
            key={selectedOption} // 🔥 FIX
            height="50vh"
            language={selectedOption.toLowerCase()}
            value={code}
            onChange={(value) => setCode(value || "")}
          />

          {/* Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleRunCode}
              disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Running..." : "Run"}
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold">Output</h2>
          {outputs.map((out, i) => (
            <pre key={i} className="bg-gray-200 p-2 mt-2 rounded">
              {out}
            </pre>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Questions;