import React, { useState, useEffect } from "react";

const TypewriterText = ({ 
  text, 
  speed = 100, 
  delay = 0, 
  className = "",
  showCursor = true,
  cursorBlink = true,
  onComplete = null 
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Initial delay before starting the animation
    const initialDelay = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(initialDelay);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, text, speed, isTyping, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className={`cursor ${isTyping && cursorBlink ? 'cursor-blink' : ''}`}></span>}
      <style>{`
        .cursor {
          display: inline-block;
          width: 2px;
          background-color: currentColor;
          margin-left: 4px;
          height: 1em;
          vertical-align: text-bottom;
        }
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
};

export default TypewriterText; 