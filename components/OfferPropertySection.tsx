import React from 'react';
import NeumorphicCard from './ui/NeumorphicCard';
import NeumorphicInput from './ui/NeumorphicInput';
import NeumorphicButton from './ui/NeumorphicButton';
import { useI18n } from '../i18n';

const OfferPropertySection: React.FC = () => {
    const { t } = useI18n();

    return (
        <section className="py-20 bg-[#e0e0e0]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <NeumorphicCard className="p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="md:order-2">
                            <h2 className="text-3xl font-bold text-[#153B67] mb-4">{t('offerProperty.title')}</h2>
                            <p className="text-gray-600 mb-6">{t('offerProperty.subtitle')}</p>
                            <form className="space-y-4">
                                <NeumorphicInput name="name" placeholder={t('offerProperty.namePlaceholder')} required />
                                <NeumorphicInput type="email" name="email" placeholder={t('offerProperty.emailPlaceholder')} required />
                                <NeumorphicInput type="tel" name="phone" placeholder={t('offerProperty.phonePlaceholder')} required />
                                <NeumorphicInput as="textarea" name="details" placeholder={t('offerProperty.detailsPlaceholder')} rows={3} />
                                <NeumorphicButton type="submit" className="w-full !bg-[#153B67] !text-white">
                                    {t('offerProperty.submitButton')}
                                </NeumorphicButton>
                            </form>
                        </div>
                        <div className="md:order-1">
                             <div className="rounded-2xl overflow-hidden shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]">
                                <img 
                                    src="https://images.pexels.com/photos/7578839/pexels-photo-7578839.jpeg" 
                                    alt={t('offerProperty.imageAlt')}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </NeumorphicCard>
            </div>
        </section>
    );
};

export default OfferPropertySection;