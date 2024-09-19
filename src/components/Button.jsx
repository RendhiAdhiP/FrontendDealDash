import { cn } from "../lib/utils";

const Button = ({ children, className = '', type = 'submit', isDisabled = false, onClick }) => {
  return (
    <button
      type={type}
      className={cn('flex items-center justify-center gap-2 bg-white rounded-lg p-2 mt-2 text-black font-medium', className)}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
