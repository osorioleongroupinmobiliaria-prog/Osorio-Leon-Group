import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';
import type { Property } from '../types';
import Header from './Header';
import Footer from './Footer';
import ImageGallery from './ImageGallery';
import LocationIcon from './icons/LocationIcon';
import { SOCIAL_LINKS } from '../constants';
// FIX: Re-typed the import to fix a potential hidden character or module resolution issue.
import { useI18n } from '../i18n';
import SpinnerIcon from './icons/SpinnerIcon';
import NeumorphicCard from './ui/NeumorphicCard';

interface PropertyDetailPageProps {
  propertyId: string | null;
}

const FeatureChip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-black/5 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm text-gray-800 font-medium border border-black/10">
        {children}
    </div>
);

const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ propertyId }) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // FIX: Re-typed the hook call to fix a potential hidden character issue.
  const { t, language } = useI18n();

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) {
        setError('No se ha especificado un ID de propiedad.');
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error: dbError } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .eq('estado_publicacion', 'publicado')
        .single();

      if (dbError) {
        console.error('Error fetching property:', dbError);
        setError('No se pudo encontrar la propiedad o no está disponible.');
        setProperty(null);
      } else {
        setProperty(data);
        document.title = `${data.titulo} | Osorio & León Group`;
      }
      setLoading(false);
    };

    fetchProperty();
    
    // Reset title on component unmount
    return () => {
        document.title = 'Osorio & León Group - Inmobiliaria';
    }
  }, [propertyId]);

  if (loading) {
    return (
        <div className="min-h-screen bg-[#e0e0e0] flex items-center justify-center">
            <SpinnerIcon className="w-12 h-12 text-[#153B67]" />
        </div>
    );
  }

  if (error || !property) {
    return (
        <div className="bg-[#e0e0e0]">
            <Header />
            <main className="flex items-center justify-center py-20" style={{minHeight: 'calc(100vh - 150px)'}}>
                 <NeumorphicCard className="p-12 text-center">
                    <h1 className="text-2xl font-bold text-red-600">Propiedad no encontrada</h1>
                    <p className="mt-4 text-gray-600">{error || 'La propiedad que buscas no existe o ya no está disponible.'}</p>
                    <a href="/" className="inline-block mt-6 bg-[#153B67] text-white px-6 py-2 rounded-lg">Volver al inicio</a>
                </NeumorphicCard>
            </main>
            <Footer />
        </div>
    );
  }
  
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
    <div className="bg-[#e0e0e0]">
      <Header />
      <main className="py-8 sm:py-12">
        <div className="container mx-auto px-2 sm:px-6 lg:px-8">
           <NeumorphicCard className="p-4 sm:p-6 lg:p-8">
             <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{property.titulo}</h1>
                    <div className="flex items-center text-gray-600 mt-2">
                        <LocationIcon className="w-5 h-5 mr-2"/>
                        <span className="text-lg">{property.barrio_sector}, {property.ciudad}</span>
                    </div>
                </div>
                <div className="text-left md:text-right flex-shrink-0">
                    <p className="text-3xl sm:text-4xl font-bold text-[#153B67]">
                        {formatPrice(property.precio)}
                    </p>
                    {(property.valor_administracion ?? 0) > 0 && (
                        <p className="text-md text-gray-600">
                        + {formatPrice(property.valor_administracion!)} {t('propertyModal.adminFee')}
                        </p>
                    )}
                </div>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                     <ImageGallery images={property.imagenes.map(img => ({ url: img.url_imagen, alt: img.alt_text || property.titulo }))} />
                </div>
                <div className="lg:col-span-2">
                     <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4 text-gray-800">
                            <div className="flex items-center space-x-2 text-lg"><span role="img" aria-label={t('propertyModal.bedrooms')} className="text-xl">🛏️</span><span>{property.habitaciones || 0} {t('propertyModal.bedrooms')}</span></div>
                            <div className="flex items-center space-x-2 text-lg"><span role="img" aria-label={t('propertyModal.bathrooms')} className="text-xl">🛁</span><span>{property.banos_completos || 0} {t('propertyModal.bathrooms')}</span></div>
                            <div className="flex items-center space-x-2 text-lg"><span role="img" aria-label="área construida" className="text-xl">📏</span><span>{property.area_construida || 0} m²</span></div>
                            <div className="flex items-center space-x-2 text-lg"><span role="img" aria-label={t('propertyModal.parking')} className="text-xl">🚗</span><span>{property.parqueaderos || 0} {t('propertyModal.parking')}</span></div>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-3 text-[#153B67]">{t('propertyModal.description')}</h3>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{property.descripcion}</p>
                        </div>
                        
                         {(features.length > 0 || property.tipo_cocina || (property.tipo_vigilancia && property.tipo_vigilancia !== 'ninguna')) && (
                            <div>
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
           </NeumorphicCard>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetailPage;