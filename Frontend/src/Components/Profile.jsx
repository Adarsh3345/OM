import React, { useEffect, useState } from "react";

function Profile() {
  // Example: Replace this static data with API data later
  const [user, setUser] = useState({
    name: "Alice",
    rank: "Expert Coder",
    bio: "Passionate about algorithms, collaboration, and building open-source projects.",
    solvedCount: 300,
    totalCount: 400,
    attemptingCount: 100,
    easySolved: 150,
    easyTotal: 200,
    mediumSolved: 90,
    mediumTotal: 150,
    hardSolved: 30,
    hardTotal: 50,
    accuracyRate: 80,
    dailyStreak: 15,
    problemsThisYear: 120,
  });


  const solvedPercent = Math.round((user.solvedCount / user.totalCount) * 100);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-[#5318EB] to-[#AB6EF9] overflow-hidden text-gray-800">
      <main className="max-w-6xl mx-auto space-y-8">
        
        {/* ========== TOP SECTION ========== */}
        <section className="bg-white opacity-600 p-6 md:p-8 rounded-xl shadow-2xl flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
          
          {/* Left Column: Avatar + Languages */}
          <div className="flex flex-col items-center lg:items-start space-y-4 lg:w-1/4">
            {/* Avatar / Badge Circle */}
            <div className="w-32 h-32 rounded-full border-4 border-violet-400 flex items-center justify-center font-medium text-gray-500">
              Avatar
            </div>

            {/* Languages */}
            <div className="w-full">
              <p className="text-sm font-semibold mb-2">Languages</p>
              <div className="flex space-x-2 flex-wrap">
                {["C++", "Python", "JavaScript", "Java"].map((lang, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1 text-xs bg-violet-100 text-violet-700 rounded-full font-semibold"
                  >
                    {lang}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="flex-grow space-y-4">
            <div className="space-y-2">
              <p className="text-3xl font-extrabold">{user.name}</p>
              <p className="text-lg text-gray-600">{user.rank}</p>
              <p className="text-base text-gray-500">
                {user.attemptingCount} Attempting
              </p>

              {/* Small icons placeholders */}
              <div className="flex space-x-2 pt-1">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-violet-400 rounded-md"></div>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm font-semibold mb-1">Bio</p>
              <p className="text-gray-700">{user.bio}</p>
            </div>
          </div>
        </section>

        {/* ========== MIDDLE SECTION ========== */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Problem Stats */}
          <div className="bg-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105 duration-300 flex items-center space-x-6">
            {/* Circle Chart */}
            <div className="relative w-24 h-24">
              <svg className="absolute top-0 left-0 w-full h-full">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="#E5E7EB"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="#7C3AED"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${(solvedPercent / 100) * 283} 283`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="flex flex-col items-center justify-center h-full text-xs font-semibold">
                {user.solvedCount}/{user.totalCount}
              </div>
            </div>

            {/* Difficulty Stats */}
            <div className="space-y-1 text-sm font-medium">
              <div className="flex justify-between">
                <span>Easy</span>
                <span className="text-green-600">{`${user.easySolved}/${user.easyTotal}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Medium</span>
                <span className="text-yellow-600">{`${user.mediumSolved}/${user.mediumTotal}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Hard</span>
                <span className="text-red-600">{`${user.hardSolved}/${user.hardTotal}`}</span>
              </div>
              <div className="pt-2 text-gray-600">
                Accuracy: <span className="font-bold">{user.accuracyRate}%</span>
              </div>
            </div>
          </div>

          {/* Card 2: Daily Streak */}
          <div className="bg-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105 duration-300">
            <h3 className="text-lg font-bold mb-3">Daily Streak & Activity</h3>
            <div className="flex items-center space-x-4 mb-4">
              <p className="text-4xl font-extrabold text-violet-600">
                {user.dailyStreak}
              </p>
              <p className="text-sm font-medium">Days Streak</p>
            </div>
            <div className="pt-2 space-y-2">
              <div className="w-full h-2 bg-violet-200 rounded-full relative">
                <div
                  className="absolute top-0 left-0 h-2 bg-violet-500 rounded-full"
                  style={{ width: `${Math.min(user.problemsThisYear / 2, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{user.problemsThisYear} problems this year</span>
                <span>200 max</span>
              </div>
            </div>
          </div>

          {/* Card 3: Badges */}
          <div className="bg-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105 duration-300">
            <h3 className="text-lg font-bold mb-3">Badges & Achievements</h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              {[
                "🏆 Contest Winner",
                "🔥 Daily Streak",
                "💪 5 Problems Solved",
                "🎯 Daily Motivator",
              ].map((badge, index) => (
                <div
                  key={index}
                  className="text-xs text-violet-700 p-2 bg-violet-50 rounded-md font-semibold shadow-sm"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== BOTTOM SECTION ========== */}
        <section className="bg-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105 duration-300">
          <h2 className="text-xl font-bold mb-4">Recent Submissions</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex justify-between items-center border-b border-gray-100 pb-2"
              >
                <span className="font-medium text-gray-700">
                  Question {item}
                </span>
                <div className="w-1/3 h-3 bg-violet-200 rounded-full relative overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-violet-500"
                    style={{ width: `${Math.random() * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;
