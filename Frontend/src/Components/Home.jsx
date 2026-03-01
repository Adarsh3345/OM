import { useState } from "react";
import C from "../Assets/C.png";
import C2 from "../Assets/C2.png";
import HTML from "../Assets/HTML.png";
import Python from "../Assets/Python.png";
import CSS from "../Assets/CSS.png";
import Java from "../Assets/Java.png";
import logo from "../Assets/logo.png";
import google from "../Assets/Google.png";
import meta from "../Assets/Meta.png";
import patym from "../Assets/Paytm.png";
import amazon from "../Assets/Amazon.png";
import adobe from "../Assets/Adobe.png";
import microsoft from "../Assets/Microsoft.png";
import goldman from "../Assets/Goldman.png";

export default function LeetCodeClone() {
  return (
    <div className="font-sans bg-gray-100">
      <header
        className="relative text-center text-white p-10 md:p-16 flex flex-col items-center justify-center min-h-[90vh] 
        bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#5318EB] before:to-[#AB6EF9] before:opacity-80"
      >
        <img
          src={C}
          alt="C Logo"
          className="absolute top-[10%] left-[10%] w-[10%] max-w-[80px] rotate-[-20deg] opacity-70"
        />
        <img
          src={C2}
          alt="C2 Logo"
          className="absolute top-[30%] right-[15%] w-[10%] max-w-[80px] rotate-[20deg] opacity-70"
        />
        <img
          src={HTML}
          alt="HTML Logo"
          className="absolute top-[15%] right-[5%] w-[12%] max-w-[100px] rotate-[20deg] opacity-70"
        />
        <img
          src={Python}
          alt="Python Logo"
          className="absolute bottom-[10%] left-[5%] w-[12%] max-w-[100px] rotate-[-40deg] opacity-70"
        />
        <img
          src={CSS}
          alt="CSS Logo"
          className="absolute bottom-[5%] right-[5%] w-[10%] max-w-[80px] rotate-[-20deg] opacity-70"
        />
        <img
          src={Java}
          alt="Java Logo"
          className="absolute bottom-[20%] left-[20%] w-[10%] max-w-[80px] rotate-[-20deg] opacity-70"
        />

        <img
          src={logo}
          alt="Main Logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
           w-[50%] max-w-[50vw] md:max-w-[40vw] opacity-50"
        />

        <h1 className="text-3xl md:text-5xl font-bold relative z-10">
          Don't just code.<br/> <span className="text-white">Build.</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-xl relative z-10">
          Unlock Your Coding Potential with Om and become a part of the developer's community.
        </p>
        <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 w-[80%] h-24 bg-[#5318EB] opacity-60 blur-2xl z-0"></div>

      </header>
      <section className="mt-[60px] p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center">
          Asked By Companies
        </h1>
        <div className="w-full flex flex-wrap items-center justify-center gap-10 md:gap-16 mt-12">
          <img src={google} alt="Google" className="max-w-[80px] md:max-w-[100px]" />
          <img src={meta} alt="Meta" className="max-w-[90px] md:max-w-[110px]" />
          <img src={amazon} alt="Amazon" className="max-w-[80px] md:max-w-[100px]" />
          <img src={adobe} alt="Adobe" className="max-w-[100px] md:max-w-[120px]" />
          <img src={patym} alt="Paytm" className="max-w-[70px] md:max-w-[90px]" />
          <img src={microsoft} alt="Microsoft" className="max-w-[100px] md:max-w-[120px]" />
          <img src={goldman} alt="Goldman Sachs" className="max-w-[80px] md:max-w-[100px]" />
        </div>
      </section>

     <section className="mt-16 relative flex flex-col items-center justify-center py-12 px-4 overflow-visible">
        {/* Floating Tags - Using relative parent so they stay near the text */}
        <span className="absolute top-10 left-[20%] md:left-[35%] bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-xs font-bold animate-bounce">Java</span>
        <span className="absolute top-0 right-[20%] md:right-[34%] bg-amber-200 text-amber-800 rounded-full px-4 py-1 text-xs font-bold animate-bounce">Python</span>
        <span className="absolute bottom-10 right-[25%] md:right-[32%] bg-orange-400 text-white rounded-full px-3 py-1 text-xs font-bold animate-bounce">JS</span>

        <h1 className="text-4xl md:text-5xl font-extrabold text-center py-4 px-10 border-2 border-dashed border-[#AB6EF9] inline-block mb-6">
          Why OM?
        </h1>
        
        <p className="text-center text-gray-600 max-w-lg text-lg md:text-sm leading-relaxed">
          OM is where coders unite to collaborate, share ideas, and build solutions together — 
          because the best code is written not alone, but with a community that challenges, 
          supports, and inspires you every step of the way.
        </p>
      </section>

      {/* SECTION 2: IMPROVE WEAK AREAS */}
  
  {/* SECTION 1: PRACTICE (Improve Weak Areas) */}
  <section className="mt-24 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16 pb-20">
    
    {/* LEFT TEXT */}
    <div className="md:w-1/2 space-y-4 relative">
      <div className="absolute -left-12 top-0 hidden md:block">
        <div className="absolute top-[26px] -left-2 w-10 h-28 bg-purple-400/20 blur-xl rounded-full"></div>
        <div className="absolute top-10 -left-4 w-16 h-[1px] bg-purple-300"></div>
        <div className="absolute top-14 left-0 w-[1px] h-64 bg-purple-300 "></div>
        <div className="absolute top-4 left-6 w-[1px] h-[40rem] bg-purple-300"></div>
        <div className="absolute top-[34px] left-[18px] w-4 h-4 rounded-full border border-purple-400 bg-purple-500 z-10 shadow-[0_0_20px_5px_rgba(139,92,246,0.6),0_0_40px_10px_rgba(139,92,246,0.4)]"></div>
      </div>

      <h2 className="text-4xl md:text-4xl font-bold leading-tight pl-4">
        Not just practice <br />
        <span className="text-[#8B5CF6]">improve your weak areas</span>
      </h2>

      <p className="text-gray-500 text-lg leading-relaxed max-w-md pl-4">
        Filter them according to their type, skill level, companies and role 
        ensuring that you focus on what matters most to your development as a coder.
      </p>

      <div className="pl-4">
        <button className="bg-[#7C3AED] text-white px-3 py-2 rounded-[0.5rem] font-bold text-lg hover:bg-[#6D28D9] transition-all shadow-xl shadow-purple-100">
          Start Coding
        </button>
      </div>
    </div>

    {/* RIGHT MOCK UI (Practice Features) */}
    <div className="md:w-1/2 relative h-[450px] w-full flex items-center justify-center">
      <div className="absolute right-[-5%] w-[400px] h-[400px] bg-[#8B5CF6] rounded-full z-0"></div>
      
      <div className="absolute top-20 left-0 bg-white shadow-2xl rounded-2xl p-6 w-[440px] z-10 border border-gray-50 transform -translate-x-4">
        <div className="flex gap-3 mb-6">
          <span className="bg-[#1A1A1A] text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium">📦 All Topics</span>
          <span className="bg-white text-gray-400 border border-gray-100 px-4 py-2 rounded-xl flex items-center gap-2 text-sm"> Algorithms</span>
          <span className="bg-white text-gray-400 border border-gray-100 px-4 py-2 rounded-xl flex items-center gap-2 text-sm"> Database</span>
        </div>
        <div className="flex gap-2">
          <div className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-gray-400 text-xs flex items-center justify-between w-28">Lists <span>▼</span></div>
          <div className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-gray-400 text-xs flex items-center justify-between w-28">Difficulty <span>▼</span></div>
          <div className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-gray-400 text-xs">Status</div>
        </div>
      </div>

      <div className="absolute bottom-4 right-0 bg-white shadow-2xl rounded-3xl p-6 w-72 z-20 border border-gray-50">
        <h4 className="font-bold text-gray-800 text-sm mb-4">Trending Companies</h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {["Facebook", "Amazon", "Google", "Uber", "Apple", "Oracle"].map((name) => (
            <div key={name} className="flex justify-between items-center text-[10px] font-semibold text-gray-600">
              <span>{name}</span>
              <span className="bg-[#F59E0B] text-white px-1.5 py-0.5 rounded-md text-[9px]">560</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  {/* SECTION 2: CONTESTS (Participate in Contests) */}
  <section className="mt-24 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16 pb-20">
    
    {/* LEFT TEXT */}
    <div className="md:w-1/2 space-y-6 relative">
      <div className="absolute -left-12 top-0 hidden md:block">
        <div className="absolute top-[26px] -left-2 w-10 h-10 bg-purple-400/20 blur-xl rounded-full"></div>
        <div className="absolute top-10 -left-4 w-16 h-[1px] bg-purple-300"></div>
        <div className="absolute top-14 left-0 w-[1px] h-64 bg-purple-300"></div>
        <div className="absolute top-4 left-6 w-[1px] h-[43rem] bg-purple-300"></div>
<div className="absolute top-[34px] left-[18px] w-4 h-4 rounded-full border border-purple-400 bg-purple-500 z-10 shadow-[0_0_20px_5px_rgba(139,92,246,0.6),0_0_40px_10px_rgba(139,92,246,0.4)]"></div>      </div>

      <h2 className="text-4xl md:text-4xl font-bold leading-tight pl-4 text-gray-900">
        Participate in Contests and <br />
        reflect yourself.
      </h2>

      <p className="text-gray-500 text-lg leading-relaxed max-w-md pl-4">
        Immerse yourself in the heart-pounding challenges of these competitions, you'll unearth 
        the hero within—a master problem-solver poised to conquer any coding obstacle.
      </p>

      <div className="pl-4">
        <button className="bg-[#7C3AED] text-white px-3 py-2 rounded-[0.5rem] font-bold text-lg hover:bg-[#6D28D9] transition-all shadow-xl shadow-purple-100">
          See Contests
        </button>
      </div>
    </div>

    {/* RIGHT MOCK UI (Contests & Ranking) */}
    <div className="md:w-1/2 relative min-h-[500px] w-full flex items-center justify-center">
      <div className="absolute -top-5 left-0 w-32 h-32 bg-[#8B5CF6] rounded-full z-0"></div>
      <div className="absolute -bottom-10 right-0 w-56 h-56 bg-[#8B5CF6] rounded-full z-0"></div>
      <div className="absolute top-1/2 -right-5 w-20 h-20 bg-[#8B5CF6] rounded-full z-0"></div>

      <div className="relative bg-white shadow-2xl rounded-2xl p-5 w-full z-10 border border-gray-100 flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex gap-6 text-[11px] font-bold border-b border-gray-100 pb-2">
            <span className="text-gray-900 border-b-2 border-purple-500 pb-2">Past Contests</span>
            <span className="text-gray-400">My Contests</span>
          </div>
          <div className="space-y-3">
            {[390, 389, 126, 388, 387, 125, 386].map((num, i) => (
              <div key={num} className="flex items-center gap-3 p-1">
                <div className={`w-12 h-8 rounded shrink-0 bg-gradient-to-br ${i % 2 === 0 ? 'from-blue-500 to-blue-700' : 'from-emerald-400 to-teal-600'}`}></div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-[10px] font-bold text-gray-800">Weekly Contest {num}</h5>
                  <p className="text-[8px] text-gray-400">Mar 24, 2024 8:00 AM</p>
                </div>
                <span className="text-[8px] font-bold px-2 py-0.5 border rounded text-purple-600 border-purple-100 bg-purple-50">Virtual</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-44 border-l border-gray-100 pl-4 space-y-4">
          <h4 className="text-[10px] font-bold flex items-center gap-1 text-gray-800">
            <span className="text-yellow-500">💡</span> Global Ranking
          </h4>
          <div className="space-y-4">
            {[
              { name: "neal wu", rating: "3686", rank: 1, color: "bg-blue-600" },
              { name: "numb3rs", rating: "3630", rank: 2, color: "bg-emerald-500" },
              { name: "Helton", rating: "3621", rank: 3, color: "bg-indigo-700" },
              { name: "JOHNKRAM", rating: "3527", rank: 4, color: "bg-gray-800" },
              { name: "dnaith", rating: "3510", rank: 5, color: "bg-blue-400" }
            ].map((user) => (
              <div key={user.name} className="flex items-center gap-2">
                 <span className="text-[9px] font-bold text-gray-300 w-2">{user.rank}</span>
                 <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] text-white font-bold ${user.color}`}>{user.name[0].toUpperCase()}</div>
                 <div className="flex-1">
                    <p className="text-[9px] font-bold text-gray-800 truncate">{user.name}</p>
                    <p className="text-[8px] text-gray-400">Rating: {user.rating}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>

 <section className="mt-24 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16 pb-20">
  
  {/* LEFT TEXT */}
  <div className="md:w-1/2 space-y-6 relative">
    
    {/* DECORATIVE CROSSHAIR & LINES - Consistent with your style */}
    <div className="absolute -left-12 top-0 hidden md:block">
      {/* Glow Effect */}
      <div className="absolute top-[26px] -left-2 w-10 h-10 bg-purple-400/20 blur-xl rounded-full"></div>
      
      {/* Horizontal Line */}
      <div className="absolute top-10 -left-4 w-16 h-[1px] bg-purple-300"></div>
      
      {/* Vertical Lines */}
      <div className="absolute top-14 left-0 w-[1px] h-64 bg-purple-300"></div>
      <div className="absolute top-4 left-6 w-[1px] h-72 bg-purple-300"></div>
      
      {/* Target Circle with Intense Purple Glow */}
        <div className="absolute top-[34px] left-[18px] w-4 h-4 rounded-full border border-purple-400 bg-purple-500 z-10 shadow-[0_0_20px_5px_rgba(139,92,246,0.6),0_0_40px_10px_rgba(139,92,246,0.4)]"></div>
      
    </div>

    <h2 className="text-4xl md:text-5xl font-bold leading-tight pl-4 text-gray-900">
      Focus on what really <br />
      matters: <span className="text-gray-900">The Code.</span>
    </h2>

    <p className="text-gray-500 text-lg leading-relaxed max-w-md pl-4">
      Build skills-based coding tests with tech problems a developer would encounter on the 
      job — and hire the team behind your next big idea.
    </p>

    <div className="pl-4">
      <button className="bg-[#7C3AED] text-white px-3 py-2 rounded-[0.5rem] font-bold text-lg hover:bg-[#6D28D9] transition-all shadow-xl shadow-purple-200">
        Take a demo
      </button>
    </div>
  </div>

  {/* RIGHT MOCK UI - CODE EDITOR */}
  <div className="md:w-1/2 relative min-h-[500px] w-full flex items-center justify-center">
    {/* Large Purple Background Circle from image */}
    <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] bg-[#8B5CF6] rounded-full z-0 opacity-100"></div>

    {/* Code Editor Window */}
    <div className="relative bg-white shadow-2xl rounded-xl w-full z-10 border border-gray-300 overflow-hidden flex flex-col h-[480px]">
  
  {/* Editor Header */}
  <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-100">
    <div className="flex items-center gap-2">
      <div className="px-2 py-1 text-[13px] flex items-center gap-1 font-medium text-gray-700 cursor-pointer hover:bg-gray-50 rounded border border-transparent hover:border-gray-200">
        Java <span className="text-[10px] text-gray-400">▼</span>
      </div>
    </div>
    <div className="flex items-center gap-4 text-gray-500">
      <button title="Menu" className="hover:text-black text-lg">≡</button>
      <button title="Reset" className="hover:text-black text-lg">↺</button>
      <button title="Copy" className="hover:text-black">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </button>
      <div className="flex items-center gap-2 border-l pl-4">
        <span className="text-green-500 text-lg">⏱</span>
        <button title="Timer Reset" className="hover:text-black text-sm font-bold">↺</button>
        <span className="text-sm font-mono font-bold text-gray-700">00:00</span>
      </div>
    </div>
  </div>

  {/* Code Content Area */}
 <div className="flex-1 p-4 font-mono text-[11px] leading-tight overflow-hidden bg-white">
  <div className="text-black">
    <div><span className="text-blue-600">import</span> java.util.*;</div>
    <br />
    <div><span className="text-purple-600">class</span> <span className="text-green-700">Main</span> &#123;</div>
    
    <div className="ml-4">
      <span className="text-purple-600">private</span> Map&lt;Integer, List&lt;Integer&gt;&gt; adj = <span className="text-purple-600">new</span> HashMap&lt;&gt;();
    </div>

    <div className="ml-4 mt-1">
      <span className="text-purple-600">public void</span> <span className="text-blue-700">addEdge</span>(int u, int v) &#123;
    </div>
    <div className="ml-8">
      adj.computeIfAbsent(u, k -&gt; <span className="text-purple-600">new</span> ArrayList&lt;&gt;()).add(v);
    </div>
    <div className="ml-4">&#125;</div>

    <div className="ml-4 mt-1">
      <span className="text-purple-600">public void</span> <span className="text-blue-700">bfs</span>(int start) &#123;
    </div>
    <div className="ml-8">
      Queue&lt;Integer&gt; q = <span className="text-purple-600">new</span> LinkedList&lt;&gt;();
      Set&lt;Integer&gt; seen = <span className="text-purple-600">new</span> HashSet&lt;&gt;();
      q.add(start); seen.add(start);
    </div>
    <div className="ml-8 mt-1"><span className="text-purple-600">while</span> (!q.isEmpty()) &#123;</div>
    <div className="ml-12">
      int curr = q.poll();
      <span className="text-purple-600">for</span> (int next : adj.getOrDefault(curr, Collections.emptyList())) &#123;
    </div>
    <div className="ml-16">
      <span className="text-purple-600">if</span> (seen.add(next)) q.add(next);
    </div>
    <div className="ml-12">&#125;</div>
 
    <div className="ml-4">&#125;</div>

  </div>
</div>

  {/* Editor Footer - Buttons at Right */}
  <div className="px-6 py-4 flex items-center justify-end gap-3 bg-white">
    <button className="px-7 py-2 bg-[#7C3AED] text-white rounded-lg text-sm font-medium hover:bg-[#6D28D9] transition-all active:scale-95">
      Run
    </button>
    <button className="px-7 py-2 bg-[#C4B5FD] text-[#5B21B6] rounded-lg text-sm font-medium hover:bg-[#B197FC] transition-all active:scale-95">
      Submit
    </button>
  </div>

</div>

  </div>
</section>



    </div>
  );
}
