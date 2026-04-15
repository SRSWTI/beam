import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWaitlistForm } from "./use-waitlist-form";
import { STEPS } from "./waitlist-data";
import { EmailStep } from "./components/email-step";
import { NameStep } from "./components/name-step";
import { TwitterStep } from "./components/twitter-step";
import { OsStep } from "./components/os-step";
import { RamStep } from "./components/ram-step";
import { ReviewStep } from "./components/review-step";
import { FormNavigation } from "./components/form-navigation";
import { SuccessMessage } from "./components/success-message";

const WaitlistForm: React.FC = () => {
  const {
    currentStep,
    formData,
    isSubmitting,
    isSubmitted,
    errors,
    updateFormData,
    canProceed,
    nextStep,
    skipStep,
    prevStep,
    handleSubmit,
  } = useWaitlistForm();

  const canProceedValue = canProceed();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canProceedValue) {
      e.preventDefault();
      if (currentStep < STEPS.length) {
        nextStep();
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <EmailStep
            value={formData.email}
            error={errors.email}
            onChange={updateFormData}
            onKeyPress={handleKeyPress}
          />
        );

      case 2:
        return (
          <NameStep
            value={formData.name}
            error={errors.name}
            onChange={updateFormData}
            onKeyPress={handleKeyPress}
          />
        );

      case 3:
        return (
          <TwitterStep
            value={formData.twitter}
            error={errors.twitter}
            onChange={updateFormData}
            onKeyPress={handleKeyPress}
          />
        );

      case 4:
        return (
          <OsStep
            value={formData.operatingSystem}
            onChange={updateFormData}
          />
        );

      case 5:
        return (
          <RamStep
            value={formData.ram}
            onChange={updateFormData}
          />
        );

      case 6:
        return <ReviewStep formData={formData} />;

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  return (
    <div
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="relative z-10 w-full max-w-lg mx-auto"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="relative h-full flex flex-col"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, filter: "blur(24px)", scale: 0.8 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(24px)", scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[24px] p-4 sm:p-8 shadow-2xl"
          >
            <div className="flex justify-center items-center absolute top-4 left-1/2 -translate-x-1/2 w-full">
              <span className="text-gray-400 text-xs sm:text-sm font-space">
                {currentStep} of {STEPS.length}
              </span>
            </div>

            <div className="text-center space-y-2 mt-8">
              <h2 className="text-white text-sm sm:text-lg font-semibold">
                {STEPS[currentStep - 1].description}
              </h2>
            </div>

            <div className="animate-fadeIn flex justify-center overflow-y-auto max-h-[200px] py-8">
              {renderStepContent()}
            </div>

            <FormNavigation
              currentStep={currentStep}
              canProceed={canProceedValue}
              isSubmitting={isSubmitting}
              onNext={nextStep}
              onSkip={skipStep}
              onBack={prevStep}
              onSubmit={handleSubmit}
            />
          </motion.div>
        </AnimatePresence>
      </form>
    </div>
  );
};

export default WaitlistForm;
