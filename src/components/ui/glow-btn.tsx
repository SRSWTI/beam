import { cn } from "@/lib/utils";

const GlowBtn = ({ onClick, children, className, ...rest }) => {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={cn(
        "inline-flex animate-shimmer-btn items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] p-2 text-sm  sm:p-3 sm:px-12 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 min-w-44",
        className
      )}
    >
      {children}
    </button>
  );
};

export default GlowBtn;
