import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Globe } from 'lucide-react';
import Link from 'next/link';

interface ProgramHighlight {
  title: string;
  description: string;
  specializations: string[];
}

interface ProgramOverviewProps {
  className?: string;
}

export function ProgramOverview({ className = '' }: ProgramOverviewProps) {
  const programHighlights: ProgramHighlight[] = [
    {
      title: 'Teknik Elektro',
      description:
        'Program komprehensif yang mencakup sistem tenaga, elektronika, sistem kontrol, dan energi terbarukan.',
      specializations: [
        'Sistem Tenaga',
        'Elektronika',
        'Sistem Kontrol',
        'Telekomunikasi',
      ],
    },
    {
      title: 'Keunggulan Penelitian',
      description:
        'Penelitian terdepan dalam energi berkelanjutan, smart grid, IoT, dan sistem otomasi canggih.',
      specializations: [
        'Energi Terbarukan',
        'Teknologi Smart Grid',
        'Sistem IoT',
        'Otomasi Industri',
      ],
    },
    {
      title: 'Kemitraan Industri',
      description:
        'Kolaborasi kuat dengan perusahaan teknologi terkemuka dan institusi penelitian.',
      specializations: [
        'Program Magang',
        'Proyek Industri',
        'Kuliah Tamu',
        'Transfer Teknologi',
      ],
    },
  ];

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-foreground text-3xl font-bold md:text-4xl">
            Program Teknik Elektro UPI
          </h2>
          <p className="text-muted-foreground mt-2">
            Keunggulan dalam pendidikan dan penelitian teknik elektro
          </p>
        </div>

        <div className="space-y-8">
          {programHighlights.map((program, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <GraduationCap className="text-primary h-6 w-6" />
                  <span>{program.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {program.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {program.specializations.map((spec, specIndex) => (
                    <span
                      key={specIndex}
                      className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* University Partnership */}
        <div className="mt-12">
          <Card className="from-primary/5 to-secondary/5 bg-gradient-to-r">
            <CardContent className="p-8 text-center">
              <Globe className="text-primary mx-auto mb-4 h-12 w-12" />
              <h3 className="text-foreground mb-2 text-2xl font-bold">
                Kemitraan dengan UPI
              </h3>
              <p className="text-muted-foreground mb-4">
                Kemitraan kuat kami dengan Universitas Pendidikan Indonesia
                memastikan kolaborasi berkelanjutan dalam penelitian,
                pendidikan, dan inisiatif pengembangan profesional.
              </p>
              <Button variant="outline" asChild>
                <Link
                  href="https://upi.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kunjungi Website Resmi UPI
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
