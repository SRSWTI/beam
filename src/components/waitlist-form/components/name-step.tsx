import React from "react";
import { FormData } from "../waitlist-data";

type NameStepProps = {
  value: string;
  error?: string;
  onChange: (field: keyof FormData, value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
};

export const NameStep: React.FC<NameStepProps> = ({
  value,
  error,
  onChange,
  onKeyPress,
}) => {
  return (
    <div className="space-y-2 w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange("name", e.target.value)}
        onKeyPress={onKeyPress}
        placeholder="Enter your name"
        className={`w-full px-6 py-4 rounded-full bg-white/10 outline-none text-white text-sm sm:text-base font-space ${
          error
            ? "border-red-500 focus:border-red-500"
            : " focus:border-white"
        }`}
        autoFocus
      />
      {error && (
        <p className="text-red-400 text-xs sm:text-sm px-2">{error}</p>
      )}
    </div>
  );
}; 