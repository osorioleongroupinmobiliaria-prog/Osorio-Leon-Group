import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n';

interface VisitorNotificationProps {
    isChatbotOpen: boolean;
}

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const VisitorNotification: React.FC<VisitorNotificationProps> = ({ isChatbotOpen }) => {
    const { t } = useI18n();
    const [isVisible, setIsVisible] = useState(false);
    const [visitorCount, setVisitorCount] = useState(0);

    useEffect(() => {
        // Set initial random count
        setVisitorCount(Math.floor(Math.random() * 20) + 5);

        // Show after a delay
        const showTimer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        // Optional: change count periodically
        const interval = setInterval(() => {
            setVisitorCount(prev => {
                const change = Math.random() > 0.5 ? 1 : -1;
                const newCount = prev + change;
                return newCount > 3 ? newCount : 4; // Keep it above a minimum
            });
        }, 8000);

        return () => {
            clearTimeout(showTimer);
            clearInterval(interval);
        };
    }, []);

    if (!isVisible || isChatbotOpen) {
        return null;
    }

    return (
        <div 
            className="fixed bottom-5 left-5 z-50 flex items-center space-x-2 p-2 rounded-xl transition-all duration-500 transform animate-slide-in"
            style={{
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/50 flex items-center justify-center text-[#153B67]">
                <EyeIcon />
            </div>
            <p className="text-xs font-medium text-gray-800">
                <span className="font-bold">{visitorCount}</span> {t('visitorNotification.message')}
            </p>
            <button 
                onClick={() => setIsVisible(false)} 
                className="text-gray-600 hover:text-gray-900"
                aria-label={t('visitorNotification.closeAria')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default VisitorNotification;