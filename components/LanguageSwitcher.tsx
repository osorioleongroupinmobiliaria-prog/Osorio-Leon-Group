import React from 'react';
import { useI18n, LANGUAGES, Language } from '../i18n';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useI18n();

  return (
    <div className="relative">
      <div className="bg-[#e0e0e0] rounded-xl shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] p-1 flex items-center">
        {(Object.keys(LANGUAGES) as Language[]).map(lang => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            aria-pressed={language === lang}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all duration-200 ${
              language === lang 
                ? 'bg-[#e0e0e0] text-[#153B67] shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff]' 
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
