import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

export interface BreadcrumbItemType {
  label: string;
  href?: string;
  current?: boolean;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItemType[];
  backgroundImage?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  backgroundImage,
  actions,
  className = '',
}: PageHeaderProps) {
  const headerStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : {};

  return (
    <>
      <section
        className={`bg-muted/30 border-b py-16 ${
          backgroundImage ? 'text-white' : ''
        } ${className}`}
        style={headerStyle}
      >
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="mb-6 flex justify-center">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <BreadcrumbItem>
                        {item.current ? (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        ) : item.href ? (
                          <BreadcrumbLink asChild>
                            <Link href={item.href}>
                              {index === 0 && item.label === 'Home' ? (
                                <span className="flex items-center">
                                  <Home className="mr-1 h-4 w-4" />
                                  {item.label}
                                </span>
                              ) : (
                                item.label
                              )}
                            </Link>
                          </BreadcrumbLink>
                        ) : (
                          <span>{item.label}</span>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}

          <div className="flex flex-col items-center justify-center gap-6 text-center">
            {/* Title and Subtitle */}
            <div>
              <h1
                className={`mb-4 text-4xl font-bold md:text-5xl ${
                  backgroundImage ? 'text-white' : 'text-foreground'
                }`}
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  className={`text-xl ${
                    backgroundImage ? 'text-gray-200' : 'text-muted-foreground'
                  }`}
                >
                  {subtitle}
                </p>
              )}
            </div>

            {/* Actions */}
            {actions && (
              <div className="flex flex-wrap justify-center gap-3">
                {actions}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
