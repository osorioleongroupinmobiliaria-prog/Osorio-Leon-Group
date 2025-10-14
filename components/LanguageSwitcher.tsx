import React from 'react';
import { useI18n, LANGUAGES, Language } from '../i18n';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useI18n();

  return (
    <div className="relative">
      <div className="bg-black/5 rounded-lg border border-black/10 flex items-center p-0.5">
        {(Object.keys(LANGUAGES) as Language[]).map(lang => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            aria-pressed={language === lang}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors duration-200 ${
              language === lang 
                ? 'bg-black/10 text-gray-900' 
                : 'text-gray-600 hover:text-black'
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