import React from "react";

export const SuccessMessage: React.FC = () => {
  return (
    <div className="bg-green-500/20 border border-green-500/30 text-green-300 rounded-full px-6 py-4 text-center animate-fadeIn text-xs sm:text-base font-space">
      Thanks! We'll notify you when we launch.
    </div>
  );
}; 