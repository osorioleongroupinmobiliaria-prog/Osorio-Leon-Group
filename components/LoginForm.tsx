
import React, { useState } from 'react';
import { supabase } from '../supabase/client';
import NeumorphicCard from './ui/NeumorphicCard';
import NeumorphicInput from './ui/NeumorphicInput';
import NeumorphicButton from './ui/NeumorphicButton';
import { COMPANY_INFO } from '../constants';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    setIsLoading(false);

    if (error) {
      setError(error.message === 'Invalid login credentials' ? 'Usuario o contraseña incorrectos.' : error.message);
    }
    // On success, the onAuthStateChange listener in App.tsx will handle the navigation.
  };

  return (
    <div className="min-h-screen bg-[#e0e0e0] flex items-center justify-center p-4">
      <NeumorphicCard className="w-full max-w-sm p-8">
        <div className="text-center mb-8">
            <img src={COMPANY_INFO.logoUrl} alt="Logo" className="w-64 h-auto mx-auto" />
            <h1 className="mt-4 text-2xl font-bold text-[#153B67]">Panel de Administración</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Usuario (Email)</label>
            <NeumorphicInput 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder="osorioyleongroup@gmail.com"
                required 
                disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Contraseña</label>
            <NeumorphicInput 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required 
                disabled={isLoading}
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <NeumorphicButton type="submit" className="w-full !bg-[#153B67] !text-white" disabled={isLoading}>
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </NeumorphicButton>
        </form>
      </NeumorphicCard>
    </div>
  );
};

export default LoginForm;
