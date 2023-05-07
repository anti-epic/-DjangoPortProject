import React, { useState, useEffect } from 'react';
import './Typewriter.css';

const Typewriter = ({ sentences }) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentSentence, setCurrentSentence] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(50);

  useEffect(() => {
    const sentence = sentences[currentSentenceIndex];
    const sentenceLength = sentence.length;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentSentence(sentence.substr(0, currentSentence.length + 1));
        if (currentSentence.length + 1 === sentenceLength) {
          setIsDeleting(true);
          setTypingSpeed(100);
        }
      } else {
        setCurrentSentence(sentence.substr(0, currentSentence.length - 1));
        if (currentSentence.length === 0) {
          setIsDeleting(false);
          setTypingSpeed(100);
          setCurrentSentenceIndex(
            (currentSentenceIndex + 1) % sentences.length
          );
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentSentence, currentSentenceIndex, isDeleting, sentences, typingSpeed]);

  return <div className="typewriter">{currentSentence}      <span className="blink">:</span></div>;
};

export default Typewriter;
