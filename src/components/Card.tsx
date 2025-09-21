interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card = ({ children, className = "", ...props }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-subtle-text ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card };
