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
        slogan: '“MÁS QUE PROPIEDADES, CONSTRUIMOS CONFIANZA”',
        hours: 'Lunes a Viernes: 9am - 6pm',
        mission: 'Brindar servicios inmobiliarios integrales y personalizados, promoviendo la excelencia en el trato humano y profesional de nuestros agentes, comprometidos a asesorar y acompañar a nuestros clientes en todas las etapas del proceso, ya sea asesoría, compra, venta o alquiler de propiedades, garantizando la transparencia, confiabilidad y satisfacción en cada transacción.',
        vision: 'Ser la inmobiliaria líder en Manizales y Caldas para el año 2.027 y reconocida a nivel nacional e internacional para el año 2030 por nuestra integridad, innovación y compromiso con la excelencia en el servicio al cliente, contribuyendo al desarrollo Urbano y Rural, sostenible con nuestras comunidades.',
    },
    values: {
        commitment: { name: 'Compromiso', description: 'nos comprometemos a dar lo mejor de nosotros con nuestros clientes y superar sus expectativas en cada interacción.' },
        transparency: { name: 'Transparencia', description: 'actuamos con honestidad y claridad en todas nuestras operaciones y relaciones comerciales.' },
        professionalism: { name: 'Profesionalismo', description: 'actuamos con integridad y ética en todo momento.' },
        collaboration: { name: 'Colaboración', description: 'fomentamos un ambiente donde el trabajo en equipo y el apoyo mutuo es fundamental para nuestro éxito.' },
        innovation: { name: 'Innovación', description: 'Buscamos constantemente nuevas formas de mejorar y adaptarnos a las demandas del mercado.' },
    },
    filter: {
        searchLabel: '¿Qué buscas?',
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
    },
    features: {
        concierge: 'Portería 24h',
        elevator: 'Ascensor',
        pool: 'Piscina',
        gym: 'Gimnasio',
        balcony: 'Balcón',
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
        greeting: '¡Hola! Soy Aura, tu asistente virtual. ¿En qué puedo ayudarte?',
        statusOnline: 'En línea',
        inputPlaceholder: 'Escribe un mensaje...',
        whatsappButton: 'Continuar en WhatsApp',
        openAria: 'Abrir chat',
        closeAria: 'Cerrar chat',
        answers: {
            greeting: '¡Hola! Soy Aura, tu asistente virtual de Osorio & León Group. ¿Cómo puedo ayudarte hoy? Puedes preguntarme sobre nuestros servicios, horarios o cómo contactarnos.',
            services: 'Ofrecemos servicios de venta, arrendamiento, administración y avalúos de propiedades. ¿Te gustaría saber más sobre alguno en particular?',
            hours: `Nuestro horario de atención es de Lunes a Viernes, de 9:00 AM a 6:00 PM. ¡Estaremos encantados de atenderte!`,
            contact: `Claro, puedes contactarnos a los teléfonos +57 311 567 3740 o +57 321 278 0607. Para una atención más directa, te recomiendo usar el botón de WhatsApp.`,
            sell: '¡Excelente! Para vender tu propiedad, el primer paso es contactar a uno de nuestros asesores para una valoración. Puedes iniciar el proceso a través de nuestro WhatsApp.',
            rent: 'Si buscas una propiedad para arrendar, puedes usar los filtros en nuestra página para ver las opciones disponibles. Si quieres que te ayudemos a arrendar tu propiedad, contáctanos por WhatsApp.',
            thanks: '¡Con mucho gusto! Si tienes alguna otra pregunta, no dudes en consultarme.',
            default: 'Entendido. Para una atención más personalizada, te invito a continuar la conversación con uno de nuestros asesores por WhatsApp.'
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
        hours: 'Monday to Friday: 9am - 6pm',
        mission: 'To provide comprehensive and personalized real estate services, promoting excellence in the human and professional treatment of our agents, committed to advising and accompanying our clients in all stages of the process, whether it be consulting, buying, selling, or renting properties, ensuring transparency, reliability, and satisfaction in every transaction.',
        vision: 'To be the leading real estate agency in Manizales and Caldas by the year 2027 and recognized nationally and internationally by 2030 for our integrity, innovation, and commitment to excellence in customer service, contributing to sustainable Urban and Rural development with our communities.',
    },
    values: {
        commitment: { name: 'Commitment', description: 'We are committed to giving our best to our clients and exceeding their expectations in every interaction.' },
        transparency: { name: 'Transparency', description: 'We act with honesty and clarity in all our operations and business relationships.' },
        professionalism: { name: 'Professionalism', description: 'We act with integrity and ethics at all times.' },
        collaboration: { name: 'Collaboration', description: 'We foster an environment where teamwork and mutual support are fundamental to our success.' },
        innovation: { name: 'Innovation', description: 'We constantly seek new ways to improve and adapt to the demands of the market.' },
    },
    filter: {
        searchLabel: 'What are you looking for?',
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
    },
    features: {
        concierge: '24h Concierge',
        elevator: 'Elevator',
        pool: 'Pool',
        gym: 'Gym',
        balcony: 'Balcony',
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
        greeting: 'Hello! I am Aura, your virtual assistant. How can I help you?',
        statusOnline: 'Online',
        inputPlaceholder: 'Type a message...',
        whatsappButton: 'Continue on WhatsApp',
        openAria: 'Open chat',
        closeAria: 'Close chat',
        answers: {
            greeting: 'Hi! I am Aura, your virtual assistant from Osorio & León Group. How can I help you today? You can ask me about our services, hours, or how to contact us.',
            services: 'We offer services for property sales, leasing, management, and appraisals. Would you like to know more about any in particular?',
            hours: `Our business hours are Monday to Friday, from 9:00 AM to 6:00 PM. We'll be happy to assist you!`,
            contact: `Of course, you can reach us at +57 311 567 3740 or +57 321 278 0607. For more direct attention, I recommend using the WhatsApp button.`,
            sell: 'Excellent! To sell your property, the first step is to contact one of our advisors for a valuation. You can start the process through our WhatsApp.',
            rent: 'If you are looking for a property to rent, you can use the filters on our page to see the available options. If you want us to help you rent out your property, contact us via WhatsApp.',
            thanks: 'You\'re welcome! If you have any other questions, feel free to ask.',
            default: 'Understood. For more personalized assistance, I invite you to continue the conversation with one of our advisors on WhatsApp.'
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