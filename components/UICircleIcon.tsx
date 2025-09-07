import UIIcon from "./UIIcon";

export default function UICircleIcon({
  iconName,
  className,
  iconClass,
}: {
  iconName: string;
  className?: string;
  iconClass?: string;
}) {
  return (
    <div
      className={`grid place-items-center size-10 @lg/card:size-12 rounded-full border-0 cursor-default order ${className}`}
    >
      <UIIcon iconName={iconName} className={`!text-white ${iconClass}`} />
    </div>
  );
}
