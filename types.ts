// FIX: Replaced incorrect file content with proper type definitions to resolve import errors across the application.
export interface Imagen {
  id: string;
  url_imagen: string;
  es_principal: boolean;
  alt_text?: string;
}

export type OperationType = 'venta' | 'arriendo';
export type PropertyType = 'apartamento' | 'casa' | 'oficina' | 'local' | 'lote' | 'finca';
export type PropertyState = 'new' | 'used' | 'remodeled' | 'under_construction';
export type FurnishedState = 'sin_amoblar' | 'amoblado' | 'semi_amoblado';
export type PublicationStatus = 'publicado' | 'borrador' | 'pausado';
export type KitchenType = 'integral' | 'semi_integral' | 'sencilla';
export type SurveillanceType = 'celador' | 'privada' | 'policia' | 'ninguna';


export interface Property {
  id: string;
  titulo: string;
  descripcion: string;
  departamento?: string;
  ciudad: string;
  barrio_sector: string;
  direccion_completa?: string;
  estrato?: number;
  tipo_operacion: OperationType;
  tipo_propiedad: PropertyType;
  precio: number;
  valor_administracion?: number;
  es_negociable: boolean;
  area_construida?: number;
  habitaciones?: number;
  banos_completos?: number;
  parqueaderos?: number;
  estado_inmueble: PropertyState;
  estado_amoblado: FurnishedState;
  tiene_balcon: boolean;
  tiene_gimnasio: boolean;
  tiene_piscina_comun: boolean;
  tiene_ascensor: boolean;
  tiene_porteria_24h: boolean;
  tiene_zonas_verdes: boolean;
  tiene_cancha_futbol: boolean;
  tiene_kiosko_asados: boolean;
  tiene_salon_social: boolean;
  tiene_juegos_infantiles: boolean;
  tiene_sendero_peatonal: boolean;
  imagenes: Imagen[];
  es_destacado: boolean;
  estado_publicacion: PublicationStatus;
  fecha_publicacion: string;
  // Newly added properties
  tiene_comedor: boolean;
  tipo_cocina?: KitchenType;
  tipo_vigilancia?: SurveillanceType;
  tiene_gas_domiciliario: boolean;
  tiene_vidrio_templado: boolean;
  tiene_reja: boolean;
  tiene_puerta_tradicional: boolean;
  [key: string]: any;
}

export interface Filters {
  searchTerm: string;
  tipo_operacion: 'todos' | OperationType;
  tipo_propiedad: 'todos' | PropertyType;
  precio_min: number;
  precio_max: number;
  area_min: number;
  area_max: number;
  habitaciones: string;
  banos: string;
  parqueaderos: string;
  extras: string[];
  estrato_min: number;
  estrato_max: number;
  estado_inmueble: 'any' | PropertyState;
  estado_amoblado: 'any' | FurnishedState;
  departamento: string;
  barrio?: string;
  codigo_inmueble?: string;
  tipo_cocina: 'any' | KitchenType;
  tipo_vigilancia: 'any' | SurveillanceType;
}

export interface Testimonial {
  name: string;
  rating: number;
  comment: string;
  avatar: string;
  commentKey?: string;
}