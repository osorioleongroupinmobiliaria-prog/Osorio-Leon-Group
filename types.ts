
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
  ciudad: string;
  barrio_sector: string;
  direccion_completa?: string;
  
  // Types
  tipo_operacion: 'venta' | 'arriendo';
  tipo_propiedad: 'apartamento' | 'casa' | 'oficina' | 'lote' | 'local' | 'finca';

  // Price
  precio: number;
  es_negociable: boolean;
  
  // Basic Features
  area_construida?: number;
  habitaciones?: number;
  banos_completos?: number;
  parqueaderos?: number;
  
  // Extra Features (booleans for filtering)
  tiene_balcon: boolean;
  tiene_gimnasio: boolean;
  tiene_piscina_comun: boolean;
  tiene_ascensor: boolean;
  tiene_porteria_24h: boolean;
  
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
}

export interface Testimonial {
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}
