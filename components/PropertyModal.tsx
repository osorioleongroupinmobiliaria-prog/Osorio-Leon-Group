import React from 'react';
import type { Property } from '../types';
import ImageGallery from './ImageGallery';
import LocationIcon from './icons/LocationIcon';
import { SOCIAL_LINKS } from '../constants';
import { useI18n } from '../i18n';

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
}

const FeatureChip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-black/5 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm text-gray-800 font-medium border border-black/10">
        {children}
    </div>
);

const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose }) => {
  const { t, language } = useI18n();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'es' ? 'es-CO' : 'en-US', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const features = [
    { labelKey: 'features.balcony', value: property.tiene_balcon },
    { labelKey: 'features.diningRoom', value: property.tiene_comedor },
    { labelKey: 'features.gas', value: property.tiene_gas_domiciliario },
    { labelKey: 'features.gym', value: property.tiene_gimnasio },
    { labelKey: 'features.pool', value: property.tiene_piscina_comun },
    { labelKey: 'features.elevator', value: property.tiene_ascensor },
    { labelKey: 'features.concierge', value: property.tiene_porteria_24h },
    { labelKey: 'features.greenAreas', value: property.tiene_zonas_verdes },
    { labelKey: 'features.soccerField', value: property.tiene_cancha_futbol },
    { labelKey: 'features.bbqKiosk', value: property.tiene_kiosko_asados },
    { labelKey: 'features.socialRoom', value: property.tiene_salon_social },
    { labelKey: 'features.playground', value: property.tiene_juegos_infantiles },
    { labelKey: 'features.walkingPath', value: property.tiene_sendero_peatonal },
    { labelKey: 'features.temperedGlass', value: property.tiene_vidrio_templado },
    { labelKey: 'features.securityGate', value: property.tiene_reja },
    { labelKey: 'features.traditionalDoor', value: property.tiene_puerta_tradicional },
  ].filter(f => f.value);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden animate-fade-in-scale" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-black/10 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900">{property.titulo}</h2>
          <button onClick={onClose} className="text-3xl font-light text-gray-700 hover:text-black">&times;</button>
        </div>
        <div className="flex-grow overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ImageGallery images={property.imagenes.map(img => ({ url: img.url_imagen, alt: img.alt_text || property.titulo }))} />
              <div className="mt-6">
                <h3 className="font-bold text-lg mb-3 text-[#153B67]">{t('propertyModal.description')}</h3>
                <p className="text-gray-700 leading-relaxed">{property.descripcion}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center text-gray-600 mb-4">
                  <LocationIcon className="w-5 h-5 mr-2"/>
                  <span className="text-lg">{property.barrio_sector}, {property.ciudad}</span>
              </div>
              <p className="text-4xl font-bold text-[#153B67] mb-1">
                {formatPrice(property.precio)}
              </p>
              {(property.valor_administracion ?? 0) > 0 && (
                <p className="text-md text-gray-600 mb-4">
                  + {formatPrice(property.valor_administracion!)} {t('propertyModal.adminFee')}
                </p>
              )}
              {property.es_negociable && <p className="text-sm text-gray-600 mb-6">{t('propertyModal.negotiable')}</p>}
              
              <div className="grid grid-cols-2 gap-4 text-gray-800 mb-6">
                <div className="flex items-center space-x-2 text-lg"><span role="img" aria-label={t('propertyModal.bedrooms')} className="text-xl">🛏️</span><span>{property.habitaciones || 0} {t('propertyModal.bedrooms')}</span></div>
                <div className="flex items-center space-x-2 text-lg"><span role="img" aria-label={t('propertyModal.bathrooms')} className="text-xl">🛁</span><span>{property.banos_completos || 0} {t('propertyModal.bathrooms')}</span></div>
                <div className="flex items-center space-x-2 text-lg"><span role="img" aria-label="área construida" className="text-xl">📏</span><span>{property.area_construida || 0} m²</span></div>
                <div className="flex items-center space-x-2 text-lg"><span role="img" aria-label={t('propertyModal.parking')} className="text-xl">🚗</span><span>{property.parqueaderos || 0} {t('propertyModal.parking')}</span></div>
              </div>
              
              {(features.length > 0 || property.tipo_cocina || (property.tipo_vigilancia && property.tipo_vigilancia !== 'ninguna')) && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3 text-[#153B67]">{t('propertyModal.additionalFeatures')}</h3>
                  <div className="flex flex-wrap gap-2">
                    <FeatureChip>{t(`furnishing.${property.estado_amoblado}`)}</FeatureChip>
                    {property.tipo_cocina && <FeatureChip>{t('kitchen.label')}: {t(`kitchen.${property.tipo_cocina}`)}</FeatureChip>}
                    {property.tipo_vigilancia && property.tipo_vigilancia !== 'ninguna' && <FeatureChip>{t('surveillance.label')}: {t(`surveillance.${property.tipo_vigilancia}`)}</FeatureChip>}
                    {features.map(f => <FeatureChip key={f.labelKey}>{t(f.labelKey)}</FeatureChip>)}
                  </div>
                </div>
              )}
              
              <a
                href={`${SOCIAL_LINKS.whatsapp1}?text=${encodeURIComponent(t('propertyModal.whatsappMessage', { title: property.titulo }))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center block bg-green-500 text-white rounded-xl font-semibold shadow-lg hover:bg-green-600 active:bg-green-700 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 px-6 py-4 text-lg"
              >
                {t('propertyModal.contactButton')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;