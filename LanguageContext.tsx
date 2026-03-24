import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'en' | 'te' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    te: string;
    hi: string;
  };
}

const translations: Translations = {
  buyLand: { en: 'Buy Land', te: 'భూమి కొనండి', hi: 'जमीन खरीदें' },
  sellLand: { en: 'Sell Land', te: 'భూమి అమ్మండి', hi: 'जमीन बेचें' },
  howItWorks: { en: 'How it Works', te: 'ఇది ఎలా పనిచేస్తుంది', hi: 'यह कैसे काम करता है' },
  login: { en: 'Login', te: 'లాగిన్', hi: 'लॉग इन करें' },
  aiAssistant: { en: 'AI Assistant', te: 'AI సహాయకుడు', hi: 'AI सहायक' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: keyof typeof translations): string => {
    return translations[key] ? translations[key][language] : String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
