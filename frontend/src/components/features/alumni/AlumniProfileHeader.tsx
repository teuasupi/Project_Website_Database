'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  MapPin,
  Building,
  Calendar,
  Mail,
  Phone,
  MessageCircle,
  UserPlus,
  ExternalLink,
} from 'lucide-react';
import { AlumniProfile } from '@/types/alumni';

interface AlumniProfileHeaderProps {
  alumni: AlumniProfile;
}

export function AlumniProfileHeader({ alumni }: AlumniProfileHeaderProps) {
  const currentWork = alumni.workExperience?.[0];

  return (
    <section className="bg-foreground py-12">
      <div className="container mx-auto px-4">
        <Card className="bg-background border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              {/* Profile Photo */}
              <div className="flex-shrink-0">
                <div className="border-primary/20 relative h-32 w-32 overflow-hidden rounded-full border-4 lg:h-40 lg:w-40">
                  <Image
                    src={alumni.profilePhoto || '/assets/avatars/avatar.png'}
                    alt={alumni.fullName}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-foreground text-3xl font-bold lg:text-4xl">
                    {alumni.fullName}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    {alumni.position}{' '}
                    {currentWork?.company && `at ${currentWork.company}`}
                  </p>
                </div>

                {/* Basic Info */}
                <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Lulus {alumni.graduationYear}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span>{alumni.major}</span>
                  </div>
                  {currentWork?.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{currentWork.location}</span>
                    </div>
                  )}
                </div>

                {/* Bio */}
                {alumni.bio && (
                  <p className="text-muted-foreground leading-relaxed">
                    {alumni.bio}
                  </p>
                )}

                {/* Interests */}
                {alumni.interests && alumni.interests.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {alumni.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Contact Info */}
                <div className="flex flex-wrap gap-2">
                  {alumni.privacySettings.contactInfoVisible && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`mailto:${alumni.email}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </Link>
                    </Button>
                  )}
                  {alumni.privacySettings.contactInfoVisible &&
                    alumni.phoneNumber && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`tel:${alumni.phoneNumber}`}>
                          <Phone className="mr-2 h-4 w-4" />
                          Telepon
                        </Link>
                      </Button>
                    )}
                  {alumni.socialLinks?.map((social, index) => (
                    <Button key={index} variant="outline" size="sm" asChild>
                      <Link
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {social.platform.charAt(0).toUpperCase() +
                          social.platform.slice(1)}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 lg:flex-shrink-0">
                <Button>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Kirim Pesan
                </Button>
                <Button variant="outline">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Tambah Koneksi
                </Button>
                {alumni.mentorshipInfo.isAvailableAsMentor && (
                  <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Request Mentoring
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
