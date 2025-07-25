'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
  Star,
} from 'lucide-react';
import { AlumniProfile } from '@/types/alumni';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface AlumniProfileContentProps {
  alumni: AlumniProfile;
}

export function AlumniProfileContent({ alumni }: AlumniProfileContentProps) {
  return (
    <div className="space-y-6">
      {/* Work Experience */}
      {alumni.privacySettings.workInfoVisible &&
        alumni.workExperience &&
        alumni.workExperience.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Pengalaman Kerja
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {alumni.workExperience.map((work, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold">{work.position}</h3>
                    <p className="text-primary font-medium">{work.company}</p>
                    <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {format(new Date(work.startDate), 'MMM yyyy', {
                            locale: id,
                          })}{' '}
                          -{' '}
                          {work.endDate
                            ? format(new Date(work.endDate), 'MMM yyyy', {
                                locale: id,
                              })
                            : 'Sekarang'}
                        </span>
                      </div>
                      {work.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{work.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {work.description && (
                    <p className="text-muted-foreground leading-relaxed">
                      {work.description}
                    </p>
                  )}
                  {index < alumni.workExperience.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

      {/* Skills */}
      {alumni.skills && alumni.skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Keahlian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {alumni.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{skill.name}</h4>
                    <p className="text-muted-foreground text-sm capitalize">
                      {skill.level}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        skill.level === 'expert' ? 'default' : 'secondary'
                      }
                    >
                      {skill.level === 'expert'
                        ? 'Ahli'
                        : skill.level === 'advanced'
                          ? 'Mahir'
                          : skill.level === 'intermediate'
                            ? 'Menengah'
                            : 'Pemula'}
                    </Badge>
                    {skill.verified && (
                      <Badge
                        variant="outline"
                        className="border-green-600 text-green-600"
                      >
                        ✓ Terverifikasi
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certifications */}
      {alumni.certifications && alumni.certifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Sertifikasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alumni.certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-start justify-between rounded-lg border p-4"
              >
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold">{cert.name}</h4>
                  <p className="text-primary">{cert.issuer}</p>
                  <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                    <span>
                      Diterbitkan:{' '}
                      {format(new Date(cert.issueDate), 'MMM yyyy', {
                        locale: id,
                      })}
                    </span>
                    {cert.expiryDate && (
                      <span>
                        Berlaku hingga:{' '}
                        {format(new Date(cert.expiryDate), 'MMM yyyy', {
                          locale: id,
                        })}
                      </span>
                    )}
                  </div>
                  {cert.credentialId && (
                    <p className="text-muted-foreground text-xs">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>
                {cert.credentialUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Pendidikan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              Universitas Pendidikan Indonesia
            </h3>
            <p className="text-primary font-medium">{alumni.major}</p>
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <Calendar className="h-4 w-4" />
              <span>Lulus {alumni.graduationYear}</span>
            </div>
            {alumni.nim && (
              <p className="text-muted-foreground text-sm">NIM: {alumni.nim}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Languages */}
      {alumni.languages && alumni.languages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Bahasa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {alumni.languages.map((language, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <span className="font-medium">{language.name}</span>
                  <Badge variant="secondary" className="capitalize">
                    {language.level === 'native'
                      ? 'Asli'
                      : language.level === 'advanced'
                        ? 'Mahir'
                        : language.level === 'intermediate'
                          ? 'Menengah'
                          : 'Dasar'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
