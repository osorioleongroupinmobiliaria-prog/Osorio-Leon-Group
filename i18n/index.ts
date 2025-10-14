import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

// Language definitions
export type Language = 'es' | 'en';
export const LANGUAGES: Record<Language, string> = {
  es: 'Español',
  en: 'English',
};
export const DEFAULT_LANGUAGE: Language = 'es';

// Helper to replace placeholders like {title}
const interpolate = (str: string, values: Record<string, any>): string => {
    return str.replace(/\{(\w+)\}/g, (placeholder, key) => {
        return values[key] !== undefined ? values[key] : placeholder;
    });
};

// Translations structure
const translations: Record<Language, any> = {
  es: {
    nav: {
      home: 'Inicio',
      properties: 'Propiedades',
      about: 'Nosotros',
      contact: 'Contacto',
    },
    hero: {
      title: {
        line1: "Tu Hogar y Tu Inversión,",
        line2: "Nuestra Prioridad"
      },
      button: 'Ver Propiedades',
    },
    company: {
        slogan: '“MAS QUE PROPIEDADES, CONSTRUIMOS CONFIANZA”',
        hours: 'Lunes a Viernes: 8am - 12pm y 2pm - 6pm. Sábados: 9am - 12pm',
        mission: 'Brindar servicios inmobiliarios integrales y personalizados, promoviendo la excelencia en el trato humano y profesional de nuestros agentes, comprometidos a asesorar y acompañar a nuestros clientes en todas las etapas del proceso, ya sea asesoría, compra, venta o alquiler de propiedades, garantizando la transparencia, confiabilidad y satisfacción en cada transacción.',
        vision: 'Ser la inmobiliaria líder en Manizales y Caldas para el año 2.027 y reconocida a nivel nacional e internacional para el año 2030 por nuestra integridad, innovación y compromiso con la excelencia en el servicio al cliente, contribuyendo al desarrollo Urbano y Rural, sostenible con nuestras comunidades.',
    },
    values: {
        commitment: { name: 'Compromiso', description: 'Dedicamos nuestro máximo esfuerzo para superar las expectativas de nuestros clientes en cada interacción, garantizando su total satisfacción.' },
        transparency: { name: 'Transparencia', description: 'Garantizamos honestidad y claridad en cada una de nuestras operaciones y relaciones comerciales, construyendo una base de confianza sólida.' },
        professionalism: { name: 'Profesionalismo', description: 'Mantenemos los más altos estándares de integridad y ética en cada aspecto de nuestro trabajo, asegurando un servicio experto y confiable.' },
        collaboration: { name: 'Colaboración', description: 'Promovemos un entorno de trabajo en equipo y apoyo mutuo, convencidos de que la sinergia es la clave para alcanzar resultados extraordinarios.' },
        innovation: { name: 'Innovación', description: 'Adoptamos un enfoque proactivo en la búsqueda de soluciones creativas y eficientes, anticipándonos a las tendencias del mercado para ofrecer siempre un valor agregado.' },
    },
    filter: {
        searchPlaceholder: 'Ciudad, barrio o palabra clave...',
        moreFiltersButton: 'Búsqueda Avanzada',
        modalTitle: 'Filtros Avanzados',
        roomsAndSpaces: 'Habitaciones y Espacios',
        applyButton: 'Mostrar {count} propiedades',
        keywordLabel: 'Ciudad o Barrio',
        operationLabel: 'Tipo de Operación',
        propertyTypeLabel: 'Tipo de Inmueble',
        bedrooms: 'Habitaciones',
        bathrooms: 'Baños',
        parking: 'Parqueaderos',
        priceRange: 'Rango de Precios (COP)',
        priceMin: 'Mínimo',
        priceMax: 'Máximo',
        otherFeatures: 'Otras Características',
        clearButton: 'Limpiar',
        any: 'Cualquiera',
        operation: { all: 'Venta o Arriendo', sale: 'Venta', rent: 'Arriendo' },
        propertyType: { all: 'Todos', apartment: 'Apartamento', house: 'Casa', office: 'Oficina', commercial: 'Local', lot: 'Lote', farm: 'Finca' },
        propertyCodeLabel: 'Código',
        propertyCodePlaceholder: 'Ej: Manizales, Palermo...',
        socioeconomicStratum: 'Estrato Socioeconómico',
        stratumMin: 'Mín.',
        stratumMax: 'Máx.',
        propertyState: 'Estado del Inmueble',
        state: {
            all: 'Cualquiera',
            new: 'A Estrenar',
            used: 'Usado',
            remodeled: 'Remodelado',
            under_construction: 'En Construcción',
        },
        location: 'Ubicación',
        departmentLabel: 'Departamento',
        neighborhoodLabel: 'Barrio/Sector (Avanzado)',
        neighborhoodPlaceholder: 'Escribe un barrio específico...',
        department: {
            all: 'Todos los departamentos',
            caldas: 'Caldas',
            antioquia: 'Antioquia',
            risaralda: 'Risaralda',
            quindio: 'Quindío',
        },
        kitchenType: 'Tipo de Cocina',
        surveillanceType: 'Tipo de Vigilancia',
    },
    surveillance: {
      any: 'Cualquiera',
      sin_vigilancia: 'Sector Sin Vigilancia',
      cuadrante_policia: 'Cuadrante de Policía',
      privada: 'Vigilancia Privada',
      pasa_policia: 'Pasa Policía Constantemente',
      sector_vigilado: 'Sector Vigilado por Policía',
    },
    kitchen: {
        any: 'Cualquiera',
        integral: 'Integral',
        sencilla: 'Sencilla',
        no_tiene: 'No tiene',
    },
    features: {
        kitchenIntegral: 'Cocina Integral',
        kitchenSimple: 'Cocina Sencilla',
        diningRoom: 'Comedor',
        gas: 'Gas Domiciliario',
        concierge: 'Portería 24h',
        elevator: 'Ascensor',
        pool: 'Piscina',
        gym: 'Gimnasio',
        balcony: 'Balcón',
        greenAreas: 'Zonas Verdes',
        soccerField: 'Cancha de Fútbol',
        bbqKiosk: 'Kiosko Asados',
        socialRoom: 'Salón Social',
        playground: 'Juegos Infantiles',
        walkingPath: 'Sendero Peatonal',
        temperedGlass: 'Vidrio Templado',
        grille: 'Reja',
        traditionalDoor: 'Puerta Tradicional',
    },
    furnishing: {
        label: 'Estado Amoblado',
        any: 'Cualquiera',
        furnished: 'Amoblado',
        unfurnished: 'Sin Amoblar',
        semi_furnished: 'Semi-amoblado',
    },
    propertyGrid: {
        title: 'Otras Propiedades',
        sortBy: 'Ordenar por',
        sortOptions: {
            relevance: 'Relevancia',
            priceAsc: 'Precio: Menor a Mayor',
            priceDesc: 'Precio: Mayor a Menor',
            areaDesc: 'Área: Mayor a Menor',
        },
        notFound: {
            title: 'No se encontraron propiedades.',
            subtitle: 'Intenta ajustar los filtros para ampliar tu búsqueda.',
        },
    },
    property: {
        operation: { venta: 'Venta', arriendo: 'Arriendo' },
        negotiable: 'Negociable',
        detailsButton: 'Ver Detalles',
        whatsappMessage: 'Hola, me interesa la propiedad: {title}',
    },
    propertyModal: {
        description: 'Descripción',
        negotiable: 'Precio Negociable',
        adminFee: 'de administración',
        bedrooms: 'Habitaciones',
        bathrooms: 'Baños',
        parking: 'Parqueaderos',
        additionalFeatures: 'Características Adicionales',
        contactButton: 'Contactar por WhatsApp',
        whatsappMessage: 'Hola, estoy interesado/a en la propiedad: {title}. ¿Podrían darme más información?',
    },
    about: {
        title: 'Nuestra Identidad',
        subtitle: 'Conoce la filosofía que nos impulsa a construir confianza y a encontrar el lugar perfecto para ti.',
        missionTitle: 'Nuestra Misión',
        visionTitle: 'Nuestra Visión',
        valuesTitle: 'Nuestros Valores',
        imageAlt: 'Equipo Profesional',
    },
    contact: {
        title: 'Ponte en Contacto',
        phones: 'Teléfonos',
        address: 'Dirección',
        hours: 'Horarios de Atención',
        form: {
            title: 'Envíanos un Mensaje',
            namePlaceholder: 'Nombre completo *',
            phonePlaceholder: 'Tu número de teléfono',
            emailPlaceholder: 'Email *',
            messagePlaceholder: 'Mensaje *',
            submitButton: 'Enviar Mensaje',
            subject: {
                general: 'Consulta General',
                sale: 'Interés en Venta',
                rent: 'Interés en Arriendo',
                management: 'Servicio de Administración',
            },
        },
    },
    chatbot: {
        greeting: '¡Hola! Soy Tatiana, tu asistente virtual. ¿En qué puedo ayudarte hoy?',
        statusOnline: 'En línea',
        inputPlaceholder: 'Escribe un mensaje...',
        whatsappButton: 'Continuar en WhatsApp',
        openAria: 'Abrir chat con Tatiana',
        closeAria: 'Cerrar chat con Tatiana',
        answers: {
            greeting: '¡Hola! Soy Tatiana, tu asistente virtual de Osorio & León Group. ¿Cómo puedo ayudarte hoy? Puedes preguntarme sobre nuestros servicios, horarios o cómo contactarnos.',
            servicesOffered: 'Ofrecemos una gama completa de servicios inmobiliarios: arrendamientos, ventas, administración de propiedades, avalúos y asesoramiento en la ciudad de Manizales y todo el Eje Cafetero.',
            hours: `Nuestro horario de atención es de Lunes a Viernes de 8am a 12pm y de 2pm a 6pm, y los Sábados de 9am a 12pm. ¡Estaremos encantados de atenderte!`,
            contactInfo: `Puedes comunicarte con nosotros a los teléfonos: 321 278 0607 o 311 567 3740. Nuestra oficina está en la Oficina 301, Edificio Torre Plaza 62, Calle 62# 23-61. Para una atención más directa, te recomiendo usar el botón de WhatsApp.`,
            sell: '¡Excelente! Para vender tu propiedad, el primer paso es contactar a uno de nuestros asesores para una valoración. Puedes iniciar el proceso a través de nuestro WhatsApp.',
            rent: 'Si buscas una propiedad para arrendar, puedes usar los filtros en nuestra página para ver las opciones disponibles. Si quieres que te ayudemos a arrendar tu propiedad, contáctanos por WhatsApp.',
            thanks: '¡Con mucho gusto! Si tienes alguna otra pregunta, no dudes en consultarme.',
            default: 'Entendido. Para una atención más personalizada y detallada, te invito a continuar la conversación con uno de nuestros asesores expertos por WhatsApp.',
            whoAreYou: 'Somos Osorio & León Group, una agencia inmobiliaria conformada por profesionales idóneos con amplia trayectoria en Manizales y el Eje Cafetero. Nos basamos en la transparencia y confianza, cumpliendo con todos los requisitos legales establecidos por la ley Colombiana.',
            operatingCities: 'Prestamos nuestros servicios principalmente en la ciudad de Manizales y en toda la región del Eje Cafetero.',
            slogan: 'Nuestro lema es: "Más que propiedades, construimos confianza".',
            missionVision: 'Nuestra misión es brindar servicios inmobiliarios integrales y personalizados, y nuestra visión es ser la inmobiliaria líder en la región. Nos guiamos por valores como el compromiso y la transparencia. Puedes leer más en la sección "Nosotros" de nuestra web.',
            adminServiceIncludes: 'Nuestro servicio de administración es muy completo. Incluye:\n- Comercialización y promoción del inmueble.\n- Búsqueda y perfilación de arrendatarios.\n- Elaboración de contratos y inventario digital.\n- Recaudo y pago del canon y administración.\n- Manejo de afianzas y gestión de reparaciones locativas (con tu autorización).\n- ¡Y mucho más para tu tranquilidad!',
            locativeRepairs: 'Realizamos reparaciones locativas con personal idóneo, siempre con la autorización previa y por escrito del propietario.',
            adminFeePayment: 'Sí, como parte de nuestro servicio, nos encargamos del pago mensual de la cuota ordinaria de administración de la copropiedad para evitar cualquier mora.',
            adminServiceFee: 'Nuestros honorarios de administración son del 10% más IVA (19%) sobre el canon mensual y la cuota ordinaria de administración (si aplica).',
            guaranteeFee: 'El valor de la afianza es del 2.5% mensual más IVA sobre el valor del canon, cuota de administración e IVA (si es comercial). Este seguro protege tu renta.',
            paymentSchedule: 'Recibirás el pago de tu arriendo el día 10 de cada mes mediante transferencia electrónica a la cuenta que nos hayas indicado.',
            monthlyDebits: 'Los débitos fijos mensuales que se descuentan de tu pago son nuestros honorarios de administración (10% + IVA) y el valor de la afianza (2.5% + IVA).',
            vatAndRetentions: 'El IVA (para predios comerciales) y las retenciones dependen de la condición tributaria del propietario y arrendatario, y se descuentan del canon antes del pago.',
            docsNaturalPerson: 'Como persona natural, necesitas radicar: Cédula al 150%, RUT, Certificado de Tradición y Libertad (reciente), último impuesto predial, autorización de pago y certificación bancaria, entre otros documentos si es propiedad horizontal.',
            docsLegalEntity: 'Como persona jurídica, necesitas: Certificado de Cámara y Comercio (reciente), Cédula del Representante Legal, RUT, Certificado de Tradición y Libertad, y otros documentos similares a los de persona natural.',
            phoneLinesPolicy: 'No arrendamos propiedades con líneas telefónicas a nombre del propietario. Sugerimos que el arrendatario contrate su propio servicio para evitar inconvenientes.',
            guaranteeStudyPayer: 'El costo del estudio de la documentación en la afianzadora (Datafianza) es asumido por el candidato a arrendatario.',
            rentIncreaseHousing: 'Para vivienda, el incremento anual del canon corresponde al IPC (Índice de Precios al Consumidor) del año anterior, según la Ley 820 de 2003.',
            rentIncreaseCommercial: 'Para locales comerciales, el incremento anual corresponde al IPC del año anterior más los puntos que se hayan pactado en el contrato.',
            adminFeeIncrease: 'La cuota de administración es fijada anualmente por la Asamblea de Copropietarios del edificio o conjunto.',
            taxInfoUpdate: 'Es tu responsabilidad informarnos si hay cambios en tu RUT. Debes enviarnos el documento actualizado para hacer los ajustes necesarios en la facturación.',
            tenantDeath: 'En caso de fallecimiento del arrendatario, los cohabitantes o coarrendatarios son responsables solidarios de cumplir con las obligaciones del contrato.',
            infoForSaleListing: 'Para poner tu inmueble en venta, necesitamos detalles como: Dirección, ficha catastral, área, características (habitaciones, baños, etc.), estado del inmueble y el precio de venta deseado.',
            saleCommission: 'Nuestra comisión estándar por venta es del 3% sobre el precio final de la negociación, o lo que se haya pactado previamente.'
        }
    },
    footer: {
        quickLinks: 'Enlaces Rápidos',
        writeReview: 'Escribe una Reseña',
        contact: 'Contacto',
        copyright: 'Todos los derechos reservados.',
    },
    featuredProperties: {
        title: 'Propiedades Destacadas',
    },
    services: {
        title: 'Nuestros Servicios',
        subtitle: 'Ofrecemos soluciones integrales para todas tus necesidades inmobiliarias.',
        commercialization: 'Comercialización',
        propertyManagement: 'Administración de Propiedades',
        brokerageLeasing: 'Arrendamiento por Corretaje',
        propertySales: 'Venta de Propiedades',
        appraisals: 'Avalúos de Propiedades',
        consulting: 'Consultoría Inmobiliaria',
    },
    offerProperty: {
        title: '¿Busca Vender o Arrendar su Inmueble?',
        subtitle: 'Establecemos relaciones de confianza para conseguir el mejor resultado. Diligencia el formulario y te contactamos en minutos.',
        namePlaceholder: 'Nombre *',
        emailPlaceholder: 'Email *',
        phonePlaceholder: 'Teléfono *',
        detailsPlaceholder: 'Información adicional (tipo de inmueble, ubicación...)',
        submitButton: 'Enviar Formulario',
        imageAlt: 'Agente inmobiliario feliz',
    },
    testimonials: {
        title: 'Lo Que Dicen Nuestros Clientes',
        subtitle: 'La satisfacción de nuestros clientes es nuestra mejor carta de presentación.',
        prev: 'Anterior',
        next: 'Siguiente',
        carlosMendoza: '¡Excelente servicio! El equipo de Osorio & León fue increíblemente profesional y nos ayudó a encontrar la casa de nuestros sueños en tiempo récord. ¡Totalmente recomendados!',
        anaSofiaRestrepo: 'El proceso de venta de mi apartamento fue impecable. Me mantuvieron informada en cada paso y lograron un precio excelente. Mucha transparencia y profesionalismo.',
        javierCorrea: 'Muy buena experiencia arrendando con ellos. El apartaestudio estaba en perfectas condiciones y el trámite fue rápido. Solo un pequeño retraso en la entrega de llaves, pero nada grave.',
        luciaVelez: 'La asesoría que recibí fue de primera. Entendieron perfectamente lo que buscaba y me presentaron opciones que se ajustaban a mi presupuesto. ¡Gracias por su paciencia y dedicación!',
        ricardoPalacio: 'Buen servicio en general. La gestión de los documentos fue eficiente. Me hubiera gustado tener un poco más de opciones para visitar, pero quedé satisfecho con la compra final.',
        isabellaGiraldo: '¡La mejor inmobiliaria de Manizales! Su conocimiento del mercado es impresionante. Me ayudaron a hacer una inversión muy inteligente. ¡Mil gracias!',
        mateoArango: 'Pusieron mi finca en arriendo y en menos de un mes ya tenía inquilinos. El proceso de selección fue muy riguroso, lo que me dio mucha tranquilidad. Los recomiendo.',
        valentinaHoyos: 'Desde el primer contacto hasta la firma de las escrituras, el acompañamiento fue constante y muy profesional. Resolvieron todas mis dudas. ¡Un equipo de 10!',
        andresCastano: 'El proceso fue correcto y se cumplió con lo pactado. El agente fue muy amable, aunque a veces un poco difícil de contactar. Pero en general, una buena experiencia.',
        danielaFranco: 'Si buscan confianza y seriedad, Osorio & León es el lugar indicado. Compré mi primer apartamento con ellos y la experiencia fue maravillosa. ¡Gracias por todo!',
    },
    visitorNotification: {
        message: 'personas están viendo esta página.',
        closeAria: 'Cerrar notificación',
    },
    partners: {
        title: 'Nuestros Aliados Estratégicos',
    }
  },
  en: {
    nav: {
      home: 'Home',
      properties: 'Properties',
      about: 'About Us',
      contact: 'Contact',
    },
    hero: {
      title: {
        line1: "Your Home and Your Investment,",
        line2: "Our Priority"
      },
      button: 'View Properties',
    },
    company: {
        slogan: '"MORE THAN PROPERTIES, WE BUILD TRUST"',
        hours: 'Monday to Friday: 8am - 12pm & 2pm - 6pm. Saturdays: 9am - 12pm',
        mission: 'To provide comprehensive and personalized real estate services, promoting excellence in the human and professional treatment of our agents, committed to advising and accompanying our clients in all stages of the process, whether it be consulting, buying, selling, or renting properties, ensuring transparency, reliability, and satisfaction in every transaction.',
        vision: 'To be the leading real estate agency in Manizales and Caldas by the year 2027 and recognized nationally and internationally by 2030 for our integrity, innovation, and commitment to excellence in customer service, contributing to sustainable Urban and Rural development with our communities.',
    },
    values: {
        commitment: { name: 'Commitment', description: 'We dedicate our utmost effort to exceed our clients\' expectations in every interaction, ensuring their complete satisfaction.' },
        transparency: { name: 'Transparency', description: 'We ensure honesty and clarity in all our operations and business relationships, building a solid foundation of trust.' },
        professionalism: { name: 'Professionalism', description: 'We uphold the highest standards of integrity and ethics in every aspect of our work, ensuring expert and reliable service.' },
        collaboration: { name: 'Collaboration', description: 'We foster a collaborative environment of teamwork and mutual support, convinced that synergy is the key to achieving extraordinary results.' },
        innovation: { name: 'Innovation', description: 'We proactively seek creative and efficient solutions, anticipating market trends to consistently deliver added value.' },
    },
    filter: {
        searchPlaceholder: 'City, neighborhood or keyword...',
        moreFiltersButton: 'Advanced Search',
        modalTitle: 'Advanced Filters',
        roomsAndSpaces: 'Rooms and Spaces',
        applyButton: 'Show {count} properties',
        keywordLabel: 'City or Neighborhood',
        operationLabel: 'Operation Type',
        propertyTypeLabel: 'Property Type',
        bedrooms: 'Bedrooms',
        bathrooms: 'Bathrooms',
        parking: 'Parking',
        priceRange: 'Price Range (COP)',
        priceMin: 'Minimum',
        priceMax: 'Maximum',
        otherFeatures: 'Other Features',
        clearButton: 'Clear',
        any: 'Any',
        operation: { all: 'Sale or Rent', sale: 'Sale', rent: 'Rent' },
        propertyType: { all: 'All', apartment: 'Apartment', house: 'House', office: 'Office', commercial: 'Commercial', lot: 'Lot', farm: 'Farm' },
        propertyCodeLabel: 'Code',
        propertyCodePlaceholder: 'E.g: Manizales, Palermo...',
        socioeconomicStratum: 'Socioeconomic Stratum',
        stratumMin: 'Min',
        stratumMax: 'Max',
        propertyState: 'Property State',
        state: {
            all: 'Any',
            new: 'Brand New',
            used: 'Used',
            remodeled: 'Remodeled',
            under_construction: 'Under Construction',
        },
        location: 'Location',
        departmentLabel: 'Department',
        neighborhoodLabel: 'Neighborhood/Sector (Advanced)',
        neighborhoodPlaceholder: 'Type a specific neighborhood...',
        department: {
            all: 'All departments',
            caldas: 'Caldas',
            antioquia: 'Antioquia',
            risaralda: 'Risaralda',
            quindio: 'Quindío',
        },
        kitchenType: 'Kitchen Type',
        surveillanceType: 'Surveillance Type',
    },
    surveillance: {
      any: 'Any',
      sin_vigilancia: 'Unsecured Sector',
      cuadrante_policia: 'Police Quadrant',
      privada: 'Private Security',
      pasa_policia: 'Police Patrols Frequently',
      sector_vigilado: 'Sector Watched by Police',
    },
    kitchen: {
        any: 'Any',
        integral: 'Full',
        sencilla: 'Simple',
        no_tiene: 'None',
    },
    features: {
        kitchenIntegral: 'Full Kitchen',
        kitchenSimple: 'Simple Kitchen',
        diningRoom: 'Dining Room',
        gas: 'Domestic Gas',
        concierge: '24h Concierge',
        elevator: 'Elevator',
        pool: 'Pool',
        gym: 'Gym',
        balcony: 'Balcony',
        greenAreas: 'Green Areas',
        soccerField: 'Soccer Field',
        bbqKiosk: 'BBQ Kiosk',
        socialRoom: 'Social Room',
        playground: 'Playground',
        walkingPath: 'Walking Path',
        temperedGlass: 'Tempered Glass',
        grille: 'Grille',
        traditionalDoor: 'Traditional Door',
    },
    furnishing: {
        label: 'Furnishing State',
        any: 'Any',
        furnished: 'Furnished',
        unfurnished: 'Unfurnished',
        semi_furnished: 'Semi-furnished',
    },
    propertyGrid: {
        title: 'Other Properties',
        sortBy: 'Sort by',
        sortOptions: {
            relevance: 'Relevance',
            priceAsc: 'Price: Low to High',
            priceDesc: 'Price: High to Low',
            areaDesc: 'Area: High to Low',
        },
        notFound: {
            title: 'No properties found.',
            subtitle: 'Try adjusting the filters to broaden your search.',
        },
    },
     property: {
        operation: { venta: 'Sale', arriendo: 'Rent' },
        negotiable: 'Negotiable',
        detailsButton: 'View Details',
        whatsappMessage: 'Hello, I am interested in the property: {title}',
    },
    propertyModal: {
        description: 'Description',
        negotiable: 'Price Negotiable',
        adminFee: 'admin fee',
        bedrooms: 'Bedrooms',
        bathrooms: 'Bathrooms',
        parking: 'Parking spaces',
        additionalFeatures: 'Additional Features',
        contactButton: 'Contact via WhatsApp',
        whatsappMessage: 'Hello, I am interested in the property: {title}. Could you give me more information?',
    },
    about: {
        title: 'Our Identity',
        subtitle: 'Learn about the philosophy that drives us to build trust and find the perfect place for you.',
        missionTitle: 'Our Mission',
        visionTitle: 'Our Vision',
        valuesTitle: 'Our Values',
        imageAlt: 'Professional Team',
    },
    contact: {
        title: 'Get in Touch',
        phones: 'Phones',
        address: 'Address',
        hours: 'Opening Hours',
        form: {
            title: 'Send us a Message',
            namePlaceholder: 'Full name *',
            phonePlaceholder: 'Your phone number',
            emailPlaceholder: 'Email *',
            messagePlaceholder: 'Message *',
            submitButton: 'Send Message',
            subject: {
                general: 'General Inquiry',
                sale: 'Interest in Selling',
                rent: 'Interest in Renting',
                management: 'Management Service',
            },
        },
    },
     chatbot: {
        greeting: 'Hello! I am Tatiana, your virtual assistant. How can I help you today?',
        statusOnline: 'Online',
        inputPlaceholder: 'Type a message...',
        whatsappButton: 'Continue on WhatsApp',
        openAria: 'Open chat with Tatiana',
        closeAria: 'Close chat with Tatiana',
        answers: {
            greeting: 'Hi! I am Tatiana, your virtual assistant from Osorio & León Group. How can I help you today? You can ask me about our services, hours, or how to contact us.',
            servicesOffered: 'We offer a full range of real estate services: rentals, sales, property management, appraisals, and consulting in the city of Manizales and throughout the Coffee Axis region.',
            hours: `Our business hours are Monday to Friday from 8am to 12pm & 2pm to 6pm, and Saturdays from 9am to 12pm. We'll be happy to assist you!`,
            contactInfo: `You can reach us at +57 321 278 0607 or +57 311 567 3740. Our office is at Office 301, Torre Plaza 62 Building, Calle 62# 23-61. For more direct assistance, I recommend using the WhatsApp button.`,
            sell: 'Excellent! To sell your property, the first step is to contact one of our advisors for a valuation. You can start the process through our WhatsApp.',
            rent: 'If you are looking for a property to rent, you can use the filters on our page to see the available options. If you want us to help you rent out your property, contact us via WhatsApp.',
            thanks: 'You\'re welcome! If you have any other questions, feel free to ask.',
            default: 'Understood. For more personalized and detailed assistance, I invite you to continue the conversation with one of our expert advisors on WhatsApp.',
            whoAreYou: 'We are Osorio & León Group, a real estate agency composed of suitable professionals with extensive experience in Manizales and the Coffee Axis. We are based on transparency and trust, complying with all legal requirements established by Colombian law.',
            operatingCities: 'We primarily provide our services in the city of Manizales and throughout the Coffee Axis region.',
            slogan: 'Our slogan is: "More than properties, we build trust."',
            missionVision: 'Our mission is to provide comprehensive and personalized real estate services, and our vision is to be the leading real estate agency in the region. We are guided by values such as commitment and transparency. You can read more in the "About Us" section of our website.',
            adminServiceIncludes: 'Our management service is very comprehensive. It includes:\n- Property marketing and promotion.\n- Tenant search and screening.\n- Contract preparation and digital inventory.\n- Rent and administration fee collection and payment.\n- Management of guarantees and handling of locative repairs (with your authorization).\n- And much more for your peace of mind!',
            locativeRepairs: 'We carry out locative repairs with qualified personnel, always with the prior written authorization of the owner.',
            adminFeePayment: 'Yes, as part of our service, we handle the monthly payment of the ordinary administration fee for the co-ownership to avoid any arrears.',
            adminServiceFee: 'Our administration fees are 10% plus VAT (19%) on the monthly rent and the ordinary administration fee (if applicable).',
            guaranteeFee: 'The value of the guarantee is 2.5% per month plus VAT on the value of the rent, administration fee, and VAT (if commercial). This insurance protects your income.',
            paymentSchedule: 'You will receive your rent payment on the 10th of each month via electronic transfer to the account you have indicated.',
            monthlyDebits: 'The fixed monthly debits deducted from your payment are our administration fees (10% + VAT) and the guarantee fee (2.5% + VAT).',
            vatAndRetentions: 'VAT (for commercial properties) and retentions depend on the tax status of the owner and tenant, and are deducted from the rent before payment.',
            docsNaturalPerson: 'As a natural person, you need to submit: ID at 150%, RUT, Certificate of Title and Freedom (recent), last property tax bill, payment authorization, and bank certification, among other documents if it is a horizontal property.',
            docsLegalEntity: 'As a legal entity, you need: Certificate of Chamber of Commerce (recent), CEO\'s ID, RUT, Certificate of Title and Freedom, and other documents similar to those for a natural person.',
            phoneLinesPolicy: 'We do not rent properties with telephone lines in the owner\'s name. We suggest that the tenant contracts their own service to avoid issues.',
            guaranteeStudyPayer: 'The cost of the documentation study by the guarantor (Datafianza) is borne by the prospective tenant.',
            rentIncreaseHousing: 'For residential housing, the annual rent increase corresponds to the CPI (Consumer Price Index) of the previous year, according to Law 820 of 2003.',
            rentIncreaseCommercial: 'For commercial premises, the annual increase corresponds to the previous year\'s CPI plus any points agreed upon in the contract.',
            adminFeeIncrease: 'The administration fee is set annually by the Co-owners\' Assembly of the building or complex.',
            taxInfoUpdate: 'It is your responsibility to inform us of any changes to your RUT. You must send us the updated document to make the necessary adjustments to billing.',
            tenantDeath: 'In the event of the tenant\'s death, the cohabitants or co-lessees are jointly responsible for fulfilling the contract obligations.',
            infoForSaleListing: 'To list your property for sale, we need details such as: Address, cadastral record, area, features (bedrooms, bathrooms, etc.), condition of the property, and the desired sale price.',
            saleCommission: 'Our standard sales commission is 3% of the final negotiation price, or as previously agreed.'
        }
    },
    footer: {
        quickLinks: 'Quick Links',
        writeReview: 'Write a Review',
        contact: 'Contact',
        copyright: 'All rights reserved.',
    },
    featuredProperties: {
        title: 'Featured Properties',
    },
    services: {
        title: 'Our Services',
        subtitle: 'We offer comprehensive solutions for all your real estate needs.',
        commercialization: 'Commercialization',
        propertyManagement: 'Property Management',
        brokerageLeasing: 'Brokerage Leasing',
        propertySales: 'Property Sales',
        appraisals: 'Property Appraisals',
        consulting: 'Real Estate Consulting',
    },
    offerProperty: {
        title: 'Looking to Sell or Rent Your Property?',
        subtitle: 'We build relationships of trust to achieve the best results. Fill out the form, and we will contact you in minutes.',
        namePlaceholder: 'Name *',
        emailPlaceholder: 'Email *',
        phonePlaceholder: 'Phone *',
        detailsPlaceholder: 'Additional information (property type, location...)',
        submitButton: 'Send Form',
        imageAlt: 'Happy real estate agent',
    },
    testimonials: {
        title: 'What Our Clients Say',
        subtitle: 'Our clients\' satisfaction is our best endorsement.',
        prev: 'Previous',
        next: 'Next',
        carlosMendoza: 'Excellent service! The Osorio & León team was incredibly professional and helped us find our dream home in record time. Totally recommended!',
        anaSofiaRestrepo: 'The process of selling my apartment was flawless. They kept me informed every step of the way and got an excellent price. A lot of transparency and professionalism.',
        javierCorrea: 'Very good experience renting with them. The studio apartment was in perfect condition and the process was fast. Just a small delay in handing over the keys, but nothing serious.',
        luciaVelez: 'The advice I received was first-class. They understood perfectly what I was looking for and presented options that fit my budget. Thank you for your patience and dedication!',
        ricardoPalacio: 'Good service overall. The document management was efficient. I would have liked to have a few more options to visit, but I was satisfied with the final purchase.',
        isabellaGiraldo: 'The best real estate agency in Manizales! Their market knowledge is impressive. They helped me make a very smart investment. Thank you so much!',
        mateoArango: 'They listed my farm for rent and had tenants in less than a month. The selection process was very rigorous, which gave me a lot of peace of mind. I recommend them.',
        valentinaHoyos: 'From the first contact to the signing of the deeds, the support was constant and very professional. They answered all my questions. A team of 10!',
        andresCastano: 'The process was correct and everything went as agreed. The agent was very friendly, although sometimes a bit difficult to reach. But overall, a good experience.',
        danielaFranco: 'If you are looking for trust and reliability, Osorio & León is the right place. I bought my first apartment with them and the experience was wonderful. Thanks for everything!',
    },
    visitorNotification: {
        message: 'people are viewing this page.',
        closeAria: 'Close notification',
    },
    partners: {
        title: 'Our Strategic Partners',
    }
  }
};


// Helper to get nested keys
const getNestedTranslation = (lang: Language, key: string): string | undefined => {
    return key.split('.').reduce((obj, k) => (obj && obj[k] !== undefined) ? obj[k] : undefined, translations[lang]);
};


// Context
interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, values?: Record<string, any>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Provider
export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
        const browserLang = window.navigator.language.split('-')[0] as Language;
        return LANGUAGES[browserLang] ? browserLang : DEFAULT_LANGUAGE;
    });

    const t = useMemo(() => (key: string, values?: Record<string, any>): string => {
        let translated = getNestedTranslation(language, key);
        if (typeof translated !== 'string') {
            console.warn(`Translation key "${key}" not found for language "${language}". Falling back to default.`);
            translated = getNestedTranslation(DEFAULT_LANGUAGE, key);
             if (typeof translated !== 'string') {
                return key;
            }
        }

        if (values) {
            return interpolate(translated, values);
        }

        return translated;
    }, [language]);

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    // FIX: Replaced JSX with React.createElement because this is a .ts file, not a .tsx file.
    // JSX syntax is invalid in .ts files and causes the TypeScript compiler to fail with parsing errors.
    return React.createElement(I18nContext.Provider, { value: { language, setLanguage, t } }, children);
};

// Hook
export const useI18n = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};