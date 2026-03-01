import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ChevronDown, ChevronUp, CircleCheck, CircleX, RotateCcw, Copy, Timer as TimerIcon, Pause, AlignLeft } from "lucide-react";
import InteractionBox from "./InteractionBox";
import questions from "./question.json";

function Questions() {
    const location = useLocation();
    const { questionName } = useParams();
    const [problem, setProblem] = useState(location.state?.problem || null);
    const [selectedOption, setSelectedOption] = useState("Java");
    const [isOpen, setIsOpen] = useState(false);
    const [outputs, setOutputs] = useState([]);
    const [code, setCode] = useState("");

    const [timerActive, setTimerActive] = useState(false);
    const [timer, setTimer] = useState(0);
    const timerRef = React.useRef(null);

    const options = ["Java", "Python", "C", "C++", "JavaScript"];

    useEffect(() => {
        if (!problem && questionName) {
            const found = questions.find(
                q => q.title.toLowerCase().replace(/\s+/g, "-") === questionName
            );
            setProblem(found || null);
        }
    }, [problem, questionName]);

    useEffect(() => {
        if (problem) {
            setCode(getCodeByLanguage(problem, selectedOption));
        }
    }, [problem, selectedOption]);

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
        return result ? result.code : "No code available";
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.target;
            const beforeCursor = code.slice(0, selectionStart);
            const afterCursor = code.slice(selectionEnd);
            const lines = beforeCursor.split("\n");
            const lastLine = lines[lines.length - 1];
            const match = lastLine.match(/^(\s*)/);
            let leadingSpaces = match ? match[0] : "";
            if (lastLine.trim().endsWith("{")) leadingSpaces += "  ";
            const newCode = beforeCursor + "\n" + leadingSpaces + afterCursor;
            setCode(newCode);
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = selectionStart + 1 + leadingSpaces.length;
            }, 0);
        }
    };

    const handleRunCode = async () => {
        const lang = selectedOption;
        const imports = problem.imports?.[lang] || "";
        const mainClass = problem.main_class?.[lang] || "";
        const testCasesArr = problem.testcases?.[lang] || [];
        const testCasesCode = Array.isArray(testCasesArr) ? testCasesArr.join("\n") : "";

        const payload = {
            language: lang.toLowerCase(),
            version: (problem.header?.find(item => item.language === lang)?.version) || "",
            code: imports + "\n" + code.trim() + "\n" + mainClass.replace("${testcases}", testCasesCode),
        };

        try {
            const res = await fetch("http://127.0.0.1:5000/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            setOutputs(data.output ? data.output.split("\n") : ["Error running code"]);
        } catch (error) {
            console.error(error);
            setOutputs(["Execution failed"]);
        }
    };

    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    const handleReset = () => {
        setCode(getCodeByLanguage(problem, selectedOption));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
    };

    const handleFormat = () => {
        let formatted = code;
        if (["Java", "C", "C++", "JavaScript"].includes(selectedOption)) {
            // Simple block formatter for curly-brace languages
            let indent = 0;
            formatted = code
                .split('\n')
                .map(line => line.trim())
                .map(line => {
                    if (line.endsWith('}')) indent--;
                    const res = '    '.repeat(Math.max(indent, 0)) + line;
                    if (line.endsWith('{')) indent++;
                    return res;
                })
                .join('\n');
        } else if (selectedOption === "Python") {
            // Simple Python formatter: trim and indent all lines
            formatted = code
                .split('\n')
                .map(line => line.trim() ? '    ' + line.trim() : '')
                .join('\n');
        }
        setCode(formatted);
    };

    if (!problem) {
        return (
            <div className="text-center mt-10 text-2xl font-bold text-red-500">
                No problem data available. Please go back and select a problem.
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row justify-center  h-[87vh] p-2 gap-4">
            <InteractionBox title={problem.title} problem={problem} />
            <div className="w-full md:w-3/5 h-full overflow-y-auto bg-gray-100 p-2 rounded-lg shadow-md">
                <div className="bg-white p-4 mb-4 rounded-lg shadow">
                    <h2 className="text-xl font-bold">{problem.series}.{problem.title}</h2>
                    <p className="text-gray-700 mt-2">
                        {problem.description.split("\n").map((line, i) => (
                            <React.Fragment key={i}>{line}<br /></React.Fragment>
                        ))}
                    </p>
                    <h3 className="text-md font-semibold mt-4">Example:</h3>
                    {problem.example.map((ex, i) => (
                        <pre key={i} className="bg-gray-200 p-3 rounded-md mt-2">{ex}</pre>
                    ))}
                    {/* Constraints */}
                    {problem.constraints && (
                        <div className="mt-4">
                            <h3 className="text-md font-semibold">Constraints:</h3>
                            <ul className="list-disc list-inside text-gray-700 mt-2">
                                {problem.constraints.map((constraint, i) => (
                                    <li key={i}>{constraint}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="bg-white p-4 mb-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Your Solution</h2>
                    <div className="flex items-center justify-between border ">

                        <div className="relative inline-block w-40">
                            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center px-3  bg-white ">
                                {selectedOption}
                                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>
                            {isOpen && (
                                <ul className="absolute left-0 w-full text-white bg-gradient-to-b from-[#5418ebe6] to-[#aa6ef9ea] p-4 flex flex-col items-center mt-1 gap-4 rounded-[0.5vw] shadow-lg z-20">
                                    {options.map((option, index) => (
                                        <li key={index} className="px-4 py-2 cursor-pointer" onClick={() => {
                                            setSelectedOption(option);
                                            setIsOpen(false);
                                        }}>{option}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="flex items-center gap-1">
                            {/* Format Button */}
                            <button
                                className="text-gray-800 px-2 py-1 flex items-center"
                                onClick={handleFormat}
                                title="Format code"
                            >
                                <AlignLeft className="w-5 h-5 mr-1" />
                            </button>
                            {/* Reset Button */}
                            <button
                                className="text-gray-800 px-2 py-1 flex items-center"
                                onClick={handleReset}
                                title="Reset code"
                            >
                                <RotateCcw className="w-5 h-5" />
                            </button>
                            {/* Copy Button */}
                            <button
                                className="text-gray-800 px-2 py-1 flex items-center"
                                onClick={handleCopy}
                                title="Copy code"
                            >
                                <Copy className="w-5 h-5" />
                            </button>
                            {/* Timer Controls */}
                            <div className="flex items-center bg-gray-200 rounded px-2 py-1 gap-1">
                                {timerActive ? (
                                    <>
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => setTimerActive(false)}
                                            title="Pause timer"
                                        >
                                            <Pause className="w-5 h-5" />
                                        </button>
                                        <button
                                            className="text-gray-600 hover:text-gray-800"
                                            onClick={() => {
                                                setTimer(0);
                                                setTimerActive(false); // Also stop timer on reset
                                            }}
                                            title="Reset timer"
                                        >
                                            <RotateCcw className="w-5 h-5" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="text-green-600 hover:text-green-800"
                                            onClick={() => setTimerActive(true)}
                                            title="Start timer"
                                        >
                                            <TimerIcon className="w-5 h-5" />
                                        </button>
                                        <button
                                            className="text-gray-600 hover:text-gray-800"
                                            onClick={() => {
                                                setTimer(0);
                                                setTimerActive(false); // Also stop timer on reset
                                            }}
                                            title="Reset timer"
                                        >
                                            <RotateCcw className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                                <span className="ml-2 font-mono w-14 text-center">{formatTime(timer)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <textarea
                            className="w-full h-64 md:h-96 p-2 border-b border-l border-r rounded-b-md resize-none font-mono"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    <div className="flex gap-2 mt-4">
                        <button onClick={handleRunCode} className="w-20 py-2 px-4 rounded-lg text-white bg-[#5418ebd2] hover:bg-[#5318EB]">Run</button>
                        <button className="w-20 py-2 px-4 rounded-lg text-white bg-[#aa6ef9d7] hover:bg-[#AB6EF9]">Submit</button>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Output</h2>
                    {/* Score at the top */}
                    {(() => {
                        let correct = 0;
                        if (Array.isArray(problem.Ans)) {
                            correct = outputs.reduce((acc, output, idx) => {
                                const expected = problem.Ans[idx] ? Object.values(problem.Ans[idx])[0] : "";
                                return acc + (output === expected ? 1 : 0);
                            }, 0);
                        }
                        return (
                            <div className="mb-2 font-bold text-blue-700">
                                {correct} / {outputs.length} Correct
                            </div>
                        );
                    })()}

                    {/* Show only first 3 outputs */}
                    {outputs.slice(0, 3).map((output, index) => {
                        const expected = problem.Ans[index] ? Object.values(problem.Ans[index])[0] : "";
                        return (
                            <pre key={index} className="flex items-center bg-gray-200 p-3 rounded-md mt-2 gap-2">
                                {output === expected ? (
                                    <CircleCheck className="w-6 h-6 text-green-500" />
                                ) : (
                                    <CircleX className="w-6 h-6 text-red-500" />
                                )}
                                {output}
                            </pre>
                        );
                    })}

                    {/* If there are more outputs, show if any are wrong */}
                    {outputs.length > 3 && (() => {
                        const extraOutputs = outputs.slice(3);
                        const anyWrong = extraOutputs.some((output, idx) => {
                            const expected = problem.Ans[idx + 3] ? Object.values(problem.Ans[idx + 3])[0] : "";
                            return output !== expected;
                        });
                        if (anyWrong) {
                            return (
                                <div className="mt-2 text-red-600 font-semibold">
                                    +{outputs.length - 3} more outputs are incorrect
                                </div>
                            );
                        }
                        return null;
                    })()}
                </div>
            </div>
        </div>
    );
}

export default Questions;
