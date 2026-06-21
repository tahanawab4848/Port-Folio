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
    keywords: ['other contacts', 'more contacts', 'alternate', 'whatsapp', 'emails'],
    response: "> QUERY MATCH: 'SECONDARY_CONTACTS'\n> ALTERNATE EMAILS:\n  - official.taha.nawab@gmail.com\n  - tahanawab.official@gmail.com\n  - laurel4848@gmail.com\n  - nawabtaha61@gmail.com\n  - tisart4848@gmail.com\n> WHATSAPP (Direct Link): https://wa.me/923054776655\n> PHONE: +92 305-4776655"
  },
  {
    keywords: ['age', 'dob', 'date of birth', 'born', 'birthday', 'old', 'birth'],
    response: "> QUERY MATCH: 'PERSONAL_INFO'\n> DATE OF BIRTH: 3rd Oct, 2005\n> AGE: 20 years old"
  },
  {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'who', 'system'],
    response: "> GREETING PROTOCOL: ENGAGED\n> Hello. I am an AI architected by Taha. Query me regarding his [PROJECTS], [SKILLS], or [CONTACT] info."
  }
];

const DEFAULT_RESPONSE = "> ERROR: QUERY NOT RECOGNIZED.\n> Please restrict queries to parameters: ['projects', 'skills', 'education', 'contact', 'age'].";

export default function NeuralInterfaceSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: "> SYSTEM LINK: ESTABLISHED\n> TahAI Engine v2.0 Online.\n> Welcome. I am a custom AI engineered by Taha Nawab. Ask me about his projects, skills, or experience.", isTyping: true }
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
    const fetchGroqResponse = async () => {
      // Load API key from environment variable to prevent GitHub auto-revocation
      const apiKey = (import.meta as any).env.VITE_GROQ_API_KEY;
      
      // If no API key, fallback to local knowledge base
      if (!apiKey) {
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
          }, responseText.length * 20 + 1000);
        }, 800);
        return;
      }

      // Live Groq AI Integration
      try {
        const systemPrompt = `You are TahAI, a high-tech AI portfolio assistant for Muhammad Taha Nawab.
Your job is to answer questions about Taha's experience, skills, and projects in a professional, slightly cyberpunk tone. 
Start every response with "> " to match the terminal aesthetic. Keep answers concise, highly accurate, and directly address the user's question. Do not hallucinate. If you don't know, say "> ERROR: DATA NOT FOUND IN DATABANKS."

Here is Taha's exact, up-to-date CV data:

MUHAMMAD TAHA NAWAB
Full-Stack Developer | AI/ML Engineer
Islamabad, Pakistan • +92 305-4776655 (0306-2540001) • official.taha.nawab@gmail.com • linkedin.com/in/tahanawab4848 • github.com/tahanawab4848
DOB: 3rd Oct, 2005 (Age: 20)

PROFESSIONAL SUMMARY
Computer Science student at COMSATS University Islamabad with hands-on experience architecting and shipping full-stack web applications using the MERN stack and production-grade AI/ML systems. Proficient in building scalable REST APIs, React SPAs, and machine learning pipelines. Seeking an internship or junior role.

TECHNICAL SKILLS
- Frontend: React.js, Vite, HTML5/CSS3, Bootstrap, JavaScript (ES6+), Responsive Design, Component Architecture
- Backend: Node.js, Express.js, FastAPI, Flask, REST APIs, JWT Authentication, WebSockets, BullMQ
- Databases: MongoDB, PostgreSQL, MySQL, Firebase/Cloud Firestore, TimescaleDB, pgvector, SQL Window Functions & Triggers
- AI/ML: scikit-learn, HuggingFace Transformers, OpenCV, MediaPipe, Tesseract OCR, Generative AI APIs (Gemini, OpenAI, Groq), Active Learning, NumPy, Pandas
- DevOps & Tools: Git, GitHub, Docker (basics), Linux/Bash, Postman, VS Code, npm/pip
- Languages: JavaScript, Python, SQL, Java, C++, Dart, Mojo

PROJECTS
1. MediPredict — AI Medical Diagnosis System (Jan 2025 – Present)
   - FastAPI, React, PostgreSQL, scikit-learn, JWT
   - Architected a full-stack disease-prediction platform processing 100+ symptom combinations using RandomForestClassifier (90% accuracy).
   - Engineered an end-to-end ML pipeline reducing prediction latency to <200ms.

2. Customer Support Ticket System with SLA Monitoring (Jan 2026 – Present)
   - Node.js, Express.js, React, PostgreSQL, SQL Triggers, RBAC
   - Delivered enterprise ticketing platform for 10,000+ concurrent tickets with automated SLA escalation via PostgreSQL triggers.

3. LearnWave — E-Learning Platform (Jun 2025 – Dec 2025)
   - React, Vite, FastAPI, PostgreSQL, JavaScript
   - Full-stack instructor platform for course creation and enrollment.

4. ToxiGlow — AI-Powered Wound Analysis Platform (Apr 2026 – Jun 2026)
   - React 19, Vite, FastAPI, OpenCV, OpenAI GPT, SQLAlchemy, Python
   - Clinical-grade tissue segmentation and infection risk detection in <5 seconds per image. Built for BioNova Innovathon 2026.

5. VisionAI Utility Application (Jan 2026)
   - Python, Tesseract OCR, TTS
   - Engineered Python AI toolkit with OCR and TTS processing documents 3x faster.

6. Intelligent Warehouse Robot Simulation (Jun 2024 – Dec 2024)
   - Python, Tkinter, A*, BFS, Genetic Algorithm

EDUCATION
- BS Computer Science — COMSATS University Islamabad (Sep 2023 – Present)
- Intermediate (FSC/ICS) — Punjab Group of Colleges (Sep 2021 – Jul 2023)

CERTIFICATIONS
- AI Hero: 12-Month Journey from Zero to Expert — School of AI (Feb 2026)
- AI Fluency for Students — Anthropic (Oct 2025)
- Implementing MVC ToDo App with Flask — CodeSignal (Aug 2025)
- Git Version Control for Beginners — CodeSignal (Aug 2025)
- Computer Science Introduction — Udemy (Nov 2025)

LANGUAGES
English (Professional), Urdu (Native), Punjabi (Native)
`;

        const groqMessages = [
          { role: 'system', content: systemPrompt },
          ...messages.filter(m => !m.isTyping).map(m => ({ role: m.sender === 'ai' ? 'assistant' : 'user', content: m.text })),
          { role: 'user', content: userMsg.text }
        ];

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: groqMessages,
            temperature: 0.7,
            max_tokens: 300,
          })
        });

        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        let aiText = data.choices[0]?.message?.content || "> ERROR: NEURAL LINK FAILED.";
        
        // Ensure it starts with terminal prefix
        if (!aiText.startsWith('>')) aiText = "> " + aiText.replace(/\n/g, '\n> ');

        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: aiText,
          isTyping: true
        };

        setMessages(prev => [...prev, aiMsg]);
        
        setTimeout(() => {
          setMessages(prev => prev.map(m => m.id === aiMsg.id ? { ...m, isTyping: false } : m));
          setIsAiTyping(false);
        }, 1500);

      } catch (error) {
        console.error("Groq API Error:", error);
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "> ERROR: AI NEURAL LINK DISCONNECTED. REVERTING TO LOCAL DATABANKS.",
          isTyping: true
        };
        setMessages(prev => [...prev, errorMsg]);
        
        setTimeout(() => {
          setMessages(prev => prev.map(m => m.id === errorMsg.id ? { ...m, isTyping: false } : m));
          setIsAiTyping(false);
        }, 1500);
      }
    };

    fetchGroqResponse();
  };

  return (
    <>
      {/* Floating Action Button - Highly Animated AI Core */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-black tracking-widest text-white transition-all duration-300 hover:scale-110 cursor-pointer overflow-hidden isolate"
      >
        {/* Dark Base */}
        <div className="absolute inset-0 -z-30 bg-black" />
        
        {/* Spinning Gradient Border (Glitter/Powered Effect) */}
        <div className="absolute inset-[-150%] -z-20 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(0,0,0,0)_0%,rgba(255,255,255,0.9)_50%,rgba(0,0,0,0)_100%)]" />
        
        {/* Inner Glass Pill */}
        <div className="absolute inset-[2px] -z-10 rounded-full bg-black/90 backdrop-blur-xl transition-colors group-hover:bg-black/70" />

        {/* Outer Glow */}
        <div className="absolute inset-0 -z-40 rounded-full opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-500 group-hover:opacity-100 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]" />

        <Cpu className="w-4 h-4 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] transition-transform group-hover:rotate-180 duration-700" />
        <span className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] group-hover:text-white transition-colors">TahAI</span>
        <Zap className="w-3.5 h-3.5 text-white animate-pulse drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </button>

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
              className="fixed inset-0 z-50 bg-black/60"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 pointer-events-none" />
            </motion.div>

            {/* Chat Widget Panel */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-24 right-6 z-50 h-[420px] max-h-[70dvh] w-[320px] max-w-[calc(100vw-3rem)] bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.15)] flex flex-col overflow-hidden origin-bottom-right"
            >
              {/* Animated HUD Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20" />
              
              {/* Laser Scanline */}
              <div className="absolute inset-0 h-full w-full pointer-events-none overflow-hidden z-20">
                <div className="w-full h-[2px] bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-scanline" />
              </div>

              {/* Header */}
              <div className="relative z-30 flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-sm bg-white/5 border border-white/10 overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 animate-pulse" />
                    <Terminal className="w-5 h-5 text-white relative z-10" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black tracking-[0.3em] text-[white] flex items-center gap-2">
                      TahAI <Activity className="w-3 h-3 text-white/70" />
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping opacity-75 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                      <p className="text-[9px] font-mono text-white/80 tracking-widest">
                        TahAI Core Online
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-sm bg-white/5 border border-white/10 text-[white] hover:bg-white/10 hover:text-white transition-all hover:scale-110"
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
                      <div className={`flex items-center gap-2 text-[9px] font-mono tracking-widest ${msg.sender === 'user' ? 'justify-end text-white/60' : 'text-[white]'}`}>
                        {msg.sender === 'user' ? (
                          <>GUEST_USER <User className="w-3 h-3" /></>
                        ) : (
                          <><Cpu className="w-3 h-3" /> TahAI</>
                        )}
                      </div>

                      {/* Message Body */}
                      <div className={`relative px-4 py-3 text-sm font-mono leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-white/5 backdrop-blur-sm border-r-2 border-white/30 text-white' 
                          : 'bg-white/10 backdrop-blur-sm border-l-2 border-white/50 text-[white]'
                      }`}>
                        {/* High-tech corner accents */}
                        <div className={`absolute top-0 w-2 h-px ${msg.sender === 'user' ? 'right-0 bg-white/50' : 'left-0 bg-white/80'}`} />
                        <div className={`absolute bottom-0 w-2 h-px ${msg.sender === 'user' ? 'right-0 bg-white/50' : 'left-0 bg-white/80'}`} />

                        {msg.isTyping ? (
                          <div className="flex items-center gap-2">
                            <span className="animate-pulse text-[white]">DECRYPTING_DATA</span>
                            <div className="flex gap-1">
                              <span className="w-1 h-3 bg-white/50 animate-[pulse_1s_infinite_0ms]" />
                              <span className="w-1 h-3 bg-white/50 animate-[pulse_1s_infinite_150ms]" />
                              <span className="w-1 h-3 bg-white/50 animate-[pulse_1s_infinite_300ms]" />
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
              <div className="relative z-20 p-4 border-t border-white/10 bg-white/5 backdrop-blur-md">
                <form onSubmit={handleSend} className="relative flex items-center group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/50 font-mono">
                    {'>'}
                  </div>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter command..."
                    disabled={isAiTyping}
                    className="w-full bg-black/40 backdrop-blur-md border border-white/10 py-3 pl-8 pr-14 text-sm font-mono text-[white] placeholder-white/30 focus:outline-none focus:border-white/50 focus:bg-white/5 transition-all disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isAiTyping}
                    className="absolute right-2 p-2 bg-white/5 text-white/80 border border-transparent hover:border-white/40 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:hover:border-transparent disabled:hover:bg-white/5 font-mono text-[10px] uppercase tracking-widest flex items-center gap-1"
                  >
                    EXEC
                  </button>
                  {/* Blinking cursor effect on focus */}
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
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
          background: rgba(255, 255, 255, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
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
