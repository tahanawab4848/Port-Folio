import { useEffect, useState } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const ScrambleText = ({ text, className = '', delay = 0 }: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let frame = 0;
    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;

    const scramble = () => {
      intervalId = setInterval(() => {
        let newText = '';
        const progress = frame / 30; // 30 frames total for animation

        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            newText += ' ';
            continue;
          }
          if (progress >= i / text.length) {
            newText += text[i];
          } else {
            newText += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setDisplayText(newText);
        frame++;

        if (frame > 30) {
          clearInterval(intervalId);
          setDisplayText(text); // Ensure perfect final text
        }
      }, 40); // update every 40ms
    };

    timeoutId = setTimeout(() => {
      scramble();
    }, delay * 1000); // Convert seconds to ms

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay]);

  return <span className={className}>{displayText}</span>;
};

export default ScrambleText;

