import { Users, BookOpen, Calendar } from 'lucide-react';

export function StatisticsSection() {
  const stats = [
    {
      icon: Users,
      label: 'Active Alumni',
      value: '2,500+',
      description: 'Registered members',
    },
    {
      icon: BookOpen,
      label: 'Articles Shared',
      value: '150+',
      description: 'Knowledge articles',
    },
    {
      icon: Calendar,
      label: 'Events Hosted',
      value: '50+',
      description: 'Networking events',
    },
  ];

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-card flex flex-col items-center rounded-lg border p-6 transition-transform hover:scale-105"
              >
                <div className="bg-primary/10 mb-3 flex h-12 w-12 items-center justify-center rounded-lg">
                  <IconComponent className="text-primary h-6 w-6" />
                </div>
                <div className="text-foreground text-3xl font-bold">
                  {stat.value}
                </div>
                <div className="text-foreground text-sm font-medium">
                  {stat.label}
                </div>
                <div className="text-muted-foreground text-xs">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
