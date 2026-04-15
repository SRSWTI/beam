import {
  WindowsLogo,
  AppleLogo,
  LinuxLogo,
} from "@phosphor-icons/react";

export const WAITLIST_STORAGE_KEY = "srswti_early_access_submission";

export type FormData = {
  email: string;
  name: string;
  twitter: string;
  operatingSystem: string;
  ram: string;
};

export type Step = {
  id: number;
  title: string;
  description: string;
  required: boolean;
};

export const STEPS: Step[] = [
  {
    id: 1,
    title: "Email",
    description: "Enter your email address",
    required: true,
  },
  {
    id: 2,
    title: "Name",
    description: "What's your name?",
    required: false,
  },
  {
    id: 3,
    title: "Twitter",
    description: "Your Twitter/X handle",
    required: false,
  },
  {
    id: 4,
    title: "Operating System",
    description: "What OS do you use?",
    required: false,
  },
  {
    id: 5,
    title: "RAM",
    description: "How much RAM does your system have?",
    required: false,
  },
  {
    id: 6,
    title: "Submit",
    description: "Review and join early access",
    required: true,
  },
];

export const OPERATING_SYSTEMS = [
  { value: "windows", label: "", icon: WindowsLogo },
  { value: "macos", label: "", icon: AppleLogo },
  { value: "linux", label: "", icon: LinuxLogo },
];

export const RAM_OPTIONS = [
  { value: "4gb", label: "4 GB" },
  { value: "8gb", label: "8 GB" },
  { value: "16gb", label: "16 GB" },
  { value: "32gb", label: "32 GB" },
  { value: "64gb", label: "64 GB+" },
]; 