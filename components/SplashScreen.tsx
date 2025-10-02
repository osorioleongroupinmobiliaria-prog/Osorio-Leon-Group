
import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../constants';

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinished }) => {
  const [stage, setStage] = useState<'start' | 'animate' | 'end'>('start');

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('animate'), 100); // Start animation
    const timer2 = setTimeout(() => setStage('end'), 2000);     // Start fade out
    const timer3 = setTimeout(onFinished, 2500);              // Finish and unmount

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 bg-[#e0e0e0] z-[100] flex items-center justify-center transition-opacity duration-500 ease-in-out
        ${stage === 'end' ? 'opacity-0' : 'opacity-100'}`
      }
    >
      <img
        src={COMPANY_INFO.logoUrl}
        alt={`${COMPANY_INFO.name} Logo`}
        className={`w-auto h-32 md:h-48 transition-all duration-1000 ease-out
          ${stage === 'animate' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`
        }
      />
    </div>
  );
};

export default SplashScreen;
