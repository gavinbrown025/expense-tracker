"use client";
import UIIcon from "@/components/UIIcon";

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
    <div className="flex items-center gap-4 mb-6">
      {iconName && (
        <div className="gradient-primary grid place-items-center size-10 @lg/card:size-12 rounded-full border-0 cursor-default order">
          <UIIcon iconName={iconName} className="@lg/card:!text-2xl !text-xl" />
        </div>
      )}
      <div className="flex-grow order">
        <h2 className="card-title text-lg @md/card:text-xl @lg/card:text-2xl">
          {title}
        </h2>
        <p className="text-sm">{description}</p>
      </div>
      {children }
    </div>
  );
}
