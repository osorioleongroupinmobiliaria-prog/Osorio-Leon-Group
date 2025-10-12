

import type { Property, Testimonial } from './types';

export const COMPANY_INFO = {
  name: 'Osorio & León Group S.A.S',
  sloganKey: 'company.slogan',
  logoUrl: 'https://lh3.googleusercontent.com/pw/AP1GczPVONrjfngMlSIYlLwGZZDIvf4Pg4B2bslt8wiiKOb2zg2Eay0bE93XxfLPlc0TShZzDAKzJ1fe9lIBIODXFeYNUtrn3oBds3GkFZHU1KUWo6xHp9yR_3VuU4zXWRebD4A1NFS7YumdjiBdVuUyKG8=w500-h500-s-no-gm',
  address: 'Manizales, Caldas, Colombia',
  registrationNumber: 'Matricula Arrendador S-MAT-SINT-USC 2025-7',
  phones: ['+57 311 567 3740', '+57 321 278 0607'],
  email: 'osorioyleongroupdigital@gmail.com',
  hoursKey: 'company.hours',
  missionKey: 'company.mission',
  visionKey: 'company.vision',
  values: [
    { nameKey: 'values.commitment.name', descriptionKey: 'values.commitment.description' },
    { nameKey: 'values.transparency.name', descriptionKey: 'values.transparency.description' },
    { nameKey: 'values.professionalism.name', descriptionKey: 'values.professionalism.description' },
    { nameKey: 'values.collaboration.name', descriptionKey: 'values.collaboration.description' },
    { nameKey: 'values.innovation.name', descriptionKey: 'values.innovation.description' },
  ],
};

export const SOCIAL_LINKS: { [key: string]: string } = {
  whatsapp1: 'https://wa.me/573115673740',
  whatsapp2: 'https://wa.me/573212780607',
  facebook: 'https://www.facebook.com/inmobiliariaenmanizales',
  instagram: 'https://www.instagram.com/osorioyleongroup',
  youtube: 'https://www.youtube.com/@OSORIOYLEONGROUP',
  tiktok: 'https://www.tiktok.com/@osorioyleongroup',
  reviews: 'https://g.page/r/CXOeo9LDDy8BEBM/review',
  googleMaps: "https://www.google.com/maps/place/5%C2%B003'31.3%22N+75%C2%B029'15.3%22W/@5.0586957,-75.488227,19z/data=!3m1!4b1!4m4!3m3!8m2!3d5.0586944!4d-75.4875833?entry=ttu&g_ep=EgoyMDI1MDkyOS4wIKXMDSoASAFQAw%3D%3D",
};

// FIX: Added parentheses around the intersection type to ensure it's an array of the combined type,
// not an intersection of a type and an array type.
export const TESTIMONIALS: (Omit<Testimonial, 'comment'> & { commentKey: string })[] = [
  {
    name: 'Carlos Mendoza',
    rating: 5,
    commentKey: 'testimonials.carlosMendoza',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Ana Sofía Restrepo',
    rating: 5,
    commentKey: 'testimonials.anaSofiaRestrepo',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Javier Correa',
    rating: 4.5,
    commentKey: 'testimonials.javierCorrea',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
  {
    name: 'Lucía Vélez',
    rating: 5,
    commentKey: 'testimonials.luciaVelez',
    avatar: 'https://randomuser.me/api/portraits/women/31.jpg',
  },
  {
    name: 'Ricardo Palacio',
    rating: 4,
    commentKey: 'testimonials.ricardoPalacio',
    avatar: 'https://randomuser.me/api/portraits/men/60.jpg',
  },
  {
    name: 'Isabella Giraldo',
    rating: 5,
    commentKey: 'testimonials.isabellaGiraldo',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Mateo Arango',
    rating: 4.5,
    commentKey: 'testimonials.mateoArango',
    avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
  },
  {
    name: 'Valentina Hoyos',
    rating: 5,
    commentKey: 'testimonials.valentinaHoyos',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    name: 'Andrés Castaño',
    rating: 4,
    commentKey: 'testimonials.andresCastano',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    name: 'Daniela Franco',
    rating: 5,
    commentKey: 'testimonials.danielaFranco',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
  }
];
