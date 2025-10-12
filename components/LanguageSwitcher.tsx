import React from 'react';
import { useI18n, LANGUAGES, Language } from '../i18n';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useI18n();

  return (
    <div className="relative">
      <div className="bg-white/10 rounded-lg border border-white/30 flex items-center p-0.5">
        {(Object.keys(LANGUAGES) as Language[]).map(lang => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            aria-pressed={language === lang}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200 ${
              language === lang 
                ? 'bg-white/25 text-white' 
                : 'text-white/70 hover:text-white'
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