import React from "react";
import { FormData } from "../waitlist-data";

type TwitterStepProps = {
  value: string;
  error?: string;
  onChange: (field: keyof FormData, value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
};

export const TwitterStep: React.FC<TwitterStepProps> = ({
  value,
  error,
  onChange,
  onKeyPress,
}) => {
  return (
    <div className="space-y-2 w-full">
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          @
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) =>
            onChange("twitter", e.target.value.replace("@", ""))
          }
          onKeyPress={onKeyPress}
          placeholder="yourusername"
          className={`w-full pl-10 pr-6 py-4 rounded-full bg-white/10 outline-none text-white text-sm sm:text-base font-space ${
            error
              ? "border-red-500 focus:border-red-500"
              : " focus:border-white"
          }`}
          required
          autoFocus
        />
      </div>
      {error && (
        <p className="text-red-400 text-xs sm:text-sm px-2">{error}</p>
      )}
    </div>
  );
}; 