import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Briefcase,
  GraduationCap,
  Calendar,
  MessageCircle,
  FileText,
  Award,
  Heart,
} from 'lucide-react';
import Link from 'next/link';

interface AlumniService {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  link?: string;
  buttonText?: string;
}

const services: AlumniService[] = [
  {
    title: 'Alumni Directory',
    description:
      'Connect with fellow alumni through our comprehensive directory. Find classmates, mentors, and professional contacts.',
    icon: Users,
    link: '/alumni/network',
    buttonText: 'Browse Directory',
  },
  {
    title: 'Career Services',
    description:
      'Access job opportunities, career counseling, and professional development resources exclusively for alumni.',
    icon: Briefcase,
    link: '/jobs',
    buttonText: 'View Jobs',
  },
  {
    title: 'Mentorship Program',
    description:
      'Join our mentorship program as a mentor or mentee. Share knowledge and grow professionally.',
    icon: GraduationCap,
    link: '/alumni/mentorship',
    buttonText: 'Learn More',
  },
  {
    title: 'Events & Reunions',
    description:
      'Stay updated on alumni events, reunions, and networking opportunities throughout the year.',
    icon: Calendar,
    link: '/events',
    buttonText: 'View Events',
  },
  {
    title: 'Alumni Forum',
    description:
      'Participate in discussions, share experiences, and stay connected with the alumni community.',
    icon: MessageCircle,
    link: '/forum',
    buttonText: 'Join Forum',
  },
  {
    title: 'Transcript Services',
    description:
      'Request official transcripts and academic documents through our online portal.',
    icon: FileText,
    buttonText: 'Request Documents',
  },
  {
    title: 'Recognition Program',
    description:
      'Nominate outstanding alumni for recognition and awards. Celebrate achievements within our community.',
    icon: Award,
    buttonText: 'Nominate Alumni',
  },
  {
    title: 'Donation & Support',
    description:
      'Support current students and university programs through our alumni giving initiatives.',
    icon: Heart,
    buttonText: 'Make a Donation',
  },
];

export function AlumniServices({ className }: { className?: string }) {
  return (
    <section className={`bg-muted/50 pb-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold">Alumni Services</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              We provide comprehensive services to support our alumni community
              throughout their careers and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="flex h-full flex-col">
                  <CardHeader className="pb-4 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-lg">
                        <IconComponent className="text-primary h-8 w-8" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <p className="text-muted-foreground mb-4 flex-1 text-sm">
                      {service.description}
                    </p>
                    {service.buttonText && (
                      <div className="mt-auto">
                        {service.link ? (
                          <Button asChild variant="outline" className="w-full">
                            <Link href={service.link}>
                              {service.buttonText}
                            </Link>
                          </Button>
                        ) : (
                          <Button variant="outline" className="w-full">
                            {service.buttonText}
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact for Additional Services */}

          <div className="p-6 text-center">
            <h3 className="mb-2 text-xl font-semibold">
              Need Additional Support?
            </h3>
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for? Our alumni relations team is
              here to help with any questions or special requests.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild>
                <Link href="mailto:alumni@ikateuas.upi.edu">
                  Email Alumni Relations
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="tel:+622220131163">Call Us: +62 22 2013163</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
