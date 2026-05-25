import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import React from 'react';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="w-full max-w-[1440px] mx-auto px-6 py-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
        <li>
          <Link to="/" className="text-gray-400 hover:text-blue-600 transition-colors flex items-center">
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const formattedValue = value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

          return (
            <React.Fragment key={to}>
              <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
              <li>
                  {isLast || ['tool', 'format', 'exam', 'doc', 'hi'].includes(value.toLowerCase()) ? (
                    <span className="text-gray-900 font-medium truncate" aria-current={isLast ? "page" : undefined}>
                      {formattedValue}
                    </span>
                  ) : (
                    <Link to={to} className="hover:text-blue-600 transition-colors truncate">
                      {formattedValue}
                    </Link>
                  )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
