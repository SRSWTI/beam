import React from "react";
import { CustomSelect } from "./custom-select";
import { RAM_OPTIONS, FormData } from "../waitlist-data";

type RamStepProps = {
  value: string;
  onChange: (field: keyof FormData, value: string) => void;
};

export const RamStep: React.FC<RamStepProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <CustomSelect
        options={RAM_OPTIONS}
        value={value}
        onChange={(selectedValue) => onChange("ram", selectedValue)}
      />
    </div>
  );
}; 