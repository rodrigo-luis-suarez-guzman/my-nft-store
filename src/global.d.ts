// src/global.d.ts
interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
    };
  }
  