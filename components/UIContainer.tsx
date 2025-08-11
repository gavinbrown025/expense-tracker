export default function UIContainer({
  children, className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`py-4 sm:py-6 lg:py-8 ${className ? ` ${className}` : ''}`}>{children}</div>
  );
}
