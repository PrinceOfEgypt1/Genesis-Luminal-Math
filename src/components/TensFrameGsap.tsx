import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TensFrameGsapProps {
  value: number;
  operation?: 'addition' | 'subtraction';
  num1?: number;
  num2?: number;
  onAnimationComplete?: () => void;
}

export const TensFrameGsap: React.FC<TensFrameGsapProps> = ({ value, operation, num1, num2, onAnimationComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fullFrames = Math.floor(value / 10);
  const remainder = value % 10;

  useEffect(() => {
    if (operation && num1 !== undefined && num2 !== undefined && containerRef.current) {
      if (operation === 'addition') {
        const initialFrames = containerRef.current.querySelectorAll('.tens-frame-initial');
        gsap.fromTo(initialFrames, { opacity: 0, y: -20 }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          onComplete: () => {
            const additionalFrames = containerRef.current?.querySelectorAll('.tens-frame-additional');
            if (additionalFrames && additionalFrames.length > 0) {
              gsap.fromTo(additionalFrames, { opacity: 0, x: 50 }, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                stagger: 0.1,
                onComplete: () => onAnimationComplete?.()
              });
            } else {
              onAnimationComplete?.();
            }
          }
        });
      }
    }
  }, [operation, num1, num2, onAnimationComplete]);

  const renderFrames = () => {
    const frames = [];

    if (operation && num1 !== undefined) {
      const initialValue = num1;
      const initialFullFrames = Math.floor(initialValue / 10);
      const initialRemainder = initialValue % 10;

      for (let i = 0; i < initialFullFrames; i++) {
        frames.push(
          <div key={`initial-full-${i}`} className="tens-frame-initial" style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '120px',
            height: '60px',
            border: '2px solid #673AB7',
            borderRadius: '8px',
            margin: '5px',
            background: '#E8EAF6'
          }}>
            {Array(10).fill(0).map((_, j) => (
              <div key={j} style={{ width: '20px', height: '20px', margin: '2px', borderRadius: '50%', background: '#673AB7' }} />
            ))}
          </div>
        );
      }

      if (initialRemainder > 0) {
        frames.push(
          <div key="initial-partial" className="tens-frame-initial" style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '120px',
            height: '60px',
            border: '2px solid #673AB7',
            borderRadius: '8px',
            margin: '5px',
            background: '#E8EAF6'
          }}>
            {Array(initialRemainder).fill(0).map((_, j) => (
              <div key={j} style={{ width: '20px', height: '20px', margin: '2px', borderRadius: '50%', background: '#673AB7' }} />
            ))}
            {Array(10 - initialRemainder).fill(0).map((_, j) => (
              <div key={`empty-${j}`} style={{ width: '20px', height: '20px', margin: '2px', borderRadius: '50%', background: 'transparent' }} />
            ))}
          </div>
        );
      }

      if (operation === 'addition' && num2 !== undefined) {
        const num2FullFrames = Math.floor(num2 / 10);
        const num2Remainder = num2 % 10;

        for (let i = 0; i < num2FullFrames; i++) {
          frames.push(
            <div key={`num2-full-${i}`} className="tens-frame-additional" style={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '120px',
              height: '60px',
              border: '2px solid #4CAF50',
              borderRadius: '8px',
              margin: '5px',
              background: '#E8F5E9'
            }}>
              {Array(10).fill(0).map((_, j) => (
                <div key={j} style={{ width: '20px', height: '20px', margin: '2px', borderRadius: '50%', background: '#4CAF50' }} />
              ))}
            </div>
          );
        }

        if (num2Remainder > 0) {
          frames.push(
            <div key="num2-partial" className="tens-frame-additional" style={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '120px',
              height: '60px',
              border: '2px solid #4CAF50',
              borderRadius: '8px',
              margin: '5px',
              background: '#E8F5E9'
            }}>
              {Array(num2Remainder).fill(0).map((_, j) => (
                <div key={j} style={{ width: '20px', height: '20px', margin: '2px', borderRadius: '50%', background: '#4CAF50' }} />
              ))}
            </div>
          );
        }
      }
    } else {
      for (let i = 0; i < fullFrames; i++) {
        frames.push(
          <div key={`full-${i}`} style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '120px',
            height: '60px',
            border: '2px solid #673AB7',
            borderRadius: '8px',
            margin: '5px',
            background: '#E8EAF6'
          }}>
            {Array(10).fill(0).map((_, j) => (
              <div key={j} style={{ width: '20px', height: '20px', margin: '2px', borderRadius: '50%', background: '#673AB7' }} />
            ))}
