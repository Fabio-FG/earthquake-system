interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "", ...props }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-subtle-text p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card }
