import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Heart, Users } from 'lucide-react';

interface MissionVisionProps {
  className?: string;
}

export function MissionVision({ className = '' }: MissionVisionProps) {
  const mission = {
    title: 'Our Mission',
    icon: Target,
    content: 'To build and strengthen the network of Teknik Elektro UPI alumni, fostering professional growth, knowledge sharing, and meaningful connections that drive innovation in electrical engineering and contribute to society.',
    points: [
      'Connect alumni across generations and geographical boundaries',
      'Facilitate knowledge transfer and professional development',
      'Support current students through mentorship and guidance',
      'Promote excellence in electrical engineering education and practice'
    ]
  };

  const vision = {
    title: 'Our Vision',
    icon: Eye,
    content: 'To be the leading alumni network that empowers electrical engineering professionals to create positive impact in technology, education, and society while maintaining the highest standards of excellence and integrity.',
    points: [
      'Leading platform for electrical engineering professionals',
      'Bridge between academia and industry innovation',
      'Catalyst for technological advancement in Indonesia',
      'Symbol of excellence in engineering education'
    ]
  };

  const values = [
    {
      title: 'Excellence',
      icon: Target,
      description: 'We strive for the highest standards in everything we do, from professional achievements to community service.'
    },
    {
      title: 'Collaboration',
      icon: Users,
      description: 'We believe in the power of working together, sharing knowledge, and supporting each other\'s growth.'
    },
    {
      title: 'Innovation',
      icon: Eye,
      description: 'We embrace creativity and forward-thinking approaches to solve complex engineering challenges.'
    },
    {
      title: 'Integrity',
      icon: Heart,
      description: 'We maintain the highest ethical standards and transparency in all our interactions and initiatives.'
    }
  ];

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Mission & Vision
          </h2>
          <p className="mt-2 text-muted-foreground">
            Our guiding principles and aspirations for the future
          </p>
        </div>

        {/* Mission and Vision Cards */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Mission Card */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <mission.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-2xl">{mission.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                {mission.content}
              </p>
              
              <h4 className="mb-4 text-lg font-semibold text-foreground">
                Key Focus Areas:
              </h4>
              <ul className="space-y-2">
                {mission.points.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Vision Card */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <vision.icon className="h-5 w-5 text-secondary" />
                </div>
                <span className="text-2xl">{vision.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                {vision.content}
              </p>
              
              <h4 className="mb-4 text-lg font-semibold text-foreground">
                Vision Elements:
              </h4>
              <ul className="space-y-2">
                {vision.points.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-secondary" />
                    <span className="text-sm text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div>
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-foreground md:text-3xl">
              Our Core Values
            </h3>
            <p className="mt-2 text-muted-foreground">
              The principles that guide our community and actions
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center transition-transform hover:scale-105">
                  <CardContent className="p-6">
                    <div className="mb-4 flex justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h4 className="mb-2 text-lg font-semibold text-foreground">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}