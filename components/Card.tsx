import { ReactNode } from "react";
import CardHeading from "./CardHeading";

interface CardProps {
  children?: ReactNode;
  iconName?: string;
  title?: string;
  desc?: string;
  headingChildren?: ReactNode;
}

const Card = ({
  iconName,
  title,
  desc,
  headingChildren,
  children,
}: CardProps) => {
  const hasHeading = headingChildren || iconName || title || desc;
  return (
    <div className="card @container/card card-md @lg/card:card-lg bg-neutral shadow-xl">
      <div className="card-body">
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
