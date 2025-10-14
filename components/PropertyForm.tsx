import React, { useState, useEffect } from 'react';
import type { Property, Imagen } from '../types';
import NeumorphicCard from './ui/NeumorphicCard';
import NeumorphicInput from './ui/NeumorphicInput';
import NeumorphicButton from './ui/NeumorphicButton';
import NeumorphicCheckbox from './ui/NeumorphicCheckbox';

interface PropertyFormProps {
  property: Property | null;
  onSave: (property: Property) => void;
  onCancel: () => void;
  isSaving: boolean;
}

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
  tipo_cocina: 'no_tiene',
  tipo_vigilancia: 'sin_vigilancia',
  tiene_comedor: false,
  tiene_gas_domiciliario: false,
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
  tiene_vidrio_templado: false,
  tiene_reja: false,
  tiene_puerta_tradicional: false,
  imagenes: [],
  es_destacado: false,
  estado_publicacion: 'borrador',
  fecha_publicacion: new Date().toISOString(),
};

const PropertyForm: React.FC<PropertyFormProps> = ({ property, onSave, onCancel, isSaving }) => {
  const [formData, setFormData] = useState<Property>(emptyProperty);

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

  return (
    <form onSubmit={handleSubmit}>
      <NeumorphicCard className="p-8">
        <h2 className="text-2xl font-bold text-[#153B67] mb-6">{property ? 'Editar Propiedad' : 'Nueva Propiedad'}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Columna Izquierda */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-700 border-b pb-2">Información Básica</h3>
            <LabeledInput label="Título" name="titulo" value={formData.titulo} onChange={handleChange} required />
            <LabeledInput as="textarea" label="Descripción" name="descripcion" value={formData.descripcion} onChange={handleChange} rows={5} required />
            <LabeledInput label="Ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} required />
            <LabeledInput label="Barrio/Sector" name="barrio_sector" value={formData.barrio_sector} onChange={handleChange} required />
            
            <div className="grid grid-cols-2 gap-4">
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

            <div className="grid grid-cols-2 gap-4 items-center">
              <LabeledInput type="number" label="Precio (COP)" name="precio" value={formData.precio} onChange={handleChange} required />
              <NeumorphicCheckbox name="es_negociable" label="Precio Negociable" checked={formData.es_negociable} onChange={checked => handleCheckboxChange('es_negociable', checked)} />
            </div>
            
            <LabeledInput type="number" label="Valor Administración (Opcional)" name="valor_administracion" value={formData.valor_administracion} onChange={handleChange} />
            
            <div className="grid grid-cols-2 gap-4">
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <LabeledInput type="number" label="Área (m²)" name="area_construida" value={formData.area_construida} onChange={handleChange} />
              <LabeledInput type="number" label="Habitaciones" name="habitaciones" value={formData.habitaciones} onChange={handleChange} />
              <LabeledInput type="number" label="Baños" name="banos_completos" value={formData.banos_completos} onChange={handleChange} />
              <LabeledInput type="number" label="Parqueaderos" name="parqueaderos" value={formData.parqueaderos} onChange={handleChange} />
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-700 border-b pb-2">Características Adicionales</h3>
            <div className="grid grid-cols-2 gap-3">
                <NeumorphicCheckbox name="tiene_comedor" label="Comedor" checked={!!formData.tiene_comedor} onChange={c => handleCheckboxChange('tiene_comedor', c)} />
                <NeumorphicCheckbox name="tiene_gas_domiciliario" label="Gas Domiciliario" checked={!!formData.tiene_gas_domiciliario} onChange={c => handleCheckboxChange('tiene_gas_domiciliario', c)} />
                <NeumorphicCheckbox name="tiene_balcon" label="Balcón" checked={formData.tiene_balcon} onChange={c => handleCheckboxChange('tiene_balcon', c)} />
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
                <NeumorphicCheckbox name="tiene_vidrio_templado" label="Vidrio Templado" checked={!!formData.tiene_vidrio_templado} onChange={c => handleCheckboxChange('tiene_vidrio_templado', c)} />
                <NeumorphicCheckbox name="tiene_reja" label="Reja" checked={!!formData.tiene_reja} onChange={c => handleCheckboxChange('tiene_reja', c)} />
                <NeumorphicCheckbox name="tiene_puerta_tradicional" label="Puerta Tradicional" checked={!!formData.tiene_puerta_tradicional} onChange={c => handleCheckboxChange('tiene_puerta_tradicional', c)} />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <LabeledInput as="select" label="Tipo de Cocina" name="tipo_cocina" value={formData.tipo_cocina} onChange={handleChange}>
                    <option value="no_tiene">No tiene</option>
                    <option value="sencilla">Sencilla</option>
                    <option value="integral">Integral</option>
                </LabeledInput>
                 <LabeledInput as="select" label="Tipo de Vigilancia" name="tipo_vigilancia" value={formData.tipo_vigilancia} onChange={handleChange}>
                    <option value="sin_vigilancia">Sector Sin Vigilancia</option>
                    <option value="cuadrante_policia">Cuadrante de Policía</option>
                    <option value="privada">Vigilancia Privada</option>
                    <option value="pasa_policia">Pasa Policía Constantemente</option>
                    <option value="sector_vigilado">Sector Vigilado por Policía</option>
                </LabeledInput>
            </div>

            <h3 className="font-bold text-lg text-gray-700 border-b pb-2 pt-4">Imágenes (URLs)</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {formData.imagenes.map((img, index) => (
                    <div key={img.id} className="flex items-center gap-2">
                        <input type="radio" name="principal_image" checked={img.es_principal} onChange={() => setPrincipalImage(index)} title="Marcar como principal" className="mt-1"/>
                        <NeumorphicInput containerClassName="flex-grow" placeholder="https://..." value={img.url_imagen} onChange={e => handleImageChange(index, e.target.value)} />
                        <NeumorphicButton type="button" onClick={() => removeImageField(index)} className="!px-3 !py-1 text-xs !bg-red-200">X</NeumorphicButton>
                    </div>
                ))}
            </div>
            <NeumorphicButton type="button" onClick={addImageField} className="text-sm w-full">Añadir Imagen</NeumorphicButton>

            <h3 className="font-bold text-lg text-gray-700 border-b pb-2 pt-4">Publicación</h3>
            <div className="grid grid-cols-2 gap-4 items-center">
                 <LabeledInput as="select" label="Estado" name="estado_publicacion" value={formData.estado_publicacion} onChange={handleChange}>
                    <option value="publicado">Publicado</option>
                    <option value="borrador">Borrador</option>
                    <option value="pausado">Pausado</option>
                </LabeledInput>
                 <NeumorphicCheckbox name="es_destacado" label="Propiedad Destacada" checked={formData.es_destacado} onChange={c => handleCheckboxChange('es_destacado', c)} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
            <NeumorphicButton type="button" onClick={onCancel} disabled={isSaving}>Cancelar</NeumorphicButton>
            <NeumorphicButton type="submit" className="!bg-[#153B67] !text-white" disabled={isSaving}>
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