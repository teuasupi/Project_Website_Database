import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen, Calendar } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
  showStats?: boolean;
}

export function HeroSection({
  title = "Connect. Grow. Inspire.",
  subtitle = "IKA TEUAS UPI Alumni Network",
  description = "Join thousands of Teknik Elektro UPI alumni building stronger connections, sharing opportunities, and creating lasting impact in the electrical engineering community.",
  primaryAction = {
    text: "Join Alumni Network",
    href: ROUTES.REGISTER,
  },
  secondaryAction = {
    text: "Explore Directory",
    href: ROUTES.ALUMNI.DIRECTORY,
  },
  backgroundImage,
  showStats = true,
}: HeroSectionProps) {
  // Mock stats - these would come from API in real implementation
  const stats = [
    {
      icon: Users,
      label: "Active Alumni",
      value: "2,500+",
      description: "Registered members"
    },
    {
      icon: BookOpen,
      label: "Articles Shared",
      value: "150+",
      description: "Knowledge articles"
    },
    {
      icon: Calendar,
      label: "Events Hosted",
      value: "50+",
      description: "Networking events"
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      {/* Background Image Overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="relative">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center rounded-full border bg-background/50 px-3 py-1 text-sm backdrop-blur-sm">
              <span className="text-primary">🎓</span>
              <span className="ml-2 text-muted-foreground">
                Connecting electrical engineering minds since 1963
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="mb-4 text-xl font-medium text-primary md:text-2xl">
              {subtitle}
            </p>

            {/* Description */}
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="text-base" asChild>
                <Link href={primaryAction.href}>
                  {primaryAction.text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base" asChild>
                <Link href={secondaryAction.href}>
                  {secondaryAction.text}
                </Link>
              </Button>
            </div>

            {/* Statistics */}
            {showStats && (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center rounded-lg bg-background/50 p-6 backdrop-blur-sm transition-transform hover:scale-105"
                    >
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {stat.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="h-20 w-full fill-background"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,60 C200,100 400,40 600,60 C800,80 1000,20 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </div>
    </section>
  );
}