import React from 'react';
import NeumorphicCard from './ui/NeumorphicCard';
import { COMPANY_INFO } from '../constants';
import { useI18n } from '../i18n';

const ValueCard: React.FC<{ title: string, description: string, icon: React.ReactNode }> = ({ title, description, icon }) => (
    <NeumorphicCard className="p-6 text-center h-full">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-[#e0e0e0] shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]">
            {icon}
        </div>
        <h4 className="text-lg font-bold text-[#153B67]">{title}</h4>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
    </NeumorphicCard>
);

const AboutSection: React.FC = () => {
  const { t } = useI18n();

  const icons: { [key: string]: React.ReactNode } = {
    'values.commitment.name': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>,
    'values.transparency.name': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
    'values.professionalism.name': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13.5V6.5a2 2 0 0 0-2-2h-12a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2Z"/><path d="M12 16.5v-1.5"/><path d="m10 12-2-1.5 2-1.5"/><path d="m14 12 2-1.5-2-1.5"/></svg>,
    'values.collaboration.name': <svg xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    'values.innovation.name': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.48A10 10 0 0 1 12 21a10 10 0 0 1-10-10 10 10 0 0 1 10-10c.83 0 1.64.12 2.4.35M9 10h.01M15 10h.01M12 10h.01M12 16h.01M10 13h.01M14 13h.01"/></svg>,
  };

  return (
    <section id="nosotros" className="py-20 bg-[#e0e0e0]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#153B67] mb-4">{t('about.title')}</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">{t('about.subtitle')}</p>
        </div>

        <NeumorphicCard className="p-8 md:p-12 mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('about.missionTitle')}</h3>
                    <p className="text-gray-600 mb-6">{t(COMPANY_INFO.missionKey)}</p>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('about.visionTitle')}</h3>
                    <p className="text-gray-600">{t(COMPANY_INFO.visionKey)}</p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]">
                    <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg" alt={t('about.imageAlt')} className="w-full h-full object-cover" />
                </div>
            </div>
        </NeumorphicCard>

        <div>
            <h3 className="text-3xl font-bold text-center text-[#153B67] mb-10">{t('about.valuesTitle')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {COMPANY_INFO.values.map(value => (
                    <ValueCard key={value.nameKey} title={t(value.nameKey)} description={t(value.descriptionKey)} icon={icons[value.nameKey]}/>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;