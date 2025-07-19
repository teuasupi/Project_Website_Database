import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, MapPin, Building, Calendar } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

interface FeaturedAlumnus {
  id: number;
  fullName: string;
  graduationYear: number;
  major: string;
  currentCompany: string;
  position: string;
  location: string;
  profilePhoto?: string;
  bio: string;
  achievements: string[];
}

interface FeaturedAlumniProps {
  title?: string;
  showViewAll?: boolean;
  maxItems?: number;
  className?: string;
}

export function FeaturedAlumni({
  title = "Featured Alumni",
  showViewAll = true,
  maxItems = 3,
  className = "",
}: FeaturedAlumniProps) {
  // Mock data - would come from API in real implementation
  const featuredAlumni: FeaturedAlumnus[] = [
    {
      id: 1,
      fullName: "Dr. Ahmad Santoso",
      graduationYear: 2010,
      major: "Teknik Elektro",
      currentCompany: "Tesla Inc.",
      position: "Senior Electrical Engineer",
      location: "Palo Alto, California",
      profilePhoto: "/assets/avatars/avatar-1.png",
      bio: "Leading innovation in electric vehicle technology with a focus on battery management systems.",
      achievements: [
        "Led development of Tesla Model Y battery system",
        "Published 15+ research papers on energy storage",
        "Recipient of IEEE Outstanding Engineer Award 2023"
      ]
    },
    {
      id: 2,
      fullName: "Sarah Wijaya, M.Eng",
      graduationYear: 2015,
      major: "Teknik Elektronika",
      currentCompany: "Google",
      position: "Principal Hardware Engineer",
      location: "Mountain View, California",
      profilePhoto: "/assets/avatars/avatar-2.png",
      bio: "Pioneering next-generation computing hardware and AI chip architectures.",
      achievements: [
        "Key contributor to Google Tensor chip development",
        "Patents holder in AI accelerator technology",
        "Speaker at major tech conferences worldwide"
      ]
    },
    {
      id: 3,
      fullName: "Rizki Pratama",
      graduationYear: 2012,
      major: "Teknik Telekomunikasi",
      currentCompany: "Gojek",
      position: "VP of Engineering",
      location: "Jakarta, Indonesia",
      profilePhoto: "/assets/avatars/avatar-3.png",
      bio: "Building scalable technology solutions that impact millions of users across Southeast Asia.",
      achievements: [
        "Scaled Gojek's platform to 50+ million users",
        "Led digital transformation initiatives",
        "Named in Forbes 30 Under 30 Asia 2020"
      ]
    }
  ];

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section className={`bg-muted/50 py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-muted-foreground">
            Celebrating our alumni making impact around the world
          </p>
        </div>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredAlumni.slice(0, maxItems).map((alumnus, index) => (
            <Card key={alumnus.id} className="group overflow-hidden transition-all hover:shadow-lg">
              <CardContent className="p-6">
                {/* Profile Section */}
                <div className="mb-4 flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage 
                      src={alumnus.profilePhoto} 
                      alt={alumnus.fullName}
                    />
                    <AvatarFallback className="text-lg">
                      {getUserInitials(alumnus.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
                      {alumnus.fullName}
                    </h3>
                    <p className="text-sm font-medium text-primary">
                      {alumnus.position}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {alumnus.currentCompany}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                  {alumnus.bio}
                </p>

                {/* Meta Information */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-2 h-3 w-3" />
                    <span>Class of {alumnus.graduationYear} • {alumnus.major}</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="mr-2 h-3 w-3" />
                    <span>{alumnus.location}</span>
                  </div>
                </div>

                {/* Key Achievements */}
                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-medium text-foreground">
                    Key Achievements:
                  </h4>
                  <ul className="space-y-1">
                    {alumnus.achievements.slice(0, 2).map((achievement, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground">
                        • {achievement}
                      </li>
                    ))}
                    {alumnus.achievements.length > 2 && (
                      <li className="text-xs text-muted-foreground">
                        • +{alumnus.achievements.length - 2} more achievements
                      </li>
                    )}
                  </ul>
                </div>

                {/* View Profile Link */}
                <Link
                  href={ROUTES.ALUMNI.PROFILE(alumnus.id.toString())}
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  View Full Profile
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href={ROUTES.ALUMNI.DIRECTORY}>
                Explore Alumni Directory
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}