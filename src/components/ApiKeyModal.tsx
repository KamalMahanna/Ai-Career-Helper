import React, { useState } from 'react';
import { KeyRound, X } from 'lucide-react';
import { encryptApiKey } from '../utils/crypto';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { encryptedKey, iv } = await encryptApiKey(apiKey);
      localStorage.setItem('apiKey', encryptedKey);
      localStorage.setItem('apiKeyIv', iv);
      onClose();
    } catch (err) {
      setError('Failed to save API key');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        
        <div className="flex items-center gap-3 mb-4">
          <KeyRound className="text-blue-600" size={24} />
          <h2 className="text-xl font-semibold">Enter API Key</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="w-full p-2 border rounded mb-4"
            required
          />
          
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save API Key
          </button>
        </form>
      </div>
    </div>
  );
}