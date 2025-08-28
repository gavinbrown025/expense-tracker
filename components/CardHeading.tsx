"use client";
import UIIcon from "@/components/UIIcon";

interface CardHeadingProps {
  iconName: string;
  title: string;
  description: string;
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
      <div className="btn btn-primary size-10 gradient-primary sm:size-12 rounded-full border-0 cursor-default">
        <UIIcon iconName={iconName} className="!text-2xl" />
      </div>
      <div className="flex-grow">
        <h2 className="card-title text-lg @md/card:text-xl @lg/card:text-2xl">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>
      {children}
    </div>
  );
}
