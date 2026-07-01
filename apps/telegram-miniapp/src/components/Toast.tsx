import { useState, useCallback, type ReactNode } from 'react';
import './Toast.css';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

let toastIdCounter = 0;

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastMessage['type']) => void;
}

import { createContext, useContext } from 'react';

export const ToastContext = createContext<ToastContextValue>({
  showToast: () => undefined,
});

export function useToast(): ToastContextValue {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            onClick={() => dismiss(toast.id)}
          >
            {toast.type === 'success' && <span>✓ </span>}
            {toast.type === 'error' && <span>⚠ </span>}
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
