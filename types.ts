
export interface Imagen {
  id: string;
  url_imagen: string;
  alt_text?: string;
  es_principal: boolean;
}

export interface Property {
  id:string;
  titulo: string;
  descripcion: string;
  
  // Location
  departamento?: string;
  ciudad: string;
  barrio_sector: string;
  direccion_completa?: string;
  estrato?: number;
  
  // Types
  tipo_operacion: 'venta' | 'arriendo';
  tipo_propiedad: 'apartamento' | 'casa' | 'oficina' | 'lote' | 'local' | 'finca';

  // Price
  precio: number;
  valor_administracion?: number;
  es_negociable: boolean;
  
  // Basic Features
  area_construida?: number;
  habitaciones?: number;
  banos_completos?: number;
  parqueaderos?: number;
  estado_inmueble?: 'new' | 'used' | 'remodeled' | 'under_construction';
  estado_amoblado: 'amoblado' | 'sin_amoblar' | 'semi_amoblado';

  // Extra Features (booleans for filtering)
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
  
  // Media
  imagenes: Imagen[];
  
  // Metadata
  es_destacado: boolean;
  estado_publicacion: 'publicado' | 'borrador' | 'pausado';
  fecha_publicacion: string; // ISO date string

  // Indexable signature for extras filtering
  [key: string]: any;
}

export interface Filters {
  searchTerm: string;
  codigo_inmueble: string;
  tipo_operacion: 'todos' | 'venta' | 'arriendo';
  tipo_propiedad: 'todos' | 'apartamento' | 'casa' | 'oficina' | 'lote' | 'local' | 'finca';
  precio_min: number;
  precio_max: number;
  area_min: number;
  area_max: number;
  habitaciones: 'any' | string;
  banos: 'any' | string;
  parqueaderos: 'any' | string;
  extras: string[];
  estrato_min: number;
  estrato_max: number;
  estado_inmueble: 'any' | 'new' | 'used' | 'remodeled' | 'under_construction';
  estado_amoblado: 'any' | 'amoblado' | 'sin_amoblar' | 'semi_amoblado';
  departamento: string;
  barrio: string;
}

export interface Testimonial {
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}