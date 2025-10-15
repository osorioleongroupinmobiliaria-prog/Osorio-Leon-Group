import React from 'react';
import NeumorphicCard from './ui/NeumorphicCard';
import NeumorphicButton from './ui/NeumorphicButton';
import type { Property } from '../types';
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

  const DetailItem: React.FC<{ icon: React.ReactNode, value: React.ReactNode }> = ({ icon, value }) => (
    <div className="flex items-center space-x-1.5">
        {icon}
        <span className="text-xs">{value}</span>
    </div>
  );

  return (
    <NeumorphicCard className="flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div className="relative group">
        <img
          src={imagenPrincipal?.url_imagen || 'https://picsum.photos/400/300'}
          alt={property.titulo}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300 flex items-center justify-center">
          <img src={COMPANY_INFO.logoUrl} alt="Watermark" className="w-24 h-auto opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
        </div>
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#e0e0e0]/90 rounded-full shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] text-xs font-semibold text-gray-700 capitalize">
          {t(`property.operation.${property.tipo_operacion}`)}
        </div>
      </div>
      <div className="p-2 flex flex-col flex-grow">
        <h3 className="text-sm font-bold text-gray-800 h-8 line-clamp-2">{property.titulo}</h3>
        <div className="flex items-center text-xs text-gray-500 mt-1">
            <LocationIcon className="w-3 h-3 mr-1"/>
            <span>{property.barrio_sector}, {property.ciudad}</span>
        </div>
        <p className="text-lg font-bold text-[#153B67] my-1">
          {formatPrice(property.precio)}
          {property.es_negociable && <span className="text-xs text-gray-500 ml-2 font-normal">{t('property.negotiable')}</span>}
        </p>
        
        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-gray-600 mb-2">
            {property.habitaciones ? <DetailItem icon={<span className="text-base" role="img" aria-label="Habitaciones">🛏️</span>} value={property.habitaciones} /> : null}
            {property.banos_completos ? <DetailItem icon={<span className="text-base" role="img" aria-label="Baños">🛁</span>} value={property.banos_completos} /> : null}
            {property.area_construida ? <DetailItem icon={<span className="text-base" role="img" aria-label="Área">📏</span>} value={<>{property.area_construida} m²</>} /> : null}
            {property.parqueaderos ? <DetailItem icon={<span className="text-base" role="img" aria-label="Parqueaderos">🚗</span>} value={property.parqueaderos} /> : null}
        </div>
        
        <div className="mt-auto flex flex-col gap-1.5 pt-1">
          <NeumorphicButton onClick={() => onVerMas(property)} className="w-full !px-3 !py-2 text-xs">
            {t('property.detailsButton')}
          </NeumorphicButton>
          <a
            href={`${SOCIAL_LINKS.whatsapp1}?text=${encodeURIComponent(t('property.whatsappMessage', { title: property.titulo }))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-green-500 text-white rounded-xl font-semibold shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff] active:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] transition-all duration-150 ease-in-out focus:outline-none px-3 py-2 text-xs"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </NeumorphicCard>
  );
};

export default PropertyCard;