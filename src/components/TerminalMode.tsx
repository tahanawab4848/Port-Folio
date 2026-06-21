import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import FadeIn from './FadeIn';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

const TerminalMode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Focus input when opened or clicked
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Scroll to bottom when history changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

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
          output = `cat: ${cmd.slice(4)}: No such file or directory`;
        } else if (cmd === 'sudo') {
           output = 'taha is not in the sudoers file. This incident will be reported.';
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
        <div className="fixed inset-0 z-[100] bg-[#050505] font-mono text-sm sm:text-base text-green-500 overflow-y-auto p-4 sm:p-8 cursor-text" onClick={() => inputRef.current?.focus()}>
          <div className="max-w-4xl mx-auto w-full min-h-full flex flex-col relative z-10">
            <div className="flex justify-between items-center mb-8 border-b border-green-500/30 pb-4">
              <div className="text-green-400 opacity-80 select-none">
                guest@tahanawab.portfolio: ~
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="text-green-500 hover:text-white transition-colors"
                title="Close Terminal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <FadeIn delay={0.1} y={10}>
              <div className="mb-6 whitespace-pre-wrap select-none text-green-400">
                Welcome to TahaOS v1.0.0<br/>
                Type 'help' to see available commands.<br/>
                <br/>
              </div>
            </FadeIn>

            <div className="flex-1">
              {history.map((entry, i) => (
                <div key={i} className="mb-4">
                  <div className="flex items-center gap-2 select-none">
                    <span className="text-blue-400 font-bold">guest@portfolio</span>
                    <span className="text-white">:</span>
                    <span className="text-green-400 font-bold">~</span>
                    <span className="text-white">$</span>
                    <span className="text-white">{entry.command}</span>
                  </div>
                  <div className="mt-1 whitespace-pre-wrap text-gray-300">
                    {entry.output}
                  </div>
                </div>
              ))}

              <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
                <span className="text-blue-400 font-bold select-none">guest@portfolio</span>
                <span className="text-white select-none">:</span>
                <span className="text-green-400 font-bold select-none">~</span>
                <span className="text-white select-none">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono shadow-none focus:ring-0"
                  autoComplete="off"
                  spellCheck="false"
                  autoFocus
                />
              </form>
              <div ref={bottomRef} className="h-8" />
            </div>
            
            {/* Ambient scanline effect */}
            <div className="fixed inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-0 mix-blend-overlay"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default TerminalMode;
