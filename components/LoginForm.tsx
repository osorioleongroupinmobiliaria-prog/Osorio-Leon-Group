import React, { useState } from 'react';
import NeumorphicCard from './ui/NeumorphicCard';
import NeumorphicInput from './ui/NeumorphicInput';
import NeumorphicButton from './ui/NeumorphicButton';
import { COMPANY_INFO } from '../constants';

interface LoginFormProps {
  onLogin: (user: string, pass: string) => boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin(username, password);
    if (!success) {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="min-h-screen bg-[#e0e0e0] flex items-center justify-center p-4">
      <NeumorphicCard className="w-full max-w-sm p-8">
        <div className="text-center mb-8">
            <img src={COMPANY_INFO.logoUrl} alt="Logo" className="w-48 h-auto mx-auto" />
            <h1 className="mt-4 text-2xl font-bold text-[#153B67]">Panel de Administración</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Usuario</label>
            <NeumorphicInput 
                type="email" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
                placeholder="osorioyleongroupdigital@gmail.com"
                required 
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
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <NeumorphicButton type="submit" className="w-full !bg-[#153B67] !text-white">
            Ingresar
          </NeumorphicButton>
        </form>
      </NeumorphicCard>
    </div>
  );
};

export default LoginForm;