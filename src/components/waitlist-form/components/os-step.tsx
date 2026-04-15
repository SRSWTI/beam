import React from "react";
import { CustomSelect } from "./custom-select";
import { OPERATING_SYSTEMS, FormData } from "../waitlist-data";

type OsStepProps = {
  value: string;
  onChange: (field: keyof FormData, value: string) => void;
};

export const OsStep: React.FC<OsStepProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <CustomSelect
        options={OPERATING_SYSTEMS}
        value={value}
        onChange={(selectedValue) => onChange("operatingSystem", selectedValue)}
      />
    </div>
  );
}; 