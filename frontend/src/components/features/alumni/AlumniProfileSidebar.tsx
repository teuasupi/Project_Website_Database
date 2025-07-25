'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Users,
  Calendar,
  Award,
  Eye,
  UserCheck,
  BookOpen,
  TrendingUp,
} from 'lucide-react';
import { AlumniProfile } from '@/types/alumni';

interface AlumniProfileSidebarProps {
  alumni: AlumniProfile;
}

export function AlumniProfileSidebar({ alumni }: AlumniProfileSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Statistik Profil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="text-muted-foreground h-4 w-4" />
              <span className="text-sm">Dilihat</span>
            </div>
            <span className="font-semibold">
              {alumni.profileViews.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="text-muted-foreground h-4 w-4" />
              <span className="text-sm">Koneksi</span>
            </div>
            <span className="font-semibold">{alumni.connectionsCount}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="text-muted-foreground h-4 w-4" />
              <span className="text-sm">Artikel</span>
            </div>
            <span className="font-semibold">{alumni.articlesCount}</span>
          </div>

          {alumni.mentorshipInfo.isAvailableAsMentor && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="text-muted-foreground h-4 w-4" />
                <span className="text-sm">Mentee</span>
              </div>
              <span className="font-semibold">{alumni.menteeCount}</span>
            </div>
          )}

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Kelengkapan Profil</span>
              <span className="font-semibold">
                {alumni.profileCompleteness}%
              </span>
            </div>
            <div className="bg-muted h-2 w-full rounded-full">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${alumni.profileCompleteness}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mentorship Info */}
      {alumni.mentorshipInfo.isAvailableAsMentor && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Informasi Mentoring
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Badge variant="default" className="bg-green-100 text-green-800">
                ✓ Tersedia untuk Mentoring
              </Badge>

              <div className="space-y-1 text-sm">
                <p>
                  <strong>Bidang Keahlian:</strong>
                </p>
                <div className="flex flex-wrap gap-1">
                  {alumni.mentorshipInfo.mentorshipAreas.map((area, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>Kapasitas Mentee:</span>
                <span className="font-semibold">
                  {alumni.mentorshipInfo.currentMentees}/
                  {alumni.mentorshipInfo.maxMentees}
                </span>
              </div>

              {alumni.mentorshipInfo.mentoringExperience && (
                <div className="text-sm">
                  <p>
                    <strong>Pengalaman:</strong>
                  </p>
                  <p className="text-muted-foreground">
                    {alumni.mentorshipInfo.mentoringExperience}
                  </p>
                </div>
              )}
            </div>

            <Button
              className="w-full"
              disabled={
                alumni.mentorshipInfo.currentMentees >=
                alumni.mentorshipInfo.maxMentees
              }
            >
              <Calendar className="mr-2 h-4 w-4" />
              {alumni.mentorshipInfo.currentMentees >=
              alumni.mentorshipInfo.maxMentees
                ? 'Kapasitas Penuh'
                : 'Request Mentoring'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Verification Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Status Verifikasi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Status Akun:</span>
            <Badge
              variant={
                alumni.verificationStatus === 'verified'
                  ? 'default'
                  : 'secondary'
              }
              className={
                alumni.verificationStatus === 'verified'
                  ? 'bg-green-100 text-green-800'
                  : ''
              }
            >
              {alumni.verificationStatus === 'verified'
                ? '✓ Terverifikasi'
                : alumni.verificationStatus === 'pending'
                  ? 'Menunggu'
                  : 'Ditolak'}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Status Profil:</span>
            <Badge
              variant={
                alumni.accountStatus === 'active' ? 'default' : 'secondary'
              }
              className={
                alumni.accountStatus === 'active'
                  ? 'bg-green-100 text-green-800'
                  : ''
              }
            >
              {alumni.accountStatus === 'active'
                ? 'Aktif'
                : alumni.accountStatus === 'inactive'
                  ? 'Tidak Aktif'
                  : 'Ditangguhkan'}
            </Badge>
          </div>

          {alumni.lastLoginAt && (
            <div className="text-muted-foreground text-xs">
              Terakhir aktif:{' '}
              {new Date(alumni.lastLoginAt).toLocaleDateString('id-ID')}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Visibility Notice */}
      {!alumni.privacySettings.contactInfoVisible && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <p className="text-sm text-amber-800">
              <strong>Catatan:</strong> Alumni ini membatasi visibilitas
              informasi kontak. Gunakan fitur pesan untuk berkomunikasi.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
