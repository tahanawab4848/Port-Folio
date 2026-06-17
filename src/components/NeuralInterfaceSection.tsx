import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, Cpu, User, X, Activity, Zap } from 'lucide-react';

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isTyping?: boolean;
};

const KNOWLEDGE_BASE = [
  {
    keywords: ['project', 'work', 'build', 'toxiglow', 'medipredict', 'learnwave'],
    response: "> QUERY MATCH: 'PROJECTS'\n> Taha has architected several high-performance platforms:\n> 1. [ToxiGlow]: AI wound analysis built for BioNova Innovathon 2026 (React 19, FastAPI, OpenCV, OpenAI GPT).\n> 2. [MediPredict]: Disease prediction engine (FastAPI, React, PostgreSQL, scikit-learn) with <200ms latency.\n> 3. [Support Ticket System]: Enterprise SLA monitor (Node.js, Express, PostgreSQL) handling 10k+ concurrent tickets.\n> 4. [LearnWave]: Full-stack E-Learning platform.\n> 5. [Warehouse Robot Sim]: A*, BFS, and Genetic Algorithms in Python."
  },
  {
    keywords: ['skill', 'tech', 'stack', 'language', 'framework', 'react', 'python', 'fastapi', 'database'],
    response: "> QUERY MATCH: 'SKILLS'\n> FRONTEND: React.js, Vite, HTML5/CSS3, Bootstrap, Tailwind, ES6+\n> BACKEND: Node.js, Express.js, FastAPI, Flask, WebSockets\n> DATABASES: PostgreSQL, MongoDB, MySQL, Firebase, TimescaleDB, pgvector\n> AI/ML: scikit-learn, HuggingFace, OpenCV, MediaPipe, Tesseract OCR, Generative AI APIs\n> LANGUAGES: JavaScript, TypeScript, Python, SQL, Java, C++, Dart."
  },
  {
    keywords: ['experience', 'education', 'background', 'university', 'comsats', 'internship'],
    response: "> QUERY MATCH: 'EXPERIENCE & EDUCATION'\n> EDUCATION: BS Computer Science at COMSATS University Islamabad (Sep 2023 - Present).\n> OBJECTIVE: Seeking an internship or junior role to architect cloud-native MERN apps and applied ML systems.\n> CERTIFICATIONS: AI Hero (School of AI), AI Fluency (Anthropic), Flask MVC (CodeSignal)."
  },
  {
    keywords: ['contact', 'email', 'phone', 'hire', 'reach', 'github', 'linkedin'],
    response: "> QUERY MATCH: 'CONTACT_INFO'\n> EMAIL: official.taha.nawab@gmail.com\n> PHONE: 0306-2540001\n> LINKEDIN: linkedin.com/in/tahanawab4848\n> GITHUB: github.com/tahanawab4848\n> LOCATION: Islamabad, Pakistan."
  },
  {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'who', 'system'],
    response: "> INITIALIZING GREETING PROTOCOL...\n> Welcome, User. I am TahAI. You may query my databases regarding Taha's [PROJECTS], [SKILLS], [EDUCATION], or [CONTACT] information."
  }
];

const DEFAULT_RESPONSE = "> ERROR: QUERY NOT RECOGNIZED.\n> Please restrict queries to parameters: ['projects', 'skills', 'education', 'contact'].";

export default function NeuralInterfaceSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: "> SYSTEM BOOT_SEQ: OK\n> TahAI: ACTIVE\n> I am TahAI, the portfolio construct. Query me regarding Taha's experience, skills, projects, or contact info.", isTyping: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isAiTyping, isOpen]);

  // Handle typing effect for the first message
  useEffect(() => {
    if (messages[0].isTyping) {
      const timer = setTimeout(() => {
        setMessages(prev => prev.map(m => m.id === '1' ? { ...m, isTyping: false } : m));
        setIsAiTyping(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isAiTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsAiTyping(true);

    // AI Response logic
    setTimeout(() => {
      const inputLower = userMsg.text.toLowerCase();
      let match = KNOWLEDGE_BASE.find(kb => kb.keywords.some(kw => inputLower.includes(kw)));
      
      const responseText = match ? match.response : DEFAULT_RESPONSE;

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        isTyping: true
      };

      setMessages(prev => [...prev, aiMsg]);

      setTimeout(() => {
        setMessages(prev => prev.map(m => m.id === aiMsg.id ? { ...m, isTyping: false } : m));
        setIsAiTyping(false);
      }, responseText.length * 20 + 1000); // Dynamic duration

    }, 800); // Network latency simulation
  };

  return (
    <>
      {/* Floating Action Button - Enhanced Cyberpunk Aesthetic */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-16 h-16 rounded-full bg-black/50 border border-blue-500/50 shadow-[0_0_30px_rgba(37,99,235,0.4)] backdrop-blur-xl group cursor-pointer"
      >
        {/* Orbital Rings */}
        <div className="absolute inset-0 rounded-full border-t-2 border-blue-400 animate-[spin_4s_linear_infinite] opacity-50" />
        <div className="absolute inset-2 rounded-full border-b-2 border-purple-500 animate-[spin_3s_linear_infinite_reverse] opacity-50" />
        <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse group-hover:bg-blue-500/40 transition-colors" />
        
        {/* Core Icon */}
        <div className="relative flex items-center justify-center w-full h-full">
          <Cpu className="w-7 h-7 text-blue-300 drop-shadow-[0_0_8px_rgba(147,197,253,0.8)] transition-transform duration-500 group-hover:scale-110" />
          <Zap className="absolute top-4 right-4 w-3 h-3 text-white animate-bounce" />
        </div>
      </motion.button>

      {/* Sidebar Interface */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with CRT scanline effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 pointer-events-none" />
            </motion.div>

            {/* Sidebar Panel - The "Digital Wonder" */}
            <motion.div
              initial={{ x: '100%', opacity: 0, skewX: -5 }}
              animate={{ x: 0, opacity: 1, skewX: 0 }}
              exit={{ x: '100%', opacity: 0, skewX: 5 }}
              transition={{ type: 'spring', damping: 20, stiffness: 150 }}
              className="fixed top-0 right-0 z-50 h-[100dvh] w-full max-w-sm sm:max-w-md bg-[#050505]/95 border-l border-blue-500/30 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
            >
              {/* Animated HUD Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20" />
              
              {/* Laser Scanline */}
              <div className="absolute inset-0 h-full w-full pointer-events-none overflow-hidden z-20">
                <div className="w-full h-[2px] bg-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-scanline" />
              </div>

              {/* Header */}
              <div className="relative z-30 flex items-center justify-between px-6 py-5 border-b border-blue-500/20 bg-black/40 backdrop-blur-lg">
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-sm bg-blue-900/30 border border-blue-500/50 overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/20 animate-pulse" />
                    <Terminal className="w-5 h-5 text-blue-400 relative z-10" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-100 flex items-center gap-2">
                      TahAI <Activity className="w-3 h-3 text-blue-400" />
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-ping opacity-75 shadow-[0_0_10px_rgba(34,197,94,1)]" />
                      <p className="text-[9px] font-mono text-green-400 uppercase tracking-widest">
                        TahAI Core Online
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-sm bg-blue-900/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/40 hover:text-white transition-all hover:scale-110"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="relative z-10 flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar scroll-smooth">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, type: "spring" }}
                      className={`flex flex-col gap-2 max-w-[90%] ${msg.sender === 'user' ? 'self-end' : 'self-start'}`}
                    >
                      {/* Sender Label */}
                      <div className={`flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest ${msg.sender === 'user' ? 'justify-end text-purple-400' : 'text-blue-400'}`}>
                        {msg.sender === 'user' ? (
                          <>GUEST_USER <User className="w-3 h-3" /></>
                        ) : (
                          <><Cpu className="w-3 h-3" /> TahAI</>
                        )}
                      </div>

                      {/* Message Body */}
                      <div className={`relative px-4 py-3 text-sm font-mono leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-purple-900/10 border-r-2 border-purple-500 text-purple-100' 
                          : 'bg-blue-900/10 border-l-2 border-blue-500 text-blue-100'
                      }`}>
                        {/* High-tech corner accents */}
                        <div className={`absolute top-0 w-2 h-px ${msg.sender === 'user' ? 'right-0 bg-purple-500' : 'left-0 bg-blue-500'}`} />
                        <div className={`absolute bottom-0 w-2 h-px ${msg.sender === 'user' ? 'right-0 bg-purple-500' : 'left-0 bg-blue-500'}`} />

                        {msg.isTyping ? (
                          <div className="flex items-center gap-2">
                            <span className="animate-pulse text-blue-400">DECRYPTING_DATA</span>
                            <div className="flex gap-1">
                              <span className="w-1 h-3 bg-blue-500 animate-[pulse_1s_infinite_0ms]" />
                              <span className="w-1 h-3 bg-blue-500 animate-[pulse_1s_infinite_150ms]" />
                              <span className="w-1 h-3 bg-blue-500 animate-[pulse_1s_infinite_300ms]" />
                            </div>
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap">
                            {msg.sender === 'ai' ? <ScrambledTypewriter text={msg.text} /> : msg.text}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} className="h-4" />
              </div>

              {/* Input Area */}
              <div className="relative z-20 p-5 border-t border-blue-500/20 bg-black/60 backdrop-blur-md">
                <form onSubmit={handleSend} className="relative flex items-center group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-blue-500 font-mono">
                    {'>'}
                  </div>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter command..."
                    disabled={isAiTyping}
                    className="w-full bg-blue-950/20 border border-blue-500/30 py-3.5 pl-8 pr-14 text-sm font-mono text-blue-100 placeholder-blue-500/40 focus:outline-none focus:border-blue-400 focus:bg-blue-900/30 transition-all disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isAiTyping}
                    className="absolute right-2 p-2 bg-blue-600/20 text-blue-400 border border-blue-500/0 hover:border-blue-500/50 hover:bg-blue-500/30 hover:text-white transition-all disabled:opacity-30 disabled:hover:border-transparent disabled:hover:bg-blue-600/20 font-mono text-[10px] uppercase tracking-widest flex items-center gap-1"
                  >
                    EXEC
                  </button>
                  {/* Blinking cursor effect on focus */}
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.6);
        }
      `}</style>
    </>
  );
}

// Scrambled Typewriter Effect for Cyberpunk vibe
function ScrambledTypewriter({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const chars = '!<>-_\\\\/[]{}—=+*^?#________';
  
  useEffect(() => {
    let iteration = 0;
    const maxIterations = text.length;
    
    const interval = setInterval(() => {
      setDisplayedText(prev => {
        return text
          .split('')
          .map((letter, index) => {
            if(index < iteration) {
              return text[index];
            }
            if (letter === ' ' || letter === '\n') return letter;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
      });
      
      iteration += 1/2; // Adjust speed here
      
      if(iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayedText(text);
      }
    }, 15);
    
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
}
