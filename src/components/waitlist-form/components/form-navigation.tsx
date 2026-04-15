import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarBorder } from "@/components/ui/star-button";
import { STEPS } from "../waitlist-data";
import { cn } from "@/lib/utils";

type FormNavigationProps = {
  currentStep: number;
  canProceed: boolean;
  isSubmitting: boolean;
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
  onSubmit: () => void;
};

export const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  canProceed,
  isSubmitting,
  onNext,
  onSkip,
  onBack,
  onSubmit,
}) => {
  const currentStepData = STEPS[currentStep - 1];
  const isLastStep = currentStep === STEPS.length;
  const canSkip = !currentStepData.required && !isLastStep;

  return (
    <div className="flex justify-between items-center">
      {currentStep > 1 ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 font-space text-gray-400 hover:text-white cursor-pointer text-xs sm:text-sm"
        >
          <ChevronLeft size={14} className="sm:w-4 sm:h-4" />
          <span>Back</span>
        </button>
      ) : (
        <div></div>
      )}

      <div className="flex items-center gap-2 mt-4 ">
        {canSkip && (
          <Button
            type="button"
            onClick={onSkip}
            variant="ghost"
            className="text-gray-400 hover:text-white"
          >
            Skip
          </Button>
        )}

        {!isLastStep ? (
          <Button
            type="button"
            onClick={onNext}
            disabled={!canProceed}
            className="w-32 bg-purple-500 text-white hover:bg-purple-700"
          >
            <span>Next</span>
            <ChevronRight size={14} className="sm:w-4 sm:h-4" />
          </Button>
        ) : (
          <StarBorder
            as="button"
            type="button"
            wrapperClassname="bg-black/70"
            onClick={onSubmit}
            disabled={isSubmitting || !canProceed}
            color="rgb(255, 255, 255)"
            speed="4s"
            className={cn(
              "transition-all duration-300 transform hover:scale-105 cursor-pointer",
              (isSubmitting || !canProceed) && "opacity-50 cursor-not-allowed",
              'flex-1'
            )}
          >
            {isSubmitting ? (
              <div className="h-4 w-4 sm:h-5 sm:w-5 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
            ) : (
              "Join Early Access"
            )}
          </StarBorder>
        )}
      </div>
    </div>
  );
}; 