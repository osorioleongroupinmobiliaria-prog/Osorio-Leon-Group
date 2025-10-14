import React, { useState, useEffect } from 'react';
import type { Property, Imagen } from '../types';
import { supabase } from '../supabase/client';
import NeumorphicCard from './ui/NeumorphicCard';
import NeumorphicInput from './ui/NeumorphicInput';
import NeumorphicButton from './ui/NeumorphicButton';
import NeumorphicCheckbox from './ui/NeumorphicCheckbox';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';
import StarSolidIcon from './icons/StarSolidIcon';
import StarOutlineIcon from './icons/StarOutlineIcon';
import SpinnerIcon from './icons/SpinnerIcon';
import UploadIcon from './icons/UploadIcon';
import LinkIcon from './icons/LinkIcon';
import ImagePlaceholderIcon from './icons/ImagePlaceholderIcon';

interface PropertyFormProps {
  property: Property | null;
  onSave: (property: Property) => void;
  onCancel: () => void;
  isSaving: boolean;
}

const newPropertyTemplate: Omit<Property, 'id'> = {
    titulo: '',
    descripcion: '',
    departamento: 'Caldas',
    ciudad: 'Manizales',
    barrio_sector: '',
    direccion_completa: '',
    estrato: 3,
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
    tipo_cocina: 'integral',
    tipo_vigilancia: 'privada',
    tiene_gas_domiciliario: false,
    tiene_vidrio_templado: false,
    tiene_reja: false,
    tiene_puerta_tradicional: false,
};


const PropertyForm: React.FC<PropertyFormProps> = ({ property, onSave, onCancel, isSaving }) => {
    const [formData, setFormData] = useState<Property>(
        property || { ...newPropertyTemplate, id: `prop_${Date.now()}` }
    );
    const [activeTab, setActiveTab] = useState('info');
    
    useEffect(() => {
        if (property) {
            setFormData(property);
        } else {
            setFormData({ ...newPropertyTemplate, id: `prop_${Date.now()}` });
        }
    }, [property]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        let processedValue: string | number | boolean = value;
        if (type === 'number') processedValue = value === '' ? 0 : Number(value);
        setFormData(prev => ({ ...prev, [name]: processedValue }));
    };

    const handleCheckboxChange = (name: string, checked: boolean) => {
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const addImageSlot = () => {
        const newImage: Imagen = { 
            id: `img_${Date.now()}`, 
            url_imagen: '', 
            es_principal: formData.imagenes.length === 0, 
            uploadMode: 'file' 
        };
        setFormData(prev => ({ ...prev, imagenes: [...prev.imagenes, newImage] }));
    };

    const removeImage = (index: number) => {
        const newImages = formData.imagenes.filter((_, i) => i !== index);
        if (formData.imagenes[index]?.es_principal && newImages.length > 0 && !newImages.some(img => img.es_principal)) {
            newImages[0].es_principal = true;
        }
        setFormData(prev => ({ ...prev, imagenes: newImages }));
    };
    
    const setPrincipalImage = (index: number) => {
        const newImages = formData.imagenes.map((img, i) => ({ ...img, es_principal: i === index }));
        setFormData(prev => ({ ...prev, imagenes: newImages }));
    };

    const handleImageModeToggle = (index: number) => {
        const newImages = [...formData.imagenes];
        const currentMode = newImages[index].uploadMode || 'file';
        newImages[index].uploadMode = currentMode === 'file' ? 'url' : 'file';
        newImages[index].url_imagen = '';
        newImages[index].file = undefined;
        setFormData(prev => ({...prev, imagenes: newImages}));
    };
    
    const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const newImages = [...formData.imagenes];
            newImages[index].file = file;
            newImages[index].url_imagen = URL.createObjectURL(file); // For preview
            setFormData(prev => ({ ...prev, imagenes: newImages }));
        }
    };
    
    const handleUrlChange = (index: number, value: string) => {
        const newImages = [...formData.imagenes];
        newImages[index].url_imagen = value;
        setFormData(prev => ({ ...prev, imagenes: newImages }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const imageUploadPromises = formData.imagenes.map(async (image, index) => {
            if (image.file) {
                // Set loading state for this image
                setFormData(prev => {
                    const newImages = [...prev.imagenes];
                    newImages[index].isUploading = true;
                    return { ...prev, imagenes: newImages };
                });

                const file = image.file;
                const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
                const { data, error } = await supabase.storage.from('property-images').upload(fileName, file);

                if (error) {
                    alert(`Error subiendo imagen: ${error.message}`);
                    throw new Error(error.message); // Stop the process
                }

                const { data: { publicUrl } } = supabase.storage.from('property-images').getPublicUrl(data.path);
                
                // Return a clean image object without file/uploading state
                return { ...image, url_imagen: publicUrl, file: undefined, isUploading: false };
            }
            // Return existing image object
            return { ...image, file: undefined, isUploading: false };
        });

        try {
            const uploadedImages = await Promise.all(imageUploadPromises);
            const finalPropertyData = { ...formData, imagenes: uploadedImages };
            onSave(finalPropertyData);
        } catch (error) {
            console.error("No se pudo completar el guardado debido a un error en la subida de imágenes.", error);
            // Optionally reset isUploading states here if needed
        }
    };

    const featureCheckboxes = [
        { name: 'es_negociable', label: 'Precio Negociable' },
        { name: 'es_destacado', label: 'Propiedad Destacada' },
        { name: 'tiene_balcon', label: 'Balcón' },
        { name: 'tiene_comedor', label: 'Comedor' },
        { name: 'tiene_ascensor', label: 'Ascensor' },
        { name: 'tiene_porteria_24h', label: 'Portería 24h' },
        { name: 'tiene_gimnasio', label: 'Gimnasio' },
        { name: 'tiene_piscina_comun', label: 'Piscina Comunal' },
        { name: 'tiene_gas_domiciliario', label: 'Gas Domiciliario' },
        { name: 'tiene_zonas_verdes', label: 'Zonas Verdes' },
        { name: 'tiene_cancha_futbol', label: 'Cancha de Fútbol' },
        { name: 'tiene_kiosko_asados', label: 'Kiosko de Asados' },
        { name: 'tiene_salon_social', label: 'Salón Social' },
        { name: 'tiene_juegos_infantiles', label: 'Juegos Infantiles' },
        { name: 'tiene_sendero_peatonal', label: 'Sendero Peatonal' },
        { name: 'tiene_vidrio_templado', label: 'Vidrio Templado' },
        { name: 'tiene_reja', label: 'Reja de Seguridad' },
        { name: 'tiene_puerta_tradicional', label: 'Puerta Tradicional' },
    ];
    
    const TabButton: React.FC<{tabId: string, children: React.ReactNode}> = ({ tabId, children }) => (
        <button type="button" onClick={() => setActiveTab(tabId)} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === tabId ? 'bg-[#153B67] text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}>
            {children}
        </button>
    );

    return (
        <form onSubmit={handleSubmit}>
            <NeumorphicCard className="p-4 sm:p-6 space-y-6">
                <h2 className="text-xl font-bold text-[#153B67]">{property ? 'Editar Propiedad' : 'Añadir Nueva Propiedad'}</h2>

                <div className="flex flex-wrap gap-2 border-b border-gray-300 pb-4">
                    <TabButton tabId="info">Información Básica</TabButton>
                    <TabButton tabId="details">Detalles y Características</TabButton>
                    <TabButton tabId="images">Imágenes</TabButton>
                    <TabButton tabId="publishing">Publicación</TabButton>
                </div>
                
                {activeTab === 'info' && (
                    <NeumorphicCard className="p-4 space-y-4 animate-fade-in-scale">
                        <h3 className="font-semibold mb-2 text-gray-800">Información General y Ubicación</h3>
                        <NeumorphicInput name="titulo" placeholder="Título (ej: Apartamento en Palermo)" value={formData.titulo} onChange={handleChange} required />
                        <NeumorphicInput as="textarea" name="descripcion" placeholder="Descripción detallada de la propiedad" value={formData.descripcion} onChange={handleChange} rows={4} required/>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <NeumorphicInput as="select" name="departamento" value={formData.departamento} onChange={handleChange}>
                                <option value="Caldas">Caldas</option> <option value="Antioquia">Antioquia</option> <option value="Risaralda">Risaralda</option> <option value="Quindío">Quindío</option>
                            </NeumorphicInput>
                            <NeumorphicInput name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} required/>
                            <NeumorphicInput name="barrio_sector" placeholder="Barrio / Sector" value={formData.barrio_sector} onChange={handleChange} required/>
                            <NeumorphicInput name="direccion_completa" placeholder="Dirección Completa (Opcional)" value={formData.direccion_completa} onChange={handleChange} />
                        </div>
                    </NeumorphicCard>
                )}

                {activeTab === 'details' && (
                    <div className="space-y-4 animate-fade-in-scale">
                        <NeumorphicCard className="p-4">
                            <h3 className="font-semibold mb-3">Detalles Comerciales y Técnicos</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <NeumorphicInput as="select" name="tipo_operacion" value={formData.tipo_operacion} onChange={handleChange}><option value="venta">Venta</option><option value="arriendo">Arriendo</option></NeumorphicInput>
                                <NeumorphicInput type="number" name="precio" placeholder="Precio (COP)" value={formData.precio} onChange={handleChange} required/>
                                <NeumorphicInput type="number" name="valor_administracion" placeholder="Valor Administración" value={formData.valor_administracion} onChange={handleChange} />
                                <NeumorphicInput type="number" name="estrato" placeholder="Estrato" value={formData.estrato} onChange={handleChange} />
                                <NeumorphicInput type="number" name="area_construida" placeholder="Área construida (m²)" value={formData.area_construida} onChange={handleChange} />
                                <NeumorphicInput type="number" name="habitaciones" placeholder="Habitaciones" value={formData.habitaciones} onChange={handleChange} />
                                <NeumorphicInput type="number" name="banos_completos" placeholder="Baños" value={formData.banos_completos} onChange={handleChange} />
                                <NeumorphicInput type="number" name="parqueaderos" placeholder="Parqueaderos" value={formData.parqueaderos} onChange={handleChange} />
                                <NeumorphicInput as="select" name="estado_inmueble" value={formData.estado_inmueble} onChange={handleChange}><option value="new">A Estrenar</option><option value="used">Usado</option><option value="remodeled">Remodelado</option><option value="under_construction">En Construcción</option></NeumorphicInput>
                                <NeumorphicInput as="select" name="estado_amoblado" value={formData.estado_amoblado} onChange={handleChange}><option value="sin_amoblar">Sin Amoblar</option><option value="amoblado">Amoblado</option><option value="semi_amoblado">Semi-amoblado</option></NeumorphicInput>
                                <NeumorphicInput as="select" name="tipo_cocina" value={formData.tipo_cocina} onChange={handleChange}><option value="integral">Integral</option><option value="semi_integral">Semi-Integral</option><option value="sencilla">Sencilla</option></NeumorphicInput>
                                <NeumorphicInput as="select" name="tipo_vigilancia" value={formData.tipo_vigilancia} onChange={handleChange}><option value="privada">Privada</option><option value="celador">Celador</option><option value="policia">Policía</option><option value="ninguna">Ninguna</option></NeumorphicInput>
                            </div>
                        </NeumorphicCard>
                         <NeumorphicCard className="p-4">
                            <h3 className="font-semibold mb-3">Características Adicionales</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {featureCheckboxes.map(feature => (
                                     <NeumorphicCheckbox key={feature.name} name={feature.name} label={feature.label} checked={!!formData[feature.name as keyof Property]} onChange={(checked) => handleCheckboxChange(feature.name, checked)}/>
                                ))}
                            </div>
                        </NeumorphicCard>
                    </div>
                )}
                
                {activeTab === 'images' && (
                    <NeumorphicCard className="p-4 animate-fade-in-scale">
                         <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold">Imágenes</h3>
                            <NeumorphicButton type="button" onClick={addImageSlot} className="!px-3 !py-2 flex items-center gap-1 text-sm"><PlusIcon className="w-4 h-4" /> Añadir Imagen</NeumorphicButton>
                        </div>
                        <div className="space-y-4">
                            {formData.imagenes.map((img, index) => (
                                <NeumorphicCard key={img.id} className="p-3 flex flex-col sm:flex-row items-center gap-3">
                                    <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center shadow-inner">
                                        {img.url_imagen ? <img src={img.url_imagen} alt="Vista previa" className="w-full h-full object-cover rounded-lg" /> : <ImagePlaceholderIcon className="w-10 h-10 text-gray-400"/>}
                                    </div>
                                    <div className="flex-grow w-full space-y-2">
                                        {img.uploadMode === 'file' ? (
                                            <input type="file" accept="image/png, image/jpeg, image/webp" onChange={(e) => handleFileChange(index, e)} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"/>
                                        ) : (
                                            <NeumorphicInput type="url" placeholder="https://... URL de la imagen" value={img.url_imagen} onChange={e => handleUrlChange(index, e.target.value)} required />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <NeumorphicButton type="button" onClick={() => handleImageModeToggle(index)} className="!p-2" title={img.uploadMode === 'file' ? 'Usar URL' : 'Subir Archivo'}>
                                            {img.uploadMode === 'file' ? <LinkIcon className="w-4 h-4"/> : <UploadIcon className="w-4 h-4"/>}
                                        </NeumorphicButton>
                                        <button type="button" onClick={() => setPrincipalImage(index)} title="Marcar como principal">
                                            {img.es_principal ? <StarSolidIcon className="w-6 h-6 text-yellow-500" /> : <StarOutlineIcon className="w-6 h-6 text-gray-400"/>}
                                        </button>
                                        <NeumorphicButton type="button" onClick={() => removeImage(index)} className="!p-2 !bg-red-400/80 !text-white" title="Eliminar Imagen">
                                            <TrashIcon className="w-4 h-4" />
                                        </NeumorphicButton>
                                        {img.isUploading && <SpinnerIcon className="w-5 h-5" />}
                                    </div>
                                </NeumorphicCard>
                            ))}
                            {formData.imagenes.length === 0 && <p className="text-sm text-gray-500 text-center py-4">Añade al menos una imagen.</p>}
                        </div>
                    </NeumorphicCard>
                )}

                {activeTab === 'publishing' && (
                     <NeumorphicCard className="p-4 space-y-4 animate-fade-in-scale">
                        <h3 className="font-semibold mb-2 text-gray-800">Estado de Publicación</h3>
                        <p className="text-sm text-gray-600">Controla la visibilidad de esta propiedad en el sitio web público.</p>
                        <NeumorphicInput as="select" name="estado_publicacion" value={formData.estado_publicacion} onChange={handleChange}>
                            <option value="borrador">Borrador (No visible)</option>
                            <option value="publicado">Publicado (Visible)</option>
                            <option value="pausado">Pausado (Oculto temporalmente)</option>
                        </NeumorphicInput>
                        <NeumorphicCheckbox name="es_destacado" label="Marcar como Propiedad Destacada (aparecerá en la página de inicio)" checked={formData.es_destacado} onChange={(checked) => handleCheckboxChange('es_destacado', checked)}/>
                    </NeumorphicCard>
                )}

                <div className="flex justify-end items-center gap-4 pt-4">
                    <NeumorphicButton type="button" onClick={onCancel} disabled={isSaving}>Cancelar</NeumorphicButton>
                    <NeumorphicButton type="submit" className="!bg-[#153B67] !text-white flex items-center gap-2" disabled={isSaving}>
                        {isSaving && <SpinnerIcon className="w-5 h-5" />}
                        {isSaving ? 'Guardando...' : 'Guardar Propiedad'}
                    </NeumorphicButton>
                </div>
            </NeumorphicCard>
        </form>
    );
};

export default PropertyForm;