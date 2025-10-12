
import React from 'react';
import NeumorphicCard from './ui/NeumorphicCard';

const AdminInstructions: React.FC = () => {
  return (
    <NeumorphicCard className="p-8">
      <h2 className="text-2xl font-bold text-[#153B67] mb-4">Instrucciones de Administración</h2>
      <div className="space-y-6 text-gray-700">
        <div>
          <h3 className="text-lg font-semibold mb-2">Credenciales de Acceso</h3>
          <p>Para acceder a este panel, utiliza el correo electrónico y la contraseña que configuraste en el panel de Autenticación de Supabase.</p>
          <ul className="list-disc list-inside mt-2 bg-[#e0e0e0] p-4 rounded-xl shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]">
            <li><strong>Usuario:</strong> Tu email de administrador.</li>
            <li><strong>Contraseña:</strong> Tu contraseña de administrador.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Gestión de Propiedades</h3>
          <p>Desde este panel puedes controlar todo el inventario de propiedades del sitio web.</p>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li><strong>Ver Propiedades:</strong> La pestaña "Lista de Propiedades" muestra todas las propiedades existentes.</li>
            <li><strong>Crear Propiedad:</strong> Haz clic en "Nueva Propiedad", completa el formulario con todos los detalles y haz clic en "Guardar".</li>
            <li><strong>Editar Propiedad:</strong> En la lista, haz clic en el botón "Editar" de la propiedad que deseas modificar. Realiza los cambios y guarda.</li>
            <li><strong>Eliminar Propiedad:</strong> En la lista, haz clic en "Eliminar". Esta acción es permanente.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Consejos para las Imágenes</h3>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li><strong>Usa URLs directas:</strong> Pega la URL completa de la imagen (ej: `https://.../imagen.jpg`).</li>
            <li><strong>Calidad:</strong> Utiliza imágenes de alta calidad (mínimo 1200x800px) para una mejor presentación.</li>
            <li><strong>Imagen Principal:</strong> La primera imagen que agregues será la que se muestre en la tarjeta principal de la propiedad.</li>
            <li><strong>Bancos de Imágenes:</strong> Si no tienes fotos, puedes usar placeholders de sitios como Pexels o Unsplash.</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Estado de Publicación</h3>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li><strong>Publicado:</strong> La propiedad será visible para todos los visitantes del sitio web.</li>
            <li><strong>Borrador:</strong> La propiedad se guarda en el sistema pero no es visible públicamente. Útil para trabajar en un listado antes de publicarlo.</li>
             <li><strong>Pausado:</strong> Oculta temporalmente una propiedad del sitio público sin eliminarla.</li>
          </ul>
        </div>

      </div>
    </NeumorphicCard>
  );
};

export default AdminInstructions;
