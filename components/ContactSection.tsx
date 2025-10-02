import React from 'react';
import NeumorphicCard from './ui/NeumorphicCard';
import NeumorphicInput from './ui/NeumorphicInput';
import NeumorphicButton from './ui/NeumorphicButton';
import { COMPANY_INFO } from '../constants';
import { useI18n } from '../i18n';

const ContactInfoItem: React.FC<{icon: React.ReactNode; title: string; children: React.ReactNode}> = ({icon, title, children}) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-[#e0e0e0] shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-gray-800">{title}</h4>
            <div className="text-sm text-gray-600">{children}</div>
        </div>
    </div>
);

const ContactSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <section id="contacto" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#153B67] mb-12">{t('contact.title')}</h2>
        <div className="grid lg:grid-cols-5 gap-12">
          
          <div className="lg:col-span-2">
              <NeumorphicCard className="p-8 h-full">
                  <div className="space-y-6">
                      <ContactInfoItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>} title={t('contact.phones')}>
                          <a href={`tel:${COMPANY_INFO.phones[0].replace(/\s/g, '')}`} className="hover:text-[#153B67]">{COMPANY_INFO.phones[0]}</a><br/>
                          <a href={`tel:${COMPANY_INFO.phones[1].replace(/\s/g, '')}`} className="hover:text-[#153B67]">{COMPANY_INFO.phones[1]}</a>
                      </ContactInfoItem>
                       <ContactInfoItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>} title="Email">
                          <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#153B67]">{COMPANY_INFO.email}</a>
                      </ContactInfoItem>
                       <ContactInfoItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>} title={t('contact.address')}>
                          {COMPANY_INFO.address}
                      </ContactInfoItem>
                      <ContactInfoItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>} title={t('contact.hours')}>
                          {t(COMPANY_INFO.hoursKey)}
                      </ContactInfoItem>
                  </div>
              </NeumorphicCard>
          </div>

          <div className="lg:col-span-3">
              <NeumorphicCard className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.form.title')}</h3>
                <form className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <NeumorphicInput name="name" placeholder={t('contact.form.namePlaceholder')} required />
                        <NeumorphicInput type="tel" name="phone" placeholder={t('contact.form.phonePlaceholder')} />
                    </div>
                    <NeumorphicInput type="email" name="email" placeholder={t('contact.form.emailPlaceholder')} required />
                    <NeumorphicInput as="select" name="subject">
                        <option>{t('contact.form.subject.general')}</option>
                        <option>{t('contact.form.subject.sale')}</option>
                        <option>{t('contact.form.subject.rent')}</option>
                        <option>{t('contact.form.subject.management')}</option>
                    </NeumorphicInput>
                    <NeumorphicInput as="textarea" name="message" placeholder={t('contact.form.messagePlaceholder')} rows={4} required/>
                    <NeumorphicButton type="submit" className="w-full !bg-[#153B67] !text-white">{t('contact.form.submitButton')}</NeumorphicButton>
                </form>
              </NeumorphicCard>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;