import React from 'react';
import NeumorphicCard from './ui/NeumorphicCard';
import NeumorphicButton from './ui/NeumorphicButton';
import type { Property } from '../types';
import BedIcon from './icons/BedIcon';
import BathIcon from './icons/BathIcon';
import AreaIcon from './icons/AreaIcon';
import GarageIcon from './icons/GarageIcon';
import LocationIcon from './icons/LocationIcon';
import { SOCIAL_LINKS, COMPANY_INFO } from '../constants';
import { useI18n } from '../i18n';

interface PropertyCardProps {
  property: Property;
  onVerMas: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onVerMas }) => {
  const { t, language } = useI18n();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'es' ? 'es-CO' : 'en-US', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const imagenPrincipal = property.imagenes?.find(img => img.es_principal) || property.imagenes?.[0];

  return (
    <NeumorphicCard className="flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-2">
      <div className="relative group">
        <img
          src={imagenPrincipal?.url_imagen || 'https://picsum.photos/400/300'}
          alt={property.titulo}
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300 flex items-center justify-center">
          <img src={COMPANY_INFO.logoUrl} alt="Watermark" className="w-32 h-auto opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
        </div>
        <div className="absolute top-3 left-3 px-3 py-1 bg-[#e0e0e0] rounded-full shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff] text-xs font-semibold text-gray-700 capitalize">
          {t(`property.operation.${property.tipo_operacion}`)}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 h-14 line-clamp-2">{property.titulo}</h3>
        <div className="flex items-center text-sm text-gray-500 mt-1">
            <LocationIcon className="w-4 h-4 mr-1"/>
            <span>{property.barrio_sector}, {property.ciudad}</span>
        </div>
        <p className="text-2xl font-bold text-[#153B67] my-4">
          {formatPrice(property.precio)}
          {property.es_negociable && <span className="text-xs text-gray-500 ml-2 font-normal">{t('property.negotiable')}</span>}
        </p>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-gray-600 mb-5">
            {property.habitaciones && <div className="flex items-center space-x-1"><BedIcon className="w-5 h-5"/><span>{property.habitaciones}</span></div>}
            {property.banos_completos && <div className="flex items-center space-x-1"><BathIcon className="w-5 h-5"/><span>{property.banos_completos}</span></div>}
            {property.area_construida && <div className="flex items-center space-x-1"><AreaIcon className="w-5 h-5"/><span>{property.area_construida} m²</span></div>}
            {property.parqueaderos && <div className="flex items-center space-x-1"><GarageIcon className="w-5 h-5"/><span>{property.parqueaderos}</span></div>}
        </div>
        
        <div className="mt-auto flex flex-col sm:flex-row gap-3">
          <NeumorphicButton onClick={() => onVerMas(property)} className="w-full text-sm">
            {t('property.detailsButton')}
          </NeumorphicButton>
          <a
            href={`${SOCIAL_LINKS.whatsapp1}?text=${encodeURIComponent(t('property.whatsappMessage', { title: property.titulo }))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-green-500 text-white rounded-xl font-semibold shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[2px_2px_5px_#bebebe,-2px_-2px_5px_#ffffff] active:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] transition-all duration-150 ease-in-out focus:outline-none px-6 py-3 text-sm"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </NeumorphicCard>
  );
};

export default PropertyCard;