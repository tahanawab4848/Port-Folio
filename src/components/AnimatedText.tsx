import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

interface CharProps {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const Char = ({ char, index, total, progress }: CharProps) => {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ opacity: 0.2 }}>{char}</span>
      <motion.span
        style={{
          opacity,
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
        }}
        aria-hidden="true"
      >
        {char}
      </motion.span>
    </span>
  );
};

const AnimatedText = ({ text, className, style }: AnimatedTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Split into words to preserve natural line-wrapping at word boundaries.
  const words = text.split(' ');
  const totalChars = text.length;
  let runningIndex = 0;

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wi) => {
        const wordChars = Array.from(word);
        const wordStart = runningIndex;
        runningIndex += wordChars.length + 1; // +1 accounts for the space after

        return (
          <span
            key={wi}
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            {wordChars.map((ch, ci) => (
              <Char
                key={ci}
                char={ch}
                index={wordStart + ci}
                total={totalChars}
                progress={scrollYProgress}
              />
            ))}
            {wi < words.length - 1 && '\u00A0'}
          </span>
        );
      })}
    </p>
  );
};

export default AnimatedText;
