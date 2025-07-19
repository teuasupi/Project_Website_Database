import { RootLayout } from '@/components/layout/RootLayout';
import { MissionVision } from '@/components/features/about/MissionVision';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { GraduationCap, Users, Calendar, Award, Building, Globe } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

export const metadata = {
  title: 'About TEUAS',
  description: 'Learn about IKA TEUAS UPI, our history, mission, and the Teknik Elektro UPI program.',
};

export default function AboutPage() {
  const stats = [
    {
      icon: Users,
      value: '2,500+',
      label: 'Alumni Worldwide',
      description: 'Connected professionals across the globe'
    },
    {
      icon: Calendar,
      value: '60+',
      label: 'Years of Excellence',
      description: 'Since 1963, fostering engineering talent'
    },
    {
      icon: Award,
      value: '100+',
      label: 'Industry Awards',
      description: 'Recognition from alumni achievements'
    },
    {
      icon: Building,
      value: '500+',
      label: 'Partner Companies',
      description: 'Organizations hiring our graduates'
    }
  ];

  const milestones = [
    {
      year: 1963,
      title: 'Foundation of Teknik Elektro UPI',
      description: 'The electrical engineering program was established as part of Universitas Pendidikan Indonesia.'
    },
    {
      year: 1985,
      title: 'First Alumni Association',
      description: 'Formation of the first informal alumni network to maintain connections.'
    },
    {
      year: 2000,
      title: 'Digital Transformation',
      description: 'Launch of the first digital platform to connect alumni online.'
    },
    {
      year: 2015,
      title: 'Scholarship Program',
      description: 'Establishment of the IKA TEUAS scholarship fund for underprivileged students.'
    },
    {
      year: 2020,
      title: 'Global Expansion',
      description: 'Extension of the network to include international alumni chapters.'
    },
    {
      year: 2025,
      title: 'Modern Platform Launch',
      description: 'Launch of the comprehensive digital platform for enhanced connectivity.'
    }
  ];

  const programHighlights = [
    {
      title: 'Electrical Engineering',
      description: 'Comprehensive program covering power systems, electronics, control systems, and renewable energy.',
      specializations: ['Power Systems', 'Electronics', 'Control Systems', 'Telecommunications']
    },
    {
      title: 'Research Excellence',
      description: 'Leading research in sustainable energy, smart grids, IoT, and advanced automation systems.',
      specializations: ['Renewable Energy', 'Smart Grid Technology', 'IoT Systems', 'Industrial Automation']
    },
    {
      title: 'Industry Partnerships',
      description: 'Strong collaborations with leading technology companies and research institutions.',
      specializations: ['Internship Programs', 'Industry Projects', 'Guest Lectures', 'Technology Transfer']
    }
  ];

  return (
    <RootLayout>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
              About IKA TEUAS UPI
            </h1>
            <p className="text-xl text-muted-foreground">
              Connecting generations of electrical engineering excellence since 1963
            </p>
          </div>
        </div>
      </section>

      {/* Organization Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-foreground">
                Our Organization
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  IKA TEUAS UPI (Ikatan Keluarga Alumni Teknik Elektro UPI) is the official alumni 
                  association of the Electrical Engineering department at Universitas Pendidikan Indonesia. 
                  For over six decades, we have been connecting graduates, fostering professional 
                  relationships, and contributing to the advancement of electrical engineering education.
                </p>
                <p>
                  Our network spans across Indonesia and internationally, bringing together professionals 
                  from diverse industries including technology, energy, telecommunications, education, 
                  and entrepreneurship. We serve as a bridge between academia and industry, facilitating 
                  knowledge transfer and professional development.
                </p>
                <p>
                  Through our various programs and initiatives, we support current students, recent 
                  graduates, and experienced professionals in their career journeys while maintaining 
                  strong ties to our alma mater and contributing to the broader engineering community.
                </p>
              </div>
              
              <div className="mt-8">
                <Button asChild>
                  <Link href={ROUTES.ALUMNI.DIRECTORY}>
                    Explore Alumni Directory
                  </Link>
                </Button>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="mb-3 flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {stat.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.description}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <MissionVision />

      {/* History & Milestones */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Our Journey
            </h2>
            <p className="mt-2 text-muted-foreground">
              Key milestones in our organization's history
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-sm font-bold">{milestone.year}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {milestone.title}
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teknik Elektro UPI Program */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Teknik Elektro UPI Program
            </h2>
            <p className="mt-2 text-muted-foreground">
              Excellence in electrical engineering education and research
            </p>
          </div>

          <div className="space-y-8">
            {programHighlights.map((program, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <span>{program.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    {program.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {program.specializations.map((spec, specIndex) => (
                      <span
                        key={specIndex}
                        className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
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
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="p-8 text-center">
                <Globe className="mx-auto mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-2xl font-bold text-foreground">
                  Partnership with UPI
                </h3>
                <p className="mb-4 text-muted-foreground">
                  Our strong partnership with Universitas Pendidikan Indonesia ensures continuous 
                  collaboration in research, education, and professional development initiatives.
                </p>
                <Button variant="outline" asChild>
                  <Link href="https://upi.edu" target="_blank" rel="noopener noreferrer">
                    Visit UPI Official Website
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Join Our Community
            </h2>
            <p className="mb-8 text-muted-foreground">
              Be part of a thriving network of electrical engineering professionals. 
              Connect, learn, and grow with us.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href={ROUTES.REGISTER}>
                  Become a Member
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={ROUTES.CONTACT}>
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}