import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "outline" | "dark";

type ButtonProps = {
  variant?: Variant;
  onClick?: () => void;
  className?: string;
  icon?: IconDefinition;
  iconClassName?: string;
  children?: React.ReactNode;
  spin?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  variant,
  onClick,
  className,
  icon,
  iconClassName,
  children,
  spin,
  disabled,
  type,
}: ButtonProps) {
  className = twMerge(
    `flex text-zinc-200 rounded-xl px-4 py-2 items-center gap-2 drop-shadow-lg hover:scale-105 disabled:cursor-not-allowed disabled:scale-100 justify-center`,
    className,
  );
  iconClassName = twMerge("w-4 h-4", iconClassName);

  className = {
    primary: twMerge(
      "bg-theme-800 hover:bg-theme-700 disabled:bg-theme-700 disabled:text-theme-600",
      className,
    ),
    secondary: twMerge(
      "bg-amber-800 hover:bg-amber-700 disabled:bg-amber-800",
      className,
    ),
    outline: twMerge(
      "bg-transparent border border-zinc-500 hover:bg-zinc-500/10 disabled:bg-transparent disabled:border-zinc-500",
      className,
    ),
    dark: twMerge(
      "bg-black hover:bg-gray-950 disabled:text-gray-700",
      className,
    ),
  }[variant || "primary"];

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {icon && (
        <FontAwesomeIcon className={iconClassName} icon={icon} spin={spin} />
      )}
      {children}
    </button>
  );
}
