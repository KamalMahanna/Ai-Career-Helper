export async function encryptApiKey(apiKey: string): Promise<{ encryptedKey: string; iv: string }> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedKey = new TextEncoder().encode(apiKey);
  
  const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encodedKey
  );

  const exportedKey = await crypto.subtle.exportKey('raw', key);
  
  // Store the encryption key using base64 encoding
  localStorage.setItem('encryptionKey', btoa(String.fromCharCode(...new Uint8Array(exportedKey))));
  
  return {
    encryptedKey: btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer))),
    iv: btoa(String.fromCharCode(...new Uint8Array(iv)))
  };
}

export async function decryptApiKey(encryptedKey: string, iv: string): Promise<string> {
  const storedKey = localStorage.getItem('encryptionKey');
  if (!storedKey) throw new Error('Encryption key not found');

  const key = await crypto.subtle.importKey(
    'raw',
    Uint8Array.from(atob(storedKey).split('').map(c => c.charCodeAt(0))),
    'AES-GCM',
    true,
    ['decrypt']
  );

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: Uint8Array.from(atob(iv).split('').map(c => c.charCodeAt(0))) },
    key,
    Uint8Array.from(atob(encryptedKey).split('').map(c => c.charCodeAt(0)))
  );

  return new TextDecoder().decode(decryptedBuffer);
}

export function clearStoredApiKey(): void {
  localStorage.removeItem('apiKey');
  localStorage.removeItem('apiKeyIv');
  localStorage.removeItem('encryptionKey');
}