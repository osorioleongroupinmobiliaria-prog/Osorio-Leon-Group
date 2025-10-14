import React from 'react';
import NeumorphicCard from './ui/NeumorphicCard';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <pre className="bg-gray-800 text-white p-3 rounded-lg text-xs overflow-x-auto">
        <code>{children}</code>
    </pre>
);

const AdminInstructions: React.FC = () => {
  const policiesSQL = `-- 1. Política para permitir que CUALQUIERA pueda VER las imágenes.
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'property-images' );

-- 2. Política para permitir que SOLO los administradores (usuarios autenticados) puedan SUBIR imágenes.
CREATE POLICY "Admin Insert Access"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'property-images' AND role() = 'authenticated' );

-- 3. Política para permitir que SOLO los administradores puedan ACTUALIZAR imágenes.
CREATE POLICY "Admin Update Access"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'property-images' AND role() = 'authenticated' );

-- 4. Política para permitir que SOLO los administradores puedan BORRAR imágenes.
CREATE POLICY "Admin Delete Access"
ON storage.objects FOR DELETE
USING ( bucket_id = 'property-images' AND role() = 'authenticated' );
`;
    
  return (
    <NeumorphicCard className="p-6 sm:p-8">
      <h2 className="text-xl font-bold text-[#153B67] mb-4">Instrucciones para Administradores</h2>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        
        <section>
          <h3 className="font-semibold text-lg mb-2 border-b pb-1">Gestión de Propiedades</h3>
          <p>
            Utiliza este panel para administrar todo el inventario de propiedades. El flujo de trabajo recomendado es:
          </p>
          <ul className="list-decimal list-inside ml-4 mt-2 space-y-1">
            <li><strong>Dashboard:</strong> Obtén una vista general rápida de tu inventario.</li>
            <li><strong>Lista de Propiedades:</strong> Busca, filtra y accede a propiedades existentes.</li>
            <li><strong>Formulario de Propiedad:</strong> Crea nuevas propiedades o edita las existentes. El formulario está dividido en pestañas para facilitar la navegación.</li>
          </ul>
        </section>

        <section>
            <h3 className="font-semibold text-lg mb-2 border-b pb-1">Configuración para Carga de Imágenes (¡Importante!)</h3>
            <p className="mb-3">
                Para que la función de <strong>subir imágenes</strong> directamente desde tu computador funcione, necesitas configurar el "Storage" en tu proyecto de Supabase. Es un proceso único que solo tienes que hacer una vez.
            </p>
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold">Paso 1: Crear el "Bucket" de Almacenamiento</h4>
                    <ol className="list-decimal list-inside ml-4 mt-2 space-y-1 text-sm">
                        <li>Ve a tu proyecto en <strong>Supabase.io</strong>.</li>
                        <li>En el menú de la izquierda, haz clic en el ícono de <strong>Storage</strong> (un cilindro).</li>
                        <li>Haz clic en el botón <strong>"New Bucket"</strong>.</li>
                        <li>En el campo `Bucket name`, escribe exactamente: <strong className="bg-gray-200 px-1 rounded">property-images</strong></li>
                        <li>Activa el interruptor que dice <strong>"Public bucket"</strong>. Esto es crucial para que las imágenes se vean en la web.</li>
                        <li>Haz clic en <strong>"Save"</strong>.</li>
                    </ol>
                </div>
                 <div>
                    <h4 className="font-semibold">Paso 2: Configurar las Políticas de Seguridad (Policies)</h4>
                    <p className="text-sm my-2">Estas reglas aseguran que solo tú (como administrador) puedas subir o borrar imágenes, pero que todos los visitantes puedan verlas.</p>
                    <ol className="list-decimal list-inside ml-4 mt-2 space-y-1 text-sm">
                        <li>En el menú de la izquierda, ve al <strong>SQL Editor</strong> (icono de base de datos).</li>
                        <li>Haz clic en <strong>"+ New query"</strong>.</li>
                        <li>Copia y pega el siguiente código completo en el editor:</li>
                    </ol>
                    <div className="mt-2">
                        <CodeBlock>{policiesSQL}</CodeBlock>
                    </div>
                     <ol className="list-decimal list-inside ml-4 mt-2 space-y-1 text-sm" start={4}>
                         <li>Haz clic en el botón verde <strong>"RUN"</strong> para ejecutar el código.</li>
                    </ol>
                </div>
                <p className="text-sm font-medium text-green-700 bg-green-100 p-3 rounded-lg">
                    ¡Y listo! Con estos dos pasos, la carga de imágenes desde el formulario de propiedades funcionará perfectamente.
                </p>
            </div>
        </section>
      </div>
    </NeumorphicCard>
  );
};

export default AdminInstructions;