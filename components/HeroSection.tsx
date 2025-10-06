import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../constants';
import { useI18n } from '../i18n';

const heroImages = [
  'https://lh3.googleusercontent.com/pw/AP1GczOciAsUqsmP8205J6ZgBcUw2i1JMbKLwK4koEoFgyHfYVQDqZgUirkem15ByBK36F6GeKb9v0bOIXqlls7nU0W4PxpsCVGzNDBn3olijWkuo1PExcMOfxkU5amEMwm7ZZTWpjencctjMhb0h9He9vF0=w1680-h945-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczMotujUhOG9Dd5AAGr7HFoFrAOB3ZENnsPZU1nSmFzPwUcXJDe72adh0byLefoabmEHSv-UcM0BtgtiTEGygbP6bKhalKFiGuo6rhz2aECqG3G8mlDMVnOR-l6Wo2kpaRFlVUsz3g6bQR0dCcHeDise=w1418-h945-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczORE_mAdEqt2j8Z9cUuZ0rwBn7e2gg2mRYNcPx8r5cnDbPrL4wURlUyzq55lRNFI6mZb_uY6k00TV1lxa_X0FPud0f1t0kNvHPTxOsn5hXwuGJj1RxqqXt4YFFPb1y3UP6u0atLtb_lpRlJ36gefphy=w1680-h945-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczMV8TVKJgYyWhHZeSduO_OFJv2mVC_YWUKGFu34qwQScpVArr4hof03sBpkQJgjjFcznrlwrY1kKb326htuywx55RosUwSfCm3to9BN2YXeFG_Xd7AgYp8OWZk_eBhfm6OElr1xZFEaHPPCVarEW-4u=w1417-h945-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczMAzDpE4kAxiVw_qkP2F3Z9Zq74jGCfPaNcieCBbATa7E2jORp8RqMNzof4w0HmZNHyWwETElXt4MqSg2D6eMWD5ZRTL6mlyV4J0DfoWYV0sv3bdZ8dxS5sVYtrJXOPgZ3njxdOgQIksU969lOxZVdW=w1680-h945-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczPJCsYnMHb7RzIFQKkHlVV96cwYCE6aKeO9vnBNL1OLkkBhVGt536YImxFdtZyriIruiWyEKUtMdVkvVOSV7-Ii6cyl4AX2ap3avQ5Axr1aC9yB9nT1FY8Vp8np_WnPLNW6NBLNbk-bu21Bqbivs1IY=w1680-h945-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczMoom0Ce5RAG0bQEFsf08cgCLjCNdfqbZymAz7qhPJ5ean2R93IjXjTONeUuxkQVt37fsK9kW7y9YSmkwUN5VaAsV7VgHO-oMySDaBtn6Dyom4c7_RvjG56FNEGdHhp3OsQpl0wEImTybVpjKFJeMAs=w1344-h768-s-no-gm?authuser=0'
];

const HeroSection: React.FC = () => {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <section id="inicio" className="relative h-[70vh] md:h-[80vh] overflow-hidden flex items-center justify-center text-center">
      {heroImages.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: index === currentIndex ? 1 : 0,
            zIndex: 1,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-[2]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-[3]">
        <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-2xl bg-black/20 backdrop-blur-md border border-white/20 shadow-xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            {t('hero.title.line1')}
            <br />
            <span className="font-extrabold">{t('hero.title.line2')}</span>
          </h1>
          <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-base sm:text-lg text-gray-200 uppercase tracking-wider font-medium">
            {t(COMPANY_INFO.sloganKey)}
          </p>
          <div className="mt-8 sm:mt-10">
            <a
              href="#propiedades"
              className="inline-block bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg text-white font-bold tracking-wide transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/50 px-8 py-3 text-base sm:text-lg"
            >
              {t('hero.button')}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-[3]">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;