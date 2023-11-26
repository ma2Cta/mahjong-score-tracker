"use client";

import Link from "next/link";

interface BreadCrumbsProps {
  crumbs: Crumb[];
}

type Crumb = {
  name: string;
  path: string;
};

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ crumbs }) => {
  return (
    <div className="flex items-center text-sm font-medium text-gray-500 mb-4">
      <Link href="/" className="hover:underline">
        Home
      </Link>
      {crumbs.map((crumb, index) => {
        return (
          <div key={index}>
            <span className="mx-2"> / </span>
            {index === crumbs.length - 1 ? (
              crumb.name
            ) : (
              <Link href={crumb.path} className="hover:underline">
                {crumb.name}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
