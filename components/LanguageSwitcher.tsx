import React from 'react';
import { useI18n, LANGUAGES, Language } from '../i18n';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useI18n();

  return (
    <div className="relative">
      <div className="bg-[#e0e0e0] rounded-lg shadow-[inset_2px_2px_5px_#bebebe,inset_-2px_-2px_5px_#ffffff] flex items-center p-0.5">
        {(Object.keys(LANGUAGES) as Language[]).map(lang => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            aria-pressed={language === lang}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200 ${
              language === lang 
                ? 'bg-[#e0e0e0] text-[#153B67] shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff]' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;