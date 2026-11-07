import React from 'react';
import { useShop } from '../context/ShopContext';
import { Check, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#171717] text-[#F4F0E8] border border-[#B49A78] p-3.5 shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200"
        >
          <div className="flex items-center space-x-2.5">
            {toast.type === 'success' ? (
              <span className="w-5 h-5 bg-[#B49A78] text-[#171717] flex items-center justify-center flex-shrink-0 text-xs font-bold">
                ✓
              </span>
            ) : (
              <Info className="w-4 h-4 text-[#B49A78] flex-shrink-0" />
            )}
            <span className="text-xs font-medium tracking-wide">
              {toast.message}
            </span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#8B8176] hover:text-[#FFFFFF] p-1 transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
