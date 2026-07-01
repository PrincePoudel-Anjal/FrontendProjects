import logo from "./assets/logo.png";

function Nav() {
  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl backdrop-blur-md border-b border-slate-700 h-20 px-10 flex items-center justify-between">
      
      <div className="flex items-center gap-4 cursor-pointer">
        <img
          src={logo}
          alt="Logo"
          className="h-12 w-12 object-contain hover:scale-105 transition-transform duration-300"
        />

        <div>
          <h1 className="text-white text-2xl font-bold tracking-wide">
            Resume Analyzer
          </h1>

          <p className="text-slate-400 text-sm">
            AI-Powered ATS & Job Match Analysis
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <button className="text-slate-300 hover:text-white transition-colors duration-300">
          Home
        </button>
      </div>
    </nav>
  );
}

export default Nav;