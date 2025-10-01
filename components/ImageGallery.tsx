import React, { useState } from 'react';
import { COMPANY_INFO } from '../constants';

interface ImageGalleryProps {
  images: Array<{ url: string; alt: string }>;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]?.url || 'https://picsum.photos/800/600');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  if (!images || images.length === 0) return null;

  return (
    <div>
      <div className="relative group rounded-2xl overflow-hidden cursor-pointer shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]" onClick={() => setIsLightboxOpen(true)}>
        <img src={mainImage} alt={images[0]?.alt} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-center justify-center">
            <img src={COMPANY_INFO.logoUrl} alt="Watermark" className="w-24 h-24 opacity-20 pointer-events-none" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 mt-2">
        {images.slice(0, 4).map((image, index) => (
          <div key={index} className="rounded-lg overflow-hidden cursor-pointer shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff]" onClick={() => setMainImage(image.url)}>
            <img src={image.url} alt={image.alt} className={`w-full h-16 object-cover transition-opacity duration-300 ${mainImage === image.url ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`} />
          </div>
        ))}
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={() => setIsLightboxOpen(false)}>
            <button className="absolute top-5 right-5 text-white text-4xl z-10">&times;</button>
            <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
                <img src={mainImage} alt={images[0]?.alt} className="max-h-[90vh] w-auto mx-auto rounded-lg"/>
                <div className="absolute inset-0 flex items-center justify-center">
                    <img src={COMPANY_INFO.logoUrl} alt="Watermark" className="w-32 h-32 opacity-25 pointer-events-none" />
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;