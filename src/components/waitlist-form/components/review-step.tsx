import React from "react";
import {
  Envelope,
  User,
  TwitterLogo,
  Memory,
} from "@phosphor-icons/react";
import { FormData, OPERATING_SYSTEMS, RAM_OPTIONS } from "../waitlist-data";

type ReviewStepProps = {
  formData: FormData;
};

export const ReviewStep: React.FC<ReviewStepProps> = ({ formData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
      <div className="bg-white/10 backdrop-blur-sm rounded-[12px] p-4 flex flex-col items-center justify-center space-y-2">
        <Envelope size={24} weight="fill" className="text-white" />
        <span className="text-white text-sm font-medium text-center break-all">
          {formData.email}
        </span>
      </div>

      {formData.name && (
        <div className="bg-white/10 backdrop-blur-sm rounded-[12px] p-4 flex flex-col items-center justify-center space-y-2">
          <User size={24} weight="fill" className="text-white" />
          <span className="text-white text-sm font-medium text-center">
            {formData.name}
          </span>
        </div>
      )}

      {formData.twitter && (
        <div className="bg-white/10 backdrop-blur-sm rounded-[12px] p-4 flex flex-col items-center justify-center space-y-2">
          <TwitterLogo size={24} weight="fill" className="text-white" />
          <span className="text-white text-sm font-medium">
            @{formData.twitter}
          </span>
        </div>
      )}

      {formData.operatingSystem && (
        <div className="bg-white/10 backdrop-blur-sm rounded-[12px] p-4 flex flex-col items-center justify-center space-y-2">
          {(() => {
            const IconComponent = OPERATING_SYSTEMS.find(
              (os) => os.value === formData.operatingSystem
            )?.icon;
            return IconComponent ? (
              <IconComponent size={24} weight="fill" className="text-white" />
            ) : null;
          })()}
          <span className="text-white text-sm font-medium">
            {OPERATING_SYSTEMS.find(
              (os) => os.value === formData.operatingSystem
            )?.value === "windows"
              ? "Windows"
              : OPERATING_SYSTEMS.find(
                  (os) => os.value === formData.operatingSystem
                )?.value === "macos"
              ? "macOS"
              : OPERATING_SYSTEMS.find(
                  (os) => os.value === formData.operatingSystem
                )?.value === "linux"
              ? "Linux"
              : "OS"}
          </span>
        </div>
      )}

      {formData.ram && (
        <div className="bg-white/10 backdrop-blur-sm rounded-[12px] p-4 flex flex-col items-center justify-center space-y-2">
          <Memory size={24} weight="fill" className="text-white" />
          <span className="text-white text-sm font-medium">
            {RAM_OPTIONS.find((ram) => ram.value === formData.ram)?.label}
          </span>
        </div>
      )}
    </div>
  );
}; 