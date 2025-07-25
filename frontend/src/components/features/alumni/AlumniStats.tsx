'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Users, MapPin, Briefcase, GraduationCap } from 'lucide-react';

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    icon: Users,
    value: '5,000+',
    label: 'Total Alumni',
    description: 'Alumni terdaftar di seluruh dunia',
  },
  {
    icon: MapPin,
    value: '50+',
    label: 'Negara',
    description: 'Alumni tersebar di berbagai negara',
  },
  {
    icon: Briefcase,
    value: '200+',
    label: 'Perusahaan',
    description: 'Alumni bekerja di perusahaan terkemuka',
  },
  {
    icon: GraduationCap,
    value: '60+',
    label: 'Tahun',
    description: 'Pengalaman menghasilkan lulusan berkualitas',
  },
];

interface AlumniStatsProps {
  className?: string;
}

export function AlumniStats({ className = '' }: AlumniStatsProps) {
  return (
    <section className={`bg-background py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 bg-muted/30 text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </h3>
                    <p className="text-lg font-semibold text-foreground">
                      {stat.label}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}