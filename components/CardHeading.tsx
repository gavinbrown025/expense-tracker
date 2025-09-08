"use client";
import UICircleIcon from "@/components/UICircleIcon";

interface CardHeadingProps {
  title?: string;
  iconName?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function CardHeading({
  children,
  iconName,
  title,
  description,
}: CardHeadingProps) {
  return (
    <div className="flex flex-col @sm/card:flex-row @sm/card:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        {iconName && (
          <UICircleIcon className="gradient-primary/100" iconName={iconName} />
        )}
        <div className="flex-grow order">
          <h2 className="card-title text-lg @md/card:text-xl @lg/card:text-2xl">
            {title}
          </h2>
          <p className="text-sm">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
