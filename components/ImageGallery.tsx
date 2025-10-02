import React, { useState, useEffect, useCallback } from 'react';
import { COMPANY_INFO } from '../constants';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface ImageGalleryProps {
  images: Array<{ url: string; alt: string }>;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  if (!images || images.length === 0) return null;

  const mainImage = images[currentIndex];

  const goToNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      else if (e.key === 'ArrowLeft') goToPrevious();
      else if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, goToNext, goToPrevious]);


  return (
    <div>
      <div className="relative group rounded-2xl overflow-hidden cursor-pointer shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]" onClick={openLightbox}>
        <img src={mainImage.url} alt={mainImage.alt} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-center justify-center">
            <img src={COMPANY_INFO.logoUrl} alt="Watermark" className="w-40 h-auto opacity-20 pointer-events-none" />
        </div>
        {images.length > 1 && (
            <>
                <button onClick={goToPrevious} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10" aria-label="Previous image">
                    <ChevronLeftIcon />
                </button>
                <button onClick={goToNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10" aria-label="Next image">
                    <ChevronRightIcon />
                </button>
            </>
        )}
      </div>
      <div className="grid grid-cols-4 gap-2 mt-2">
        {images.slice(0, 4).map((image, index) => (
          <div key={index} className={`rounded-lg overflow-hidden cursor-pointer shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff] transition-all duration-200 ${currentIndex === index ? 'ring-2 ring-[#153B67] ring-inset' : ''}`} onClick={() => setCurrentIndex(index)}>
            <img src={image.url} alt={image.alt} className={`w-full h-16 object-cover transition-opacity duration-300 ${currentIndex === index ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`} />
          </div>
        ))}
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
            <button onClick={closeLightbox} className="absolute top-5 right-5 text-white text-4xl z-[60]">&times;</button>
            <div className="relative w-full max-w-4xl flex items-center justify-center" onClick={e => e.stopPropagation()}>
                {images.length > 1 && (
                    <>
                        <button onClick={goToPrevious} className="absolute left-0 sm:-left-12 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 z-[60]" aria-label="Previous image">
                            <ChevronLeftIcon />
                        </button>
                        <button onClick={goToNext} className="absolute right-0 sm:-right-12 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 z-[60]" aria-label="Next image">
                            <ChevronRightIcon />
                        </button>
                    </>
                )}
                <div className="relative">
                    <img src={mainImage.url} alt={mainImage.alt} className="max-h-[90vh] w-auto mx-auto rounded-lg"/>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <img src={COMPANY_INFO.logoUrl} alt="Watermark" className="w-56 h-auto opacity-25 pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;