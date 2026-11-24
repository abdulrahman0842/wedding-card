import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

const ToastContext = createContext(() => {});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [message, setMessage] = useState('');
  const timer = useRef();

  const notify = useCallback((text) => {
    setMessage(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(''), 2800);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-20 z-[90] flex justify-center px-4 print:hidden"
      >
        {message && (
          <div className="flex animate-fade-up items-center gap-2 rounded-full bg-pine px-5 py-3 text-sm text-ivory shadow-xl ring-1 ring-gold/60">
            <Check className="h-4 w-4 text-gold" aria-hidden="true" />
            {message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}
