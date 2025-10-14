import React, { useState } from 'react';
import NeumorphicCard from './ui/NeumorphicCard';
import { PARTNER_LOGOS } from '../constants';

const PartnersCarousel: React.FC = () => {
    // Duplicate the logos for a seamless loop
    const extendedLogos = [...PARTNER_LOGOS, ...PARTNER_LOGOS];
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <>
            <section className="py-8">
                <div className="container mx-auto px-2 sm:px-6 lg:px-8">
                    <NeumorphicCard className="p-6">
                        <div className="relative w-full overflow-hidden group h-24 flex items-center">
                            {/* The wrapper div gets the animation class. Pauses on hover. */}
                            <div className="flex animate-[scroll_25s_linear_infinite] group-hover:[animation-play-state:paused]">
                                {extendedLogos.map((logo, index) => (
                                    <div 
                                        key={index} 
                                        className="flex-shrink-0 mx-10 flex items-center justify-center cursor-pointer"
                                        onClick={() => setSelectedImage(logo.src)}
                                    >
                                        <img 
                                            src={logo.src} 
                                            alt={logo.alt} 
                                            className="h-24 w-auto object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                                        />
                                    </div>
                                ))}
                            </div>
                             {/* Fades for a seamless entry/exit */}
                             <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#e0e0e0] to-transparent pointer-events-none z-10"></div>
                             <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#e0e0e0] to-transparent pointer-events-none z-10"></div>
                        </div>
                    </NeumorphicCard>
                </div>
            </section>
            
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer animate-fade-in-scale"
                    onClick={() => setSelectedImage(null)}
                >
                    <div 
                        className="relative"
                        onClick={e => e.stopPropagation()} // Prevent closing when clicking on the image container
                    >
                        <img 
                            src={selectedImage} 
                            alt="Logo Ampliado" 
                            className="max-h-[80vh] max-w-[80vw] w-auto h-auto rounded-lg shadow-2xl cursor-default"
                        />
                        <button 
                            onClick={() => setSelectedImage(null)} 
                            className="absolute -top-4 -right-4 bg-white rounded-full p-1 text-black shadow-lg"
                            aria-label="Cerrar imagen"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default PartnersCarousel;