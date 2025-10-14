import React, { useState, useEffect } from 'react';
import type { Property, Imagen } from '../types';
import NeumorphicCard from './ui/NeumorphicCard';
import NeumorphicInput from './ui/NeumorphicInput';
import NeumorphicButton from './ui/NeumorphicButton';
import NeumorphicCheckbox from './ui/NeumorphicCheckbox';
import ImagePlaceholderIcon from './icons/ImagePlaceholderIcon';
import StarSolidIcon from './icons/StarSolidIcon';
import StarOutlineIcon from './icons/StarOutlineIcon';
import TrashIcon from './icons/TrashIcon';

interface PropertyFormProps {
  property: Property | null;
  onSave: (property: Property) => void;
  onCancel: () => void;
  isSaving: boolean;
}

type FormTab = 'info' | 'details' | 'images' | 'publishing';

const emptyProperty: Property = {
  id: '',
  titulo: '',
  descripcion: '',
  ciudad: '',
  barrio_sector: '',
  tipo_operacion: 'venta',
  tipo_propiedad: 'apartamento',
  precio: 0,
  valor_administracion: 0,
  es_negociable: false,
  area_construida: 0,
  habitaciones: 0,
  banos_completos: 0,
  parqueaderos: 0,
  estado_inmueble: 'used',
  estado_amoblado: 'sin_amoblar',
  tiene_balcon: false,
  tiene_gimnasio: false,
  tiene_piscina_comun: false,
  tiene_ascensor: false,
  tiene_porteria_24h: false,
  tiene_zonas_verdes: false,
  tiene_cancha_futbol: false,
  tiene_kiosko_asados: false,
  tiene_salon_social: false,
  tiene_juegos_infantiles: false,
  tiene_sendero_peatonal: false,
  imagenes: [],
  es_destacado: false,
  estado_publicacion: 'borrador',
  fecha_publicacion: new Date().toISOString(),
  tiene_comedor: false,
  tipo_cocina: 'sencilla',
  tipo_vigilancia: 'ninguna',
  tiene_gas_domiciliario: false,
  tiene_vidrio_templado: false,
  tiene_reja: false,
  tiene_puerta_tradicional: false,
};

const ImagePreview: React.FC<{ src: string }> = ({ src }) => {
    const [hasError, setHasError] = useState(!src);
    useEffect(() => {
        setHasError(!src);
    }, [src]);

    if (hasError) {
        return <div className="w-12 h-12 flex-shrink-0 bg-gray-200 rounded-md flex items-center justify-center"><ImagePlaceholderIcon className="w-6 h-6 text-gray-400"/></div>;
    }
    return <img src={src} alt="Preview" className="w-12 h-12 flex-shrink-0 object-cover rounded-md" onError={() => setHasError(true)} />;
};

const PropertyForm: React.FC<PropertyFormProps> = ({ property, onSave, onCancel, isSaving }) => {
  const [formData, setFormData] = useState<Property>(emptyProperty);
  const [activeTab, setActiveTab] = useState<FormTab>('info');

  useEffect(() => {
    setFormData(property ? { ...property } : { ...emptyProperty, id: `prop_${Date.now()}` });
  }, [property]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    let processedValue: any = value;
    if (type === 'number') {
        processedValue = value === '' ? 0 : parseFloat(value);
    }
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleImageChange = (index: number, url: string) => {
    const newImages = [...formData.imagenes];
    newImages[index].url_imagen = url;
    setFormData(prev => ({ ...prev, imagenes: newImages }));
  };
  
  const addImageField = () => {
    const newImage: Imagen = { id: `img_${Date.now()}`, url_imagen: '', es_principal: formData.imagenes.length === 0 };
    setFormData(prev => ({ ...prev, imagenes: [...prev.imagenes, newImage]}));
  };

  const removeImageField = (index: number) => {
    const newImages = formData.imagenes.filter((_, i) => i !== index);
    if(newImages.length > 0 && !newImages.some(img => img.es_principal)) {
      newImages[0].es_principal = true;
    }
    setFormData(prev => ({ ...prev, imagenes: newImages }));
  };

  const setPrincipalImage = (index: number) => {
    const newImages = formData.imagenes.map((img, i) => ({
      ...img,
      es_principal: i === index
    }));
    setFormData(prev => ({ ...prev, imagenes: newImages }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, fecha_publicacion: new Date().toISOString() });
  };
  
  const TabButton: React.FC<{ tab: FormTab; label: string }> = ({ tab, label }) => (
    <button
      type="button"
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200
        ${activeTab === tab 
          ? 'bg-[#e0e0e0] shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] text-[#153B67]' 
          : 'text-gray-600 hover:text-gray-800'}`
      }
    >
      {label}
    </button>
  );

  return (
    <form onSubmit={handleSubmit}>
      <NeumorphicCard className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#153B67] mb-6">{property ? 'Editar Propiedad' : 'Nueva Propiedad'}</h2>
        
        <div className="mb-6 flex flex-wrap gap-2 p-1 bg-gray-200/50 rounded-lg">
          <TabButton tab="info" label="Información Básica"/>
          <TabButton tab="details" label="Detalles y Características"/>
          <TabButton tab="images" label="Imágenes"/>
          <TabButton tab="publishing" label="Publicación"/>
        </div>

        <div className="min-h-[400px]">
          {/* TAB: Información Básica */}
          {activeTab === 'info' && (
            <div className="space-y-4 animate-fade-in-scale">
                <LabeledInput label="Título" name="titulo" value={formData.titulo} onChange={handleChange} required />
                <LabeledInput as="textarea" label="Descripción" name="descripcion" value={formData.descripcion} onChange={handleChange} rows={6} required />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <LabeledInput label="Departamento" name="departamento" value={formData.departamento} onChange={handleChange} required />
                    <LabeledInput label="Ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <LabeledInput label="Barrio/Sector" name="barrio_sector" value={formData.barrio_sector} onChange={handleChange} required />
                    <LabeledInput type="number" label="Estrato" name="estrato" value={formData.estrato} onChange={handleChange} />
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <LabeledInput as="select" label="Operación" name="tipo_operacion" value={formData.tipo_operacion} onChange={handleChange}>
                        <option value="venta">Venta</option>
                        <option value="arriendo">Arriendo</option>
                    </LabeledInput>
                    <LabeledInput as="select" label="Tipo de Propiedad" name="tipo_propiedad" value={formData.tipo_propiedad} onChange={handleChange}>
                        <option value="apartamento">Apartamento</option>
                        <option value="casa">Casa</option>
                        <option value="oficina">Oficina</option>
                        <option value="local">Local</option>
                        <option value="lote">Lote</option>
                        <option value="finca">Finca</option>
                    </LabeledInput>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <LabeledInput type="number" label="Precio (COP)" name="precio" value={formData.precio} onChange={handleChange} required />
                    <NeumorphicCheckbox name="es_negociable" label="Precio Negociable" checked={formData.es_negociable} onChange={checked => handleCheckboxChange('es_negociable', checked)} />
                </div>
                <LabeledInput type="number" label="Valor Administración (Opcional)" name="valor_administracion" value={formData.valor_administracion} onChange={handleChange} />
            </div>
          )}

          {/* TAB: Detalles y Características */}
          {activeTab === 'details' && (
            <div className="space-y-6 animate-fade-in-scale">
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <LabeledInput type="number" label="Área (m²)" name="area_construida" value={formData.area_construida} onChange={handleChange} />
                    <LabeledInput type="number" label="Habitaciones" name="habitaciones" value={formData.habitaciones} onChange={handleChange} />
                    <LabeledInput type="number" label="Baños" name="banos_completos" value={formData.banos_completos} onChange={handleChange} />
                    <LabeledInput type="number" label="Parqueaderos" name="parqueaderos" value={formData.parqueaderos} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <LabeledInput as="select" label="Estado del Inmueble" name="estado_inmueble" value={formData.estado_inmueble} onChange={handleChange}>
                        <option value="new">A Estrenar</option>
                        <option value="used">Usado</option>
                        <option value="remodeled">Remodelado</option>
                        <option value="under_construction">En Construcción</option>
                    </LabeledInput>
                    <LabeledInput as="select" label="Amoblado" name="estado_amoblado" value={formData.estado_amoblado} onChange={handleChange}>
                        <option value="sin_amoblar">Sin Amoblar</option>
                        <option value="amoblado">Amoblado</option>
                        <option value="semi_amoblado">Semi-amoblado</option>
                    </LabeledInput>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <LabeledInput as="select" label="Tipo de Cocina" name="tipo_cocina" value={formData.tipo_cocina}>
                        <option value="sencilla">Sencilla</option>
                        <option value="semi_integral">Semi-Integral</option>
                        <option value="integral">Integral</option>
                    </LabeledInput>
                    <LabeledInput as="select" label="Tipo de Vigilancia" name="tipo_vigilancia" value={formData.tipo_vigilancia}>
                        <option value="ninguna">Ninguna</option>
                        <option value="celador">Celador</option>
                        <option value="privada">Vigilancia Privada</option>
                        <option value="policia">Policía</option>
                    </LabeledInput>
                </div>

                <h3 className="font-bold text-lg text-gray-700 border-b pb-2 pt-2">Características Adicionales</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <NeumorphicCheckbox name="tiene_balcon" label="Balcón" checked={formData.tiene_balcon} onChange={c => handleCheckboxChange('tiene_balcon', c)} />
                    <NeumorphicCheckbox name="tiene_comedor" label="Comedor" checked={formData.tiene_comedor} onChange={c => handleCheckboxChange('tiene_comedor', c)} />
                    <NeumorphicCheckbox name="tiene_gas_domiciliario" label="Gas Domiciliario" checked={formData.tiene_gas_domiciliario} onChange={c => handleCheckboxChange('tiene_gas_domiciliario', c)} />
                    <NeumorphicCheckbox name="tiene_gimnasio" label="Gimnasio" checked={formData.tiene_gimnasio} onChange={c => handleCheckboxChange('tiene_gimnasio', c)} />
                    <NeumorphicCheckbox name="tiene_piscina_comun" label="Piscina" checked={formData.tiene_piscina_comun} onChange={c => handleCheckboxChange('tiene_piscina_comun', c)} />
                    <NeumorphicCheckbox name="tiene_ascensor" label="Ascensor" checked={formData.tiene_ascensor} onChange={c => handleCheckboxChange('tiene_ascensor', c)} />
                    <NeumorphicCheckbox name="tiene_porteria_24h" label="Portería 24h" checked={formData.tiene_porteria_24h} onChange={c => handleCheckboxChange('tiene_porteria_24h', c)} />
                    <NeumorphicCheckbox name="tiene_zonas_verdes" label="Zonas Verdes" checked={formData.tiene_zonas_verdes} onChange={c => handleCheckboxChange('tiene_zonas_verdes', c)} />
                    <NeumorphicCheckbox name="tiene_cancha_futbol" label="Cancha de Fútbol" checked={formData.tiene_cancha_futbol} onChange={c => handleCheckboxChange('tiene_cancha_futbol', c)} />
                    <NeumorphicCheckbox name="tiene_kiosko_asados" label="Kiosko Asados" checked={formData.tiene_kiosko_asados} onChange={c => handleCheckboxChange('tiene_kiosko_asados', c)} />
                    <NeumorphicCheckbox name="tiene_salon_social" label="Salón Social" checked={formData.tiene_salon_social} onChange={c => handleCheckboxChange('tiene_salon_social', c)} />
                    <NeumorphicCheckbox name="tiene_juegos_infantiles" label="Juegos Infantiles" checked={formData.tiene_juegos_infantiles} onChange={c => handleCheckboxChange('tiene_juegos_infantiles', c)} />
                    <NeumorphicCheckbox name="tiene_sendero_peatonal" label="Sendero Peatonal" checked={formData.tiene_sendero_peatonal} onChange={c => handleCheckboxChange('tiene_sendero_peatonal', c)} />
                    <NeumorphicCheckbox name="tiene_reja" label="Reja de Seguridad" checked={formData.tiene_reja} onChange={c => handleCheckboxChange('tiene_reja', c)} />
                    <NeumorphicCheckbox name="tiene_vidrio_templado" label="Vidrio Templado" checked={formData.tiene_vidrio_templado} onChange={c => handleCheckboxChange('tiene_vidrio_templado', c)} />
                    <NeumorphicCheckbox name="tiene_puerta_tradicional" label="Puerta Tradicional" checked={formData.tiene_puerta_tradicional} onChange={c => handleCheckboxChange('tiene_puerta_tradicional', c)} />
                </div>
            </div>
          )}

          {/* TAB: Imágenes */}
          {activeTab === 'images' && (
            <div className="animate-fade-in-scale">
                 <p className="text-sm text-gray-600 mb-4">Pega las URLs de las imágenes. Haz clic en la estrella para marcar una como principal.</p>
                 <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {formData.imagenes.map((img, index) => (
                        <div key={img.id} className="flex items-center gap-2 p-2 bg-gray-200/50 rounded-lg">
                            <ImagePreview src={img.url_imagen} />
                            <NeumorphicInput containerClassName="flex-grow" placeholder="https://..." value={img.url_imagen} onChange={e => handleImageChange(index, e.target.value)} />
                            <button type="button" onClick={() => setPrincipalImage(index)} title="Marcar como principal" className="p-2 text-gray-500 hover:text-yellow-500">
                                {img.es_principal ? <StarSolidIcon className="w-5 h-5 text-yellow-500" /> : <StarOutlineIcon className="w-5 h-5" />}
                            </button>
                            <NeumorphicButton type="button" onClick={() => removeImageField(index)} className="!p-2 !bg-red-200" title="Eliminar imagen">
                                <TrashIcon className="w-4 h-4 text-red-700"/>
                            </NeumorphicButton>
                        </div>
                    ))}
                </div>
                <NeumorphicButton type="button" onClick={addImageField} className="text-sm w-full mt-4">Añadir Imagen</NeumorphicButton>
            </div>
          )}
          
          {/* TAB: Publicación */}
          {activeTab === 'publishing' && (
             <div className="space-y-6 animate-fade-in-scale">
                <LabeledInput as="select" label="Estado de Publicación" name="estado_publicacion" value={formData.estado_publicacion} onChange={handleChange}>
                    <option value="publicado">Publicado (Visible para todos)</option>
                    <option value="borrador">Borrador (Oculto)</option>
                    <option value="pausado">Pausado (Oculto temporalmente)</option>
                </LabeledInput>
                <NeumorphicCheckbox name="es_destacado" label="Marcar como Propiedad Destacada" checked={formData.es_destacado} onChange={c => handleCheckboxChange('es_destacado', c)} />
             </div>
          )}

        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-end gap-4 mt-8 pt-6 border-t border-gray-300">
            <NeumorphicButton type="button" onClick={onCancel} disabled={isSaving} className="w-full sm:w-auto">Cancelar</NeumorphicButton>
            <NeumorphicButton type="submit" className="!bg-[#153B67] !text-white w-full sm:w-auto" disabled={isSaving}>
                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </NeumorphicButton>
        </div>

      </NeumorphicCard>
    </form>
  );
};

// Helper component for label + input combo
const LabeledInput: React.FC<React.ComponentProps<typeof NeumorphicInput> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <NeumorphicInput {...props} />
    </div>
);

export default PropertyForm;
