import React from 'react';
import NeumorphicCard from './ui/NeumorphicCard';
import { useI18n } from '../i18n';

const services = [
  { nameKey: 'services.commercialization', image: 'https://lh3.googleusercontent.com/pw/AP1GczN7AdeOlOpd3xIV_hJ0zNxvgg5k_1ODmLgDQM3F_A5a8R54r3jwIMgwxfEjRWtCoslC0kYBwzmxLpYVHB7AigZA7qKKNHvxcemGIUoaJV6dvndPHYSLyVUpbxxhsZUbt_wmrR8IiwqxfcuhHF8KCSUb=w1418-h945-s-no-gm?authuser=0' },
  { nameKey: 'services.propertyManagement', image: 'https://lh3.googleusercontent.com/pw/AP1GczNXolii7uc7wQi9aVfH4thz0N3g0jj1U7uqFDBE4DpN5a_sj3c3ARDcjkDiyINmGJEs7H_xMjHM-nRQHNYz4nkV_XVDmCN_2IwGhDNrKLg7ED83P-ElraTtCNUn0nDS_eYnqeyqX2MUoMgXi1ijsQlT=w1417-h945-s-no-gm?authuser=0' },
  { nameKey: 'services.brokerageLeasing', image: 'https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg' },
  { nameKey: 'services.propertySales', image: 'https://lh3.googleusercontent.com/pw/AP1GczMFBX80nkygaQZZ5pwUEQI_x1x72tNVSb_wjf9fJhjWz_K8_x_ChZYKdI4eaA3tETFRTzf4-4TQoeJlP-bqL0Gx7Xe9avpC6uhdzEl3qtAX5NzGRPbLcwzaovOHWwxganOH4TT-UpdKUnxsmykdEPQh=w1417-h945-s-no-gm?authuser=0' },
  { nameKey: 'services.appraisals', image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg' },
  { nameKey: 'services.consulting', image: 'https://lh3.googleusercontent.com/pw/AP1GczNUhA9aB1NQLYjS9BKCxlHqpvx44j48SgytUsG0vTPjoNX3swmDAgj3InXQSLvYPc-2RdZDJnIDZHWuuR3tiCrlWsv1_1cs5mpzP_MItJ01xjy79llDbN5Pj4OoquGiCvrXG8wT5yUEaLeca9HE2TrU=w1418-h945-s-no-gm?authuser=0' },
];

const ServiceCard: React.FC<{ name: string; image: string; }> = ({ name, image }) => (
  <NeumorphicCard className="overflow-hidden group">
    <div className="relative">
      <img src={image} alt={name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <h3 className="absolute bottom-4 left-4 text-white text-lg font-bold">{name}</h3>
    </div>
  </NeumorphicCard>
);

const ServicesSection: React.FC = () => {
  const { t } = useI18n();
  return (
    <section id="servicios" className="py-12 sm:py-20 bg-gray-200 shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#153B67] mb-4">{t('services.title')}</h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600">{t('services.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map(service => (
            <ServiceCard key={service.nameKey} name={t(service.nameKey)} image={service.image} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;