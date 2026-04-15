import React from "react";
import { cn } from "@/lib/utils";
import { IconWeight } from "@phosphor-icons/react";

type IconProps = {
  size?: number;
  weight?: IconWeight;
  className?: string;
};

type CustomSelectProps = {
  options: {
    value: string;
    label: string;
    icon?: React.ComponentType<IconProps>;
  }[];
  value: string;
  onChange: (value: string) => void;
};

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
      {options.map((option) => {
        const IconComponent = option.icon;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "p-4 duration-300 cursor-pointer rounded-lg border text-xs sm:text-sm font-space flex items-center gap-1 sm:gap-2",
              value === option.value
                ? "border-white bg-white/10 text-white"
                : "bg-white/20 border-transparent",
              option.label.length ? "p-2 py-2" : ""
            )}
          >
            {IconComponent && <IconComponent size={32} weight="fill" />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}; 