import { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Terminal,
  ExternalLink,
  Cpu,
  Layers,
  Award,
  MessageSquare,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Code,
  GraduationCap,
  Sparkles,
  Check,
  ArrowUpRight
} from "lucide-react";

// Project Type Definition
interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  keyConcepts: string[];
}

export default function App() {
  // Navigation State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Interactive Simulators State
  const [activeSimulator, setActiveSimulator] = useState<string>("voter");

  // Voter Calculator States
  const [voterAge, setVoterAge] = useState<string>("18");
  const [voterIsCitizen, setVoterIsCitizen] = useState<boolean>(true);
  const [voterIsRegistered, setVoterIsRegistered] = useState<boolean>(true);
  const [voterResult, setVoterResult] = useState<{
    eligible: boolean;
    reason: string;
  } | null>(null);

  // ATM Simulator States
  const [atmBalance, setAtmBalance] = useState<number>(1200);
  const [atmAmount, setAtmAmount] = useState<string>("");
  const [atmLogs, setAtmLogs] = useState<string[]>([
    "System: ATM initialized.",
    "System: Balance loaded: ₹1200"
  ]);
  const [atmError, setAtmError] = useState<string | null>(null);
  const [atmSuccess, setAtmSuccess] = useState<string | null>(null);

  // Grade Calculator States
  const [marksPython, setMarksPython] = useState<string>("85");
  const [marksMath, setMarksMath] = useState<string>("78");
  const [marksWeb, setMarksWeb] = useState<string>("90");
  const [gradeResult, setGradeResult] = useState<{
    total: number;
    percentage: number;
    grade: string;
    passed: boolean;
  } | null>(null);

  // Contact Form States
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-scroll handler
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "hackathons", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Run Voter Eligibility Logic
  const handleCalculateVoter = (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = parseInt(voterAge);
    
    if (isNaN(ageNum) || ageNum <= 0) {
      setVoterResult({
        eligible: false,
        reason: "Please enter a valid age."
      });
      return;
    }

    if (ageNum < 18) {
      setVoterResult({
        eligible: false,
        reason: `Ineligible. You are ${ageNum} years old, which is under the minimum voting age of 18.`
      });
    } else if (!voterIsCitizen) {
      setVoterResult({
        eligible: false,
        reason: "Ineligible. Citizen verification is required to participate in elections."
      });
    } else if (!voterIsRegistered) {
      setVoterResult({
        eligible: false,
        reason: "Ineligible. You are old enough, but must be registered in the electoral roll to vote."
      });
    } else {
      setVoterResult({
        eligible: true,
        reason: "Eligible! All criteria met: Age is 18+, citizenship verified, and electoral roll registration confirmed."
      });
    }
  };

  // ATM System Operations
  const handleAtmDeposit = () => {
    const amt = parseFloat(atmAmount);
    if (isNaN(amt) || amt <= 0) {
      setAtmError("Please enter a valid deposit amount.");
      setAtmSuccess(null);
      return;
    }
    setAtmBalance((prev) => prev + amt);
    setAtmLogs((prev) => [
      ...prev,
      `User: Deposited ₹${amt}`,
      `System: Transaction successful. New balance: ₹${atmBalance + amt}`
    ]);
    setAtmSuccess(`Successfully deposited ₹${amt}.`);
    setAtmError(null);
    setAtmAmount("");
  };

  const handleAtmWithdraw = () => {
    const amt = parseFloat(atmAmount);
    if (isNaN(amt) || amt <= 0) {
      setAtmError("Please enter a valid withdrawal amount.");
      setAtmSuccess(null);
      return;
    }
    if (amt > atmBalance) {
      setAtmError("Declined. Insufficient funds in account.");
      setAtmSuccess(null);
      setAtmLogs((prev) => [
        ...prev,
        `User: Attempted to withdraw ₹${amt}`,
        `System: DECLINED - Insufficient balance (Available: ₹${atmBalance})`
      ]);
      return;
    }
    setAtmBalance((prev) => prev - amt);
    setAtmLogs((prev) => [
      ...prev,
      `User: Withdrew ₹${amt}`,
      `System: Transaction successful. New balance: ₹${atmBalance - amt}`
    ]);
    setAtmSuccess(`Successfully withdrew ₹${amt}.`);
    setAtmError(null);
    setAtmAmount("");
  };

  const handleResetAtm = () => {
    setAtmBalance(1200);
    setAtmLogs(["System: ATM reset. Balance loaded: ₹1200"]);
    setAtmAmount("");
    setAtmError(null);
    setAtmSuccess(null);
  };

  // Grade Calculator Logic
  const handleCalculateGrades = (e: React.FormEvent) => {
    e.preventDefault();
    const py = parseFloat(marksPython);
    const math = parseFloat(marksMath);
    const web = parseFloat(marksWeb);

    if (
      isNaN(py) || py < 0 || py > 100 ||
      isNaN(math) || math < 0 || math > 100 ||
      isNaN(web) || web < 0 || web > 100
    ) {
      alert("Please enter marks between 0 and 100 for all subjects.");
      return;
    }

    const total = py + math + web;
    const percentage = Math.round((total / 300) * 1000) / 10;

    let grade = "F";
    let passed = false;

    if (percentage >= 90) {
      grade = "A+ (Excellent)";
      passed = true;
    } else if (percentage >= 80) {
      grade = "A (Very Good)";
      passed = true;
    } else if (percentage >= 70) {
      grade = "B (Good)";
      passed = true;
    } else if (percentage >= 60) {
      grade = "C (Satisfactory)";
      passed = true;
    } else if (percentage >= 50) {
      grade = "D (Pass)";
      passed = true;
    } else {
      grade = "F (Re-appear)";
      passed = false;
    }

    setGradeResult({
      total,
      percentage,
      grade,
      passed
    });
  };

  // Contact Form Submission Handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) {
      alert("Please fill in all fields.");
      return;
    }
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      setFormSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleResetForm = () => {
    setFormName("");
    setFormEmail("");
    setFormMessage("");
    setFormSubmitted(false);
  };

  // Static Projects list matching Hithesh Gaddam's portfolio
  const projectsList: Project[] = [
    {
      id: "voter",
      name: "Voter Eligibility Calculator",
      description: "A beginner-friendly console application that determines whether a person is eligible to vote based on age, citizenship status, and electoral registration criteria.",
      technologies: ["Python", "Control Flow", "Interactive Terminal"],
      keyConcepts: ["Conditional logic", "User input parsing", "Python fundamentals", "Problem-solving"]
    },
    {
      id: "atm",
      name: "ATM Management System",
      description: "A Python-based command-line simulation of a bank ATM. Supports account interactions like balance checks, secure deposits, and withdrawal validations.",
      technologies: ["Python", "Functions", "Mathematical Logic"],
      keyConcepts: ["Python fundamentals", "Conditional statements", "Reusable functions", "Basic transaction flow", "Logical verification"]
    },
    {
      id: "grade",
      name: "Student Grade Calculator",
      description: "An educational application that parses individual subject marks, computes total averages and percentages, and dynamically assigns letter grades based on structured grading rubrics.",
      technologies: ["Python", "Arithmetic Operations", "Data Processing"],
      keyConcepts: ["Python programming", "Nested conditional logic", "Input handling", "Basic data structures"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900 bg-[#FAF9F6]">
      
      {/* ----------------- TOP NAVIGATION BAR ----------------- */}
      <header className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-slate-200/60 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <button 
            onClick={() => scrollToSection("home")} 
            className="text-lg font-bold tracking-tight text-slate-900 hover:text-blue-600 transition-colors cursor-pointer bg-transparent border-0 p-0 font-sans"
          >
            Hithesh Gaddam
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => scrollToSection("home")}
              className={`hover:text-slate-900 transition-colors cursor-pointer relative py-1 bg-transparent border-0 font-sans ${
                activeSection === "home" ? "text-slate-900 font-semibold" : ""
              }`}
            >
              Home
              {activeSection === "home" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
              )}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`hover:text-slate-900 transition-colors cursor-pointer relative py-1 bg-transparent border-0 font-sans ${
                activeSection === "about" ? "text-slate-900 font-semibold" : ""
              }`}
            >
              About
              {activeSection === "about" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
              )}
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className={`hover:text-slate-900 transition-colors cursor-pointer relative py-1 bg-transparent border-0 font-sans ${
                activeSection === "skills" ? "text-slate-900 font-semibold" : ""
              }`}
            >
              Skills
              {activeSection === "skills" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
              )}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className={`hover:text-slate-900 transition-colors cursor-pointer relative py-1 bg-transparent border-0 font-sans ${
                activeSection === "projects" ? "text-slate-900 font-semibold" : ""
              }`}
            >
              Projects
              {activeSection === "projects" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
              )}
            </button>
            <button
              onClick={() => scrollToSection("hackathons")}
              className={`hover:text-slate-900 transition-colors cursor-pointer relative py-1 text-left bg-transparent border-0 font-sans ${
                activeSection === "hackathons" ? "text-slate-900 font-semibold" : ""
              }`}
            >
              Hackathons & Ideathons
              {activeSection === "hackathons" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
              )}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`hover:text-slate-900 transition-colors cursor-pointer relative py-1 bg-transparent border-0 font-sans ${
                activeSection === "contact" ? "text-slate-900 font-semibold" : ""
              }`}
            >
              Contact
              {activeSection === "contact" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
              )}
            </button>
          </nav>

          {/* Zone 3: Navigation Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollToSection("contact")}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 hover:shadow-sm transition-all cursor-pointer whitespace-nowrap border-0"
            >
              Connect with Me
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none border-0 bg-transparent"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="fixed top-16 right-0 bottom-0 w-64 bg-[#FAF9F6] border-l border-slate-200 p-6 flex flex-col gap-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-5 text-base font-medium text-slate-700">
              <button
                onClick={() => scrollToSection("home")}
                className={`text-left hover:text-slate-900 bg-transparent border-0 font-sans ${activeSection === "home" ? "text-blue-600 font-semibold" : ""}`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={`text-left hover:text-slate-900 bg-transparent border-0 font-sans ${activeSection === "about" ? "text-blue-600 font-semibold" : ""}`}
              >
                About Me
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className={`text-left hover:text-slate-900 bg-transparent border-0 font-sans ${activeSection === "skills" ? "text-blue-600 font-semibold" : ""}`}
              >
                Technical Skills
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className={`text-left hover:text-slate-900 bg-transparent border-0 font-sans ${activeSection === "projects" ? "text-blue-600 font-semibold" : ""}`}
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("hackathons")}
                className={`text-left hover:text-slate-900 bg-transparent border-0 font-sans ${activeSection === "hackathons" ? "text-blue-600 font-semibold" : ""}`}
              >
                Hackathons & Ideathons
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`text-left hover:text-slate-900 bg-transparent border-0 font-sans ${activeSection === "contact" ? "text-blue-600 font-semibold" : ""}`}
              >
                Contact
              </button>
            </nav>

            <hr className="border-slate-200" />

            <div className="flex flex-col gap-4">
              <a
                href="https://www.linkedin.com/in/hithesh-gaddam-b13261411?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/gaddamhithesh1777-design"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full text-center py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors mt-2 border-0"
              >
                Connect With Me
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ----------------- 1. HERO SECTION ----------------- */}
      <section id="home" className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-blue-50/30 via-transparent to-transparent border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              
              {/* Subtle status indicator */}
              <div className="inline-flex items-center space-x-2 text-xs font-medium text-slate-500">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span>First-Semester B.Tech Student</span>
                <span>·</span>
                <span>Aspiring AI Engineer</span>
              </div>

              {/* Title Case Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-none text-wrap-balance">
                Hithesh Gaddam
              </h1>
              
              <h2 className="text-lg sm:text-xl font-semibold text-blue-700 tracking-tight">
                B.Tech Student | Aspiring AI Engineer
              </h2>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Building my foundation in Python, Web Development, and Generative AI — one project at a time.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group border-0"
                >
                  View Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-all text-center cursor-pointer"
                >
                  Connect With Me
                </button>
              </div>

              {/* Quick links */}
              <div className="flex items-center gap-5 pt-4 border-t border-slate-200/50 max-w-sm">
                <span className="text-xs text-slate-400 font-mono tracking-wider">CHANNELS</span>
                <a
                  href="https://www.linkedin.com/in/hithesh-gaddam-b13261411?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-500 hover:text-blue-600 transition-colors p-1"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/gaddamhithesh1777-design"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-500 hover:text-slate-900 transition-colors p-1"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Hero Right Visual: Elegant Simulated Code Terminal */}
            <div className="lg:col-span-5">
              <div className="bg-[#1e1e1e] rounded-xl shadow-xl overflow-hidden border border-slate-800 text-slate-300 font-mono text-xs leading-relaxed max-w-md mx-auto">
                {/* Window title bar */}
                <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-[#3e3e3e]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-[#8e8e8e] text-[10px]">learn_ai_agent.py</span>
                  <Terminal className="h-3.5 w-3.5 text-[#8e8e8e]" />
                </div>
                
                {/* Code viewport */}
                <div className="p-5 space-y-3 min-h-[280px] text-left">
                  <div>
                    <span className="text-[#859900]">import</span>{" "}
                    <span className="text-[#268bd2]">student_profile</span>
                  </div>
                  
                  <div>
                    <span className="text-[#586e75]"># Academic details & aspirations</span>
                    <br />
                    <span className="text-[#268bd2]">hithesh</span> = student_profile.Developer(
                    <div className="pl-4">
                      name=<span className="text-[#2aa198]">&quot;Hithesh Gaddam&quot;</span>,
                      <br />
                      semester=<span className="text-[#cb4b16]">1</span>,
                      <br />
                      degree=<span className="text-[#2aa198]">&quot;B.Tech&quot;</span>,
                      <br />
                      goal=<span className="text-[#2aa198]">&quot;AI Engineer&quot;</span>
                    </div>
                    )
                  </div>

                  <div>
                    <span className="text-[#268bd2]">hithesh</span>.current_focus()
                    <br />
                    <span className="text-[#859900]">&gt;&gt;&gt;</span>{" "}
                    <span className="text-[#b58900]">&quot;Learning Python, Web, and Generative AI foundations.&quot;</span>
                  </div>

                  <div>
                    <span className="text-[#268bd2]">hithesh</span>.build_projects()
                    <br />
                    <span className="text-[#859900]">&gt;&gt;&gt;</span>{" "}
                    <span className="text-[#2aa198]">
                      [&quot;Voter Eligibility&quot;, &quot;ATM Sim&quot;, &quot;Grade Calculator&quot;]
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#3e3e3e]/50 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Shell status: active</span>
                    <span>UTF-8</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ----------------- 2. ABOUT ME SECTION ----------------- */}
      <section id="about" className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl text-wrap-balance">
              About Me
            </h2>
            <div className="h-1 w-12 bg-blue-600 mx-auto mt-4 rounded-full" />
            <p className="mt-4 text-base text-slate-500">
              Confident but honest — an active learner documenting my developer evolution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Bio Details */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 text-left">
                Hi, I&apos;m Hithesh.
              </h3>
              
              <p className="text-slate-600 leading-relaxed text-justify">
                I am a first-semester B.Tech student with a growing interest in Artificial Intelligence and Generative AI. I am currently developing my foundation in Python, web development, and AI while building small practical projects.
              </p>

              <p className="text-slate-600 leading-relaxed text-justify">
                I enjoy participating in hackathons and ideathons because they give me opportunities to turn ideas into working solutions. My long-term goal is to grow into a skilled AI Engineer through continuous learning, experimentation, and real-world project development.
              </p>

              <div className="p-4 bg-[#FAF9F6] rounded-xl border border-slate-200 flex items-start gap-4 text-left">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Stage of Growth</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Authentically positive: Portraying my learning journey with absolute truth, emphasizing hands-on practice, curiosity, and rapid problem solving.
                  </p>
                </div>
              </div>
            </div>

            {/* Learning Roadmap Widget */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-6 text-left">
              <h3 className="text-sm font-bold tracking-wider text-slate-400 font-mono mb-6 uppercase">
                My Learning Roadmap
              </h3>
              
              <div className="space-y-6">
                
                {/* Phase 1 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                      01
                    </div>
                    <div className="w-0.5 h-12 bg-slate-200" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Foundation Setup (Current)</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Strengthening Python logic, basic mathematical structures, and clean standard conditional operations.
                    </p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 mt-1">
                      <Check className="h-3 w-3" /> Underway
                    </span>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
                      02
                    </div>
                    <div className="w-0.5 h-12 bg-slate-200" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Web & UI Prototyping</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Learning clean HTML, CSS layouts, Javascript actions, and building interactive, beautiful user-facing systems.
                    </p>
                    <span className="inline-block text-[10px] font-semibold text-slate-400 mt-1">
                      Next Milestone
                    </span>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
                      03
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Generative AI Exploration</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Learning prompt engineering principles, structured JSON-LD schemas, model calls, and small agent frameworks.
                    </p>
                    <span className="inline-block text-[10px] font-semibold text-slate-400 mt-1">
                      Aspirational Goal
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ----------------- 3. TECHNICAL SKILLS SECTION ----------------- */}
      <section id="skills" className="py-20 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl text-wrap-balance">
              Technical Skills
            </h2>
            <div className="h-1 w-12 bg-blue-600 mx-auto mt-4 rounded-full" />
            <p className="mt-4 text-base text-slate-500">
              Clear skill representation by actual capability levels, without inflated percentages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            {/* Category: Programming */}
            <div className="bg-[#FAF9F6] p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg w-fit mb-5">
                  <Code className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-4">Programming</h3>
                
                <ul className="space-y-4">
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">Python</span>
                    <span className="text-xs text-slate-500 mt-0.5">Key Focus · Synthesizing scripts & local terminal apps</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60">
                <span className="text-[10px] font-bold text-blue-600 tracking-wider font-mono">ACTIVE STUDY</span>
              </div>
            </div>

            {/* Category: Web Development */}
            <div className="bg-[#FAF9F6] p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg w-fit mb-5">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-4">Web Development</h3>
                
                <ul className="space-y-4">
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">HTML & CSS</span>
                    <span className="text-xs text-slate-500 mt-0.5">Semantic code structures & styling principles</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">JavaScript</span>
                    <span className="text-xs text-slate-500 mt-0.5">Dynamic interactions & core event logic</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">Basic Web Development</span>
                    <span className="text-xs text-slate-500 mt-0.5">Learning responsive UI & design flows</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60">
                <span className="text-[10px] font-bold text-blue-600 tracking-wider font-mono">PRACTICAL BASICS</span>
              </div>
            </div>

            {/* Category: AI */}
            <div className="bg-[#FAF9F6] p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg w-fit mb-5">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-4">Artificial Intelligence</h3>
                
                <ul className="space-y-4">
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">Generative AI</span>
                    <span className="text-xs text-slate-500 mt-0.5">Beginner · Testing basic APIs & models</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">Artificial Intelligence</span>
                    <span className="text-xs text-slate-500 mt-0.5">Learning · Theoretical foundations & trends</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">Prompt Engineering</span>
                    <span className="text-xs text-slate-500 mt-0.5">Beginner · Formulating structured prompts</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60">
                <span className="text-[10px] font-bold text-blue-600 tracking-wider font-mono">ASPIRATION PATH</span>
              </div>
            </div>

            {/* Category: Problem Solving & Other */}
            <div className="bg-[#FAF9F6] p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg w-fit mb-5">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-4">Methodologies</h3>
                
                <ul className="space-y-4">
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">Problem Solving & Logic</span>
                    <span className="text-xs text-slate-500 mt-0.5">Writing step-by-step algorithms</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">Ideathons & Hackathons</span>
                    <span className="text-xs text-slate-500 mt-0.5">Rapid idea brainstorming & prototyping</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">Continuous Learning</span>
                    <span className="text-xs text-slate-500 mt-0.5">Active daily practice and documentation</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60">
                <span className="text-[10px] font-bold text-blue-600 tracking-wider font-mono">WORKPLACE SKILLS</span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ----------------- 4. PROJECTS SECTION with SIMULATORS ----------------- */}
      <section id="projects" className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl text-wrap-balance">
              My Projects
            </h2>
            <div className="h-1 w-12 bg-blue-600 mx-auto mt-4 rounded-full" />
            <p className="mt-4 text-base text-slate-500">
              Practical beginner projects implementing clean logic. Use the interactive simulators below to run the live code!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Column: Project Cards */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-xs font-bold tracking-wider text-slate-400 font-mono uppercase mb-4 text-left">
                Selected Student Works
              </h3>

              {projectsList.map((proj) => {
                const isActive = activeSimulator === proj.id;
                return (
                  <div
                    key={proj.id}
                    onClick={() => setActiveSimulator(proj.id)}
                    className={`p-6 rounded-xl border transition-all duration-200 text-left cursor-pointer ${
                      isActive
                        ? "bg-slate-50 border-blue-500 shadow-sm"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="text-lg font-bold text-slate-900">{proj.name}</h4>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full font-sans ${
                        isActive ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"
                      }`}>
                        {isActive ? "Active Simulator" : "Click to Test"}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Unboxed Metadata list (as per frontend-design guidelines: NO PILLS FOR STATIC DATA) */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700">Technologies:</span>
                      {proj.technologies.map((t, idx) => (
                        <span key={t}>
                          {t}
                          {idx < proj.technologies.length - 1 && <span className="mx-1 text-slate-300">·</span>}
                        </span>
                      ))}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700">Learnt:</span>
                      {proj.keyConcepts.map((c, idx) => (
                        <span key={c}>
                          {c}
                          {idx < proj.keyConcepts.length - 1 && <span className="mx-1 text-slate-300">·</span>}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSimulator(proj.id);
                          const el = document.getElementById("terminal-view");
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors bg-transparent border-0 p-0 cursor-pointer font-sans"
                      >
                        Launch Interactive Shell
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>

                      {/* Explicitly no invented GitHub links for individuals - Pointing to main design hub */}
                      <a
                        href="https://github.com/gaddamhithesh1777-design"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-800 transition-colors font-sans"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-3 w-3" />
                        Main Repository
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Live Terminal Simulator Panel */}
            <div id="terminal-view" className="lg:col-span-6 flex flex-col">
              <div className="bg-[#1e1e1e] rounded-xl shadow-lg border border-slate-800 overflow-hidden flex flex-col h-full min-h-[460px]">
                
                {/* Terminal Header */}
                <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-[#3e3e3e]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="text-slate-400 font-mono text-[11px] ml-2">Python Interactive Terminal</span>
                  </div>
                  <span className="text-slate-500 font-mono text-[10px]">
                    {activeSimulator === "voter" && "voter_calculator.py"}
                    {activeSimulator === "atm" && "atm_system.py"}
                    {activeSimulator === "grade" && "grade_calculator.py"}
                  </span>
                </div>

                {/* Simulated Output / Controls Workspace */}
                <div className="p-6 flex-1 flex flex-col text-slate-300 font-mono text-xs overflow-y-auto">
                  
                  {/* VOTER CALCULATOR INTERACTIVE */}
                  {activeSimulator === "voter" && (
                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                      <div className="text-left">
                        <div className="text-slate-500 mb-2">// VOTER ELIGIBILITY SYSTEM //</div>
                        <div className="text-blue-400"># Source code simulates:</div>
                        <p className="text-slate-400 text-[11px] mt-1 italic leading-relaxed">
                          Determines voter status by evaluating Age {`>=`} 18, Citizenship Verification, and Active Electoral Roll Registration.
                        </p>
                      </div>

                      <form onSubmit={handleCalculateVoter} className="space-y-4 my-4 p-4 bg-[#2a2a2a] rounded-lg border border-slate-700/60 text-slate-200 text-left">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-400 text-[10px]">ENTER APPLICANT AGE:</label>
                          <input
                            type="number"
                            value={voterAge}
                            onChange={(e) => setVoterAge(e.target.value)}
                            min="1"
                            max="120"
                            className="bg-[#1a1a1a] border border-slate-700 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <span className="text-slate-400 text-[10px] uppercase">Eligibility Flags:</span>
                          
                          <label className="flex items-center gap-2 cursor-pointer text-xs">
                            <input
                              type="checkbox"
                              checked={voterIsCitizen}
                              onChange={(e) => setVoterIsCitizen(e.target.checked)}
                              className="accent-blue-500"
                            />
                            Is Verified Citizen?
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer text-xs">
                            <input
                              type="checkbox"
                              checked={voterIsRegistered}
                              onChange={(e) => setVoterIsRegistered(e.target.checked)}
                              className="accent-blue-500"
                            />
                            Registered in Electoral Roll?
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded transition-colors border-0 cursor-pointer font-mono"
                        >
                          RUN LOGIC (F5)
                        </button>
                      </form>

                      {/* Execution Terminal Feedback */}
                      <div className="bg-black/40 p-4 rounded border border-slate-800 text-left min-h-[100px] flex flex-col justify-between">
                        <div>
                          <span className="text-slate-500">Console execution output:</span>
                          {voterResult ? (
                            <div className="mt-2 space-y-1">
                              <div className={`text-sm font-bold ${voterResult.eligible ? "text-green-400" : "text-red-400"}`}>
                                {voterResult.eligible ? ">>> STATUS: ELIGIBLE" : ">>> STATUS: INELIGIBLE"}
                              </div>
                              <div className="text-slate-300 text-[11px] leading-relaxed">
                                {voterResult.reason}
                              </div>
                            </div>
                          ) : (
                            <div className="text-slate-500 text-[11px] italic mt-2">
                              No process run yet. Adjust inputs above and trigger Python run.
                            </div>
                          )}
                        </div>
                        <div className="text-right text-[9px] text-slate-600 mt-2 font-mono">
                          Exit Code: 0
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ATM SIMULATOR INTERACTIVE */}
                  {activeSimulator === "atm" && (
                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                      <div className="text-left">
                        <div className="text-slate-500 mb-2">// ATM TRANSACTION SIMULATOR //</div>
                        <div className="text-blue-400"># Available Account Actions:</div>
                        <p className="text-slate-400 text-[11px] mt-1 italic leading-relaxed">
                          Simulates safe deposit and withdrawal operations with robust balance bounds validation in Python logic.
                        </p>
                      </div>

                      {/* ATM UI Container */}
                      <div className="my-3 grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch text-left">
                        
                        {/* Transaction Inputs (Left 5 cols) */}
                        <div className="md:col-span-5 bg-[#2a2a2a] p-4 rounded-lg border border-slate-700/60 flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <span className="text-slate-400 text-[10px] block">CURRENT BALANCE:</span>
                            <div className="text-lg font-bold text-green-400 font-mono tracking-wider">
                              ₹{atmBalance}
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-slate-400 text-[10px]">ENTER AMOUNT (₹):</label>
                            <input
                              type="number"
                              value={atmAmount}
                              onChange={(e) => setAtmAmount(e.target.value)}
                              placeholder="e.g. 500"
                              className="w-full bg-[#1a1a1a] border border-slate-700 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <button
                              onClick={handleAtmDeposit}
                              className="py-1.5 bg-green-700 hover:bg-green-800 text-white font-bold text-[10px] rounded transition-colors uppercase border-0 cursor-pointer font-mono"
                            >
                              Deposit
                            </button>
                            <button
                              onClick={handleAtmWithdraw}
                              className="py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold text-[10px] rounded transition-colors uppercase border-0 cursor-pointer font-mono"
                            >
                              Withdraw
                            </button>
                          </div>
                        </div>

                        {/* Transaction Log Monitor (Right 7 cols) */}
                        <div className="md:col-span-7 bg-black/40 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
                          <div>
                            <span className="text-slate-500 block text-[10px] uppercase">LOG MONITOR:</span>
                            <div className="mt-2 space-y-1 text-[10px] max-h-[110px] overflow-y-auto font-mono text-slate-300">
                              {atmLogs.slice(-4).map((log, index) => (
                                <div key={index} className="truncate">
                                  {log.startsWith("System:") ? (
                                    <span className="text-blue-400">{log}</span>
                                  ) : log.includes("DECLINED") ? (
                                    <span className="text-red-400">{log}</span>
                                  ) : (
                                    <span className="text-slate-400">{log}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px]">
                            {atmError && <span className="text-red-400 font-medium truncate max-w-[120px]">{atmError}</span>}
                            {atmSuccess && <span className="text-green-400 font-medium truncate max-w-[120px]">{atmSuccess}</span>}
                            {!atmError && !atmSuccess && <span className="text-slate-600">IDLE</span>}
                            
                            <button
                              onClick={handleResetAtm}
                              className="text-[9px] text-slate-500 hover:text-slate-300 transition-colors underline font-mono bg-transparent border-0 p-0 cursor-pointer"
                            >
                              RESET CARD
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>
                  )}

                  {/* STUDENT GRADE CALCULATOR INTERACTIVE */}
                  {activeSimulator === "grade" && (
                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                      <div className="text-left">
                        <div className="text-slate-500 mb-2">// MARKS TO GRADE COMPILER //</div>
                        <div className="text-blue-400"># Grading Logic Scheme:</div>
                        <p className="text-slate-400 text-[11px] mt-1 italic leading-relaxed">
                          Averages student marks across core modules and dynamically outputs standard feedback reports.
                        </p>
                      </div>

                      <form onSubmit={handleCalculateGrades} className="grid grid-cols-3 gap-3 my-2 p-4 bg-[#2a2a2a] rounded-lg border border-slate-700/60 text-slate-200 text-left">
                        <div className="flex flex-col gap-1">
                          <label className="text-slate-400 text-[9px] uppercase tracking-wide font-sans">Python Programming</label>
                          <input
                            type="number"
                            value={marksPython}
                            onChange={(e) => setMarksPython(e.target.value)}
                            min="0"
                            max="100"
                            className="bg-[#1a1a1a] border border-slate-700 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-slate-400 text-[9px] uppercase tracking-wide font-sans">Mathematics I</label>
                          <input
                            type="number"
                            value={marksMath}
                            onChange={(e) => setMarksMath(e.target.value)}
                            min="0"
                            max="100"
                            className="bg-[#1a1a1a] border border-slate-700 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-slate-400 text-[9px] uppercase tracking-wide font-sans">Basic Web UI</label>
                          <input
                            type="number"
                            value={marksWeb}
                            onChange={(e) => setMarksWeb(e.target.value)}
                            min="0"
                            max="100"
                            className="bg-[#1a1a1a] border border-slate-700 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          className="col-span-3 py-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded transition-colors border-0 cursor-pointer font-mono"
                        >
                          CALCULATE GRADE (F5)
                        </button>
                      </form>

                      {/* Grade Results Terminal Screen */}
                      <div className="bg-black/40 p-4 rounded border border-slate-800 text-left min-h-[120px] flex flex-col justify-between">
                        <div>
                          <span className="text-slate-500">Grading System Report Output:</span>
                          {gradeResult ? (
                            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-left">
                              <div>Total Marks: <span className="text-white font-bold">{gradeResult.total} / 300</span></div>
                              <div>Percentage: <span className="text-blue-400 font-bold">{gradeResult.percentage}%</span></div>
                              
                              <div className="col-span-2 mt-2 pt-2 border-t border-slate-850 flex items-center justify-between">
                                <div>Assigned Grade: <span className="text-yellow-400 font-bold uppercase">{gradeResult.grade}</span></div>
                                <div className={`font-bold uppercase ${gradeResult.passed ? "text-green-400" : "text-red-400"}`}>
                                  {gradeResult.passed ? ">>> PASSED" : ">>> RE-APPEAR"}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-slate-500 text-[11px] italic mt-2">
                              System idle. Click &apos;Calculate Grade&apos; to compile scores.
                            </div>
                          )}
                        </div>
                        <div className="text-right text-[9px] text-slate-600 mt-2 font-mono">
                          Process compiled successfully.
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Simulated Console Footbar */}
                <div className="bg-[#1e1e1e] border-t border-slate-800 px-4 py-2.5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <div className="flex items-center gap-3">
                    <span className="flex h-1.5 w-1.5 bg-green-500 rounded-full" />
                    <span>Interpreter Ready (Python 3.10)</span>
                  </div>
                  <span>100% Client-Side Logic</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ----------------- 5. HACKATHONS & IDEATHONS SECTION ----------------- */}
      <section id="hackathons" className="py-20 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl text-wrap-balance">
              Hackathons & Ideathons
            </h2>
            <div className="h-1 w-12 bg-blue-600 mx-auto mt-4 rounded-full" />
            <p className="mt-4 text-base text-slate-500">
              Active community participation, testing concepts, and collaborating with peers on real problems.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            
            {/* Hackathon Left Philosophy Card */}
            <div className="lg:col-span-5 bg-[#FAF9F6] p-8 rounded-xl border border-slate-200 shadow-xs">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg w-fit mb-6">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Why I Participate
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                &ldquo;I actively participate in hackathons and ideathons to gain practical experience, explore new technologies, work on ideas, collaborate with others, and improve my problem-solving skills.&rdquo;
              </p>
              
              <div className="mt-6 pt-6 border-t border-slate-200/60 flex items-center gap-4">
                <div className="shrink-0 text-3xl font-extrabold text-blue-600 font-mono">1st</div>
                <div className="text-xs text-slate-500 leading-tight">
                  Semester college explorer actively seeking build teams and developer collaborations.
                </div>
              </div>
            </div>

            {/* Hackathon Right Core Values (3 columns / lists) */}
            <div className="lg:col-span-7 space-y-6">
              <h4 className="text-xs font-bold tracking-wider text-slate-400 font-mono uppercase">
                Collaboration & Practice Pillars
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Pillar 1 */}
                <div className="p-5 bg-white rounded-lg border border-slate-200/80">
                  <div className="text-sm font-bold text-slate-950 mb-2">Rapid Prototyping</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Developing small working scripts and interfaces within rigid 24-48 hour limits, forcing structural focus and code prioritization.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="p-5 bg-white rounded-lg border border-slate-200/80">
                  <div className="text-sm font-bold text-slate-950 mb-2">Collaborative Problem Solving</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pairing up with senior developers and designers to learn workflow architecture, task segregation, and collective debugging processes.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="p-5 bg-white rounded-lg border border-slate-200/80">
                  <div className="text-sm font-bold text-slate-950 mb-2">Ideation & User Context</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Analyzing pain-points to devise actionable software solutions that solve real community, industry, or consumer needs.
                  </p>
                </div>

                {/* Pillar 4 */}
                <div className="p-5 bg-white rounded-lg border border-slate-200/80">
                  <div className="text-sm font-bold text-slate-950 mb-2">Experiential Tech Trials</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Implementing models and framework features that are not yet taught in regular classroom courses, driving active personal education.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ----------------- 6. CONTACT SECTION ----------------- */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl text-wrap-balance">
              Let&apos;s Connect
            </h2>
            <div className="h-1 w-12 bg-blue-600 mx-auto mt-4 rounded-full" />
            <p className="mt-4 text-base text-slate-500">
              Have an idea, opportunity, or project to discuss? Feel free to connect with me.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-4xl mx-auto text-left">
            
            {/* Contact Channel Info */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Hithesh Gaddam</h3>
                <p className="text-xs text-slate-500 mt-1">B.Tech Student & Learner</p>
                
                <p className="text-xs text-slate-600 mt-6 leading-relaxed">
                  I enjoy meeting new peers, exploring study groups, and discussing AI or Python engineering methodologies. Feel free to reach out via my verified social channels.
                </p>
              </div>

              {/* Verified Links (as requested) */}
              <div className="space-y-4 mt-8">
                <a
                  href="https://www.linkedin.com/in/hithesh-gaddam-b13261411?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-slate-700 hover:text-blue-700 transition-all font-medium text-xs cursor-pointer font-sans"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-blue-600" />
                    Connect on LinkedIn
                  </span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <a
                  href="https://github.com/gaddamhithesh1777-design"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-800 rounded-lg text-slate-700 hover:text-slate-900 transition-all font-medium text-xs cursor-pointer font-sans"
                >
                  <span className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    Explore my GitHub
                  </span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="text-[10px] text-slate-400 font-mono mt-6 text-center">
                STUDENT PROFILE · SECURE CHANNEL
              </div>
            </div>

            {/* Interactive Contact Form Mock */}
            <div className="lg:col-span-7 bg-white p-6 border border-slate-200 rounded-xl flex flex-col justify-between">
              {formSubmitted ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded-full">
                    <CheckCircle className="h-10 w-10 animate-bounce" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Message Simulated Successfully!</h4>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    Thank you for connecting with Hithesh Gaddam! Since this is a static showcase portfolio, the message is logged successfully. You can also connect directly via LinkedIn.
                  </p>
                  <button
                    onClick={handleResetForm}
                    className="px-4 py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors mt-2 bg-transparent border-0 cursor-pointer font-sans"
                  >
                    Submit another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-500 text-[10px] uppercase font-semibold">Your Name</label>
                        <input
                          type="text"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. Aditi Sharma"
                          className="bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none transition-colors font-sans"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-500 text-[10px] uppercase font-semibold">Email Address</label>
                        <input
                          type="email"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="e.g. aditi@example.com"
                          className="bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none transition-colors font-sans"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-500 text-[10px] uppercase font-semibold">Your Message</label>
                      <textarea
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder="What would you like to build or discuss together?"
                        rows={5}
                        className="bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none transition-colors resize-none font-sans"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer border-0 font-sans"
                  >
                    {isSubmitting ? (
                      "Sending simulation..."
                    ) : (
                      <>
                        Send Message
                        <MessageSquare className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      
      {/* ----------------- FOOTER ----------------- */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto border-t border-slate-800 text-left">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-800">
            
            <div className="text-center md:text-left space-y-1.5">
              <span className="text-base font-extrabold text-white tracking-tight">Hithesh Gaddam</span>
              <p className="text-xs text-slate-400">
                B.Tech Student | Aspiring AI Engineer
              </p>
            </div>

            {/* Quick social channels */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/hithesh-gaddam-b13261411?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/gaddamhithesh1777-design"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>

          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-[11px] text-slate-500">
            <span>© 2026 Hithesh Gaddam. Built with curiosity and code.</span>
            <span>Focus: Learn · Build · Experiment · Grow</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
