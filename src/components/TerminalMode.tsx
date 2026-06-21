import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import FadeIn from './FadeIn';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

const FakeInstaller = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    const installSequence = [
      '> Resolving dependencies...',
      '> Fetching packages from tahai-registry...',
      '> Downloading tahai-core-v2.0.0 [====================] 100%',
      '> Extracting neural models...',
      '> Compiling quantum pathways...',
      '> TahAI successfully installed!',
      'Type "tahai" to initialize the AI assistant.'
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < installSequence.length) {
        setLines(prev => [...prev, installSequence[i]]);
        i++;
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 400);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col gap-1 mt-1">
      {lines.map((line, idx) => (
        <span key={idx} className={line.includes('successfully') ? 'text-green-400 font-bold' : 'text-gray-300'}>
          {line}
        </span>
      ))}
      {lines.length < 7 && <span className="animate-pulse text-green-400">_</span>}
    </div>
  );
};

const TerminalMode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [bootText, setBootText] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Boot sequence logic
  useEffect(() => {
    if (isOpen) {
      setIsBooting(true);
      setHistory([]);
      let step = 0;
      const bootLines = [
        'Booting TahaOS v2.0.4 (x86_64)...',
        'Loading kernel modules... OK',
        'Mounting virtual filesystems... OK',
        'Starting neural network interface... OK',
        'Establishing secure connection... OK',
        'Access granted.'
      ];
      
      const interval = setInterval(() => {
        if (step < bootLines.length) {
          setBootText((prev) => prev + (prev ? '\n' : '') + bootLines[step]);
          step++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsBooting(false);
            setBootText('');
            inputRef.current?.focus();
          }, 100);
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Focus input
  useEffect(() => {
    if (isOpen && !isBooting) {
      inputRef.current?.focus();
    }
  }, [isOpen, isBooting]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, bootText]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    setInput('');

    if (!cmd) return;

    let output: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = (
          <div className="text-gray-300">
            Available commands:<br />
            <span className="text-green-400">whoami</span> - Display biography<br />
            <span className="text-green-400">ls</span> - List directory contents<br />
            <span className="text-green-400">cat &lt;file&gt;</span> - View file contents<br />
            <span className="text-green-400">clear</span> - Clear terminal<br />
            <span className="text-green-400">exit</span> - Close terminal mode
          </div>
        );
        break;
      case 'whoami':
        output = 'Muhammad Taha Nawab. CS Student @ COMSATS. Full-Stack Developer & ML Engineer.';
        break;
      case 'ls':
        output = (
          <div className="flex gap-4">
            <span className="text-blue-400 font-bold">projects/</span>
            <span className="text-blue-400 font-bold">skills/</span>
            <span className="text-white">resume.pdf</span>
            <span className="text-white">contact.txt</span>
          </div>
        );
        break;
      case 'cat resume.pdf':
        output = 'Error: Cannot print binary file to terminal. Please use the GUI to download.';
        break;
      case 'cat contact.txt':
        output = 'Email: tahanawab4848@gmail.com\nLinkedIn: /in/tahanawab';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        setIsOpen(false);
        return;
      default:
        if (cmd.startsWith('cat ')) {
          output = `cat: ${cmd.slice(4)}: Permission denied`;
        } else if (cmd === 'sudo' || cmd.startsWith('sudo ')) {
           output = 'taha is not in the sudoers file. This incident will be reported to the cyber police.';
        } else if (cmd === 'date') {
           output = new Date().toString();
        } else if (cmd === 'matrix') {
           output = 'Wake up, Neo... The Matrix has you...';
        } else if (cmd === 'install tahai' || cmd === 'npm install tahai' || cmd === 'apt install tahai') {
           setIsBusy(true);
           output = <FakeInstaller onComplete={() => setIsBusy(false)} />;
        } else if (cmd === 'tahai' || cmd.startsWith('tahai ')) {
           output = 'TahAI Neural Link active. Please close the terminal and use the main GUI widget to interact with the AI.';
        } else {
          output = `Command not found: ${cmd}. Type 'help' for available commands.`;
        }
    }

    setHistory((prev) => [...prev, { command: input, output }]);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-110 hover:border-green-500/50 hover:bg-black/80 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] group"
        title="Open Terminal"
      >
        <TerminalIcon className="h-5 w-5 text-white/50 transition-colors group-hover:text-green-400" />
      </button>

      {/* Terminal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6 cursor-default">
          {/* MacOS style window */}
          <div className="w-full max-w-5xl h-[85vh] bg-[#0A0A0A] rounded-xl border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(34,197,94,0.05)] flex flex-col overflow-hidden relative">
            
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#111] select-none">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer transition-colors" onClick={() => setIsOpen(false)} title="Close" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="text-gray-400 text-xs font-mono">guest@tahanawab.portfolio: ~ (bash)</div>
              <div className="w-16"></div> {/* Spacer for centering */}
            </div>

            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 font-mono text-sm sm:text-base text-green-500 [text-shadow:0_0_5px_rgba(34,197,94,0.4)] cursor-text" onClick={() => !isBooting && inputRef.current?.focus()}>
              
              {isBooting ? (
                <div className="whitespace-pre-wrap">{bootText}<span className="animate-pulse">_</span></div>
              ) : (
                <>
                  <FadeIn delay={0.1} y={10}>
                    <div className="mb-6 whitespace-pre-wrap select-none text-green-400 font-bold">
{`
  _____     _           ___  ____  
 |_   _|   | |         / _ \\/ ___| 
   | | __ _| |__   __ | | | \\___ \\ 
   | |/ _\` | '_ \\ / _\`| | | |___) |
   |_| (_| | | | | (_| | |_| |____/ 
                                   
`}
                      Welcome to TahaOS v2.0.4<br/>
                      Type 'help' to see available commands.<br/>
                      <br/>
                    </div>
                  </FadeIn>

                  <div className="flex-1">
                    {history.map((entry, i) => (
                      <div key={i} className="mb-4">
                        <div className="flex items-center gap-2 select-none flex-wrap">
                          <span className="text-blue-400 font-bold">guest@portfolio</span>
                          <span className="text-white">:</span>
                          <span className="text-green-400 font-bold">~</span>
                          <span className="text-white">$</span>
                          <span className="text-white">{entry.command}</span>
                        </div>
                        <div className="mt-1 whitespace-pre-wrap text-green-300 opacity-90 leading-relaxed">
                          {entry.output}
                        </div>
                      </div>
                    ))}

                    <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4 flex-wrap">
                      <span className="text-blue-400 font-bold select-none">guest@portfolio</span>
                      <span className="text-white select-none">:</span>
                      <span className="text-green-400 font-bold select-none">~</span>
                      <span className="text-white select-none">$</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isBusy}
                        className={`flex-1 min-w-[200px] bg-transparent border-none outline-none font-mono shadow-none focus:ring-0 p-0 ${isBusy ? 'text-gray-500' : 'text-white'}`}
                        autoComplete="off"
                        spellCheck="false"
                        autoFocus
                      />
                    </form>
                    <div ref={bottomRef} className="h-8" />
                  </div>
                </>
              )}
            </div>
            
            {/* CRT Scanline effect overlaid on terminal window */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-0 mix-blend-overlay"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default TerminalMode;
