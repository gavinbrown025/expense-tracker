import { ReactNode } from "react";
import CardHeading from "./CardHeading";

interface CardProps {
  children?: ReactNode;
  iconName?: string;
  title?: string;
  desc?: string;
  headingChildren?: ReactNode;
  className?: string;
  bodyStyles?: string;
}

const Card = ({
  iconName,
  title,
  desc,
  headingChildren,
  className,
  children,
  bodyStyles,
}: CardProps) => {
  const hasHeading = headingChildren || iconName || title || desc;
  return (
    <div className={`card @container/card card-md @lg/card:card-lg bg-neutral shadow-xl ${className}`}>
      <div className={`card-body ${bodyStyles}`}>
        {hasHeading && (
          <CardHeading
            iconName={iconName}
            title={title}
            description={desc}
          >
            {headingChildren}
          </CardHeading>
        )}
        {children}
      </div>
    </div>
  );
};

export default Card;
