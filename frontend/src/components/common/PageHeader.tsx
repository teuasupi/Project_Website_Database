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
import { cn } from '@/lib/utils';

export interface BreadcrumbItemType {
  label: string;
  href?: string;
  current?: boolean;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItemType[];
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
  className = '',
}: PageHeaderProps) {
  return (
    <section
      className={cn('bg-foreground text-background border-b py-16', className)}
    >
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-6 flex justify-center">
            <Breadcrumb className="text-background">
              <BreadcrumbList>
                {breadcrumbs.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <BreadcrumbItem>
                      {item.current ? (
                        <BreadcrumbPage className="text-background/80">
                          {item.label}
                        </BreadcrumbPage>
                      ) : item.href ? (
                        <BreadcrumbLink
                          className="text-background hover:text-background/70 underline-offset-4 transition-colors hover:underline"
                          asChild
                        >
                          <Link href={item.href}>
                            {index === 0 &&
                            (item.label === 'Home' ||
                              item.label === 'Beranda') ? (
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
                        <span className="text-background">{item.label}</span>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && (
                      <BreadcrumbSeparator className="text-background/60" />
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
            <h1 className="text-background mb-4 text-4xl font-bold md:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="text-background/80 text-xl">{subtitle}</p>
            )}
          </div>

          {/* Actions */}
          {actions && (
            <div className="flex flex-wrap justify-center gap-3">{actions}</div>
          )}
        </div>
      </div>
    </section>
  );
}
