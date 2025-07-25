'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Linkedin,
  GraduationCap,
  Award,
  Users,
  Building,
} from 'lucide-react';
import Link from 'next/link';

interface LeadershipMember {
  name: string;
  position: string;
  bio: string;
  photo?: string;
  email?: string;
  linkedin?: string;
  phone?: string;
  graduationYear?: number;
  currentCompany?: string;
  achievements?: string[];
  specialization?: string;
}

interface LeadershipTeamProps {
  className?: string;
}

export function LeadershipTeam({ className = '' }: LeadershipTeamProps) {
  const leadershipMembers: LeadershipMember[] = [
    {
      name: 'Dr. Ahmad Suryadi, S.T., M.T.',
      position: 'Ketua',
      bio: 'Memimpin organisasi dengan pengalaman lebih dari 20 tahun dalam teknik elektro dan hubungan alumni. Bersemangat dalam memupuk koneksi antara akademia dan industri.',
      photo: '/assets/avatars/avatar-1.png',
      email: 'chairman@ikateuas.upi.edu',
      linkedin: 'https://linkedin.com/in/ahmad-suryadi',
      graduationYear: 1998,
      currentCompany: 'PT. Teknologi Listrik Indonesia',
      achievements: [
        'Anggota Senior IEEE',
        'Penghargaan Alumni Terbaik 2020',
        'Penghargaan Inovasi Industri',
      ],
      specialization: 'Sistem Tenaga',
    },
    {
      name: 'Ir. Siti Nurhaliza, M.T.',
      position: 'Wakil Ketua',
      bio: 'Berdedikasi untuk memajukan program pengembangan profesional dan inisiatif mentoring. Ahli dalam telekomunikasi dan infrastruktur jaringan.',
      photo: '/assets/avatars/avatar-2.png',
      email: 'vice.chairman@ikateuas.upi.edu',
      linkedin: 'https://linkedin.com/in/siti-nurhaliza',
      graduationYear: 2001,
      currentCompany: 'Telkom Indonesia',
      achievements: [
        'Penghargaan Keunggulan Telekomunikasi',
        'Pemimpin Wanita dalam Teknik',
        'Inovasi dalam Desain Jaringan',
      ],
      specialization: 'Telekomunikasi',
    },
    {
      name: 'Budi Santoso, S.T., M.Eng.',
      position: 'Sekretaris Jenderal',
      bio: 'Memastikan operasi yang lancar dan komunikasi efektif dalam organisasi. Spesialis dalam sistem kontrol dan otomasi industri.',
      photo: '/assets/avatars/avatar-3.png',
      email: 'secretary@ikateuas.upi.edu',
      graduationYear: 2003,
      currentCompany: 'Schneider Electric Indonesia',
      achievements: [
        'Penghargaan Keunggulan Otomasi',
        'Pemimpin Pengembangan Profesional',
        'Pelopor Industri 4.0',
      ],
      specialization: 'Sistem Kontrol',
    },
    {
      name: 'Dr. Rina Kartika, S.T., M.T.',
      position: 'Bendahara',
      bio: 'Mengelola sumber daya keuangan dan program beasiswa dengan transparansi dan akuntabilitas. Ahli dalam sistem energi terbarukan.',
      photo: '/assets/avatars/avatar-4.png',
      email: 'treasurer@ikateuas.upi.edu',
      linkedin: 'https://linkedin.com/in/rina-kartika',
      graduationYear: 2000,
      currentCompany: 'PT. Energi Terbarukan Nusantara',
      achievements: [
        'Pelopor Energi Terbarukan',
        'Keunggulan Manajemen Keuangan',
        'Penghargaan Kepemimpinan Berkelanjutan',
      ],
      specialization: 'Energi Terbarukan',
    },
    {
      name: 'Dedi Kurniawan, S.T., M.T.',
      position: 'Kepala Hubungan Alumni',
      bio: 'Membangun dan memelihara hubungan kuat dengan alumni di seluruh dunia. Bersemangat dalam menciptakan peluang jaringan dan pengembangan karir.',
      photo: '/assets/avatars/avatar-5.png',
      email: 'alumni.relations@ikateuas.upi.edu',
      graduationYear: 2005,
      currentCompany: 'PT. Siemens Indonesia',
      achievements: [
        'Keunggulan Keterlibatan Alumni',
        'Pembangun Jaringan Global',
        'Mentor Pengembangan Karir',
      ],
      specialization: 'Elektronika',
    },
    {
      name: 'Maya Sari, S.T., M.T.',
      position: 'Kepala Program',
      bio: 'Mengembangkan dan menerapkan program pendidikan, workshop, dan inisiatif pengembangan profesional untuk komunitas alumni.',
      photo: '/assets/avatars/avatar-6.png',
      email: 'programs@ikateuas.upi.edu',
      linkedin: 'https://linkedin.com/in/maya-sari',
      graduationYear: 2004,
      currentCompany: 'General Electric Indonesia',
      achievements: [
        'Keunggulan Pengembangan Program',
        'Penghargaan Inovasi Pendidikan',
        'Pemimpin Dampak Komunitas',
      ],
      specialization: 'Elektronika Daya',
    },
  ];

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-foreground text-3xl font-bold md:text-4xl">
            Tim Kepemimpinan
          </h2>
          <p className="text-muted-foreground mt-2">
            Temui para profesional berdedikasi yang memimpin komunitas alumni kami
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {leadershipMembers.map((member, index) => (
            <Card
              key={index}
              className="group transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader className="text-center">
                {/* Profile Photo */}
                <div className="from-primary/20 to-secondary/20 mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full bg-gradient-to-br">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback =
                          target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className="text-primary flex h-full w-full items-center justify-center text-2xl font-bold"
                    style={{ display: member.photo ? 'none' : 'flex' }}
                  >
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                </div>

                <CardTitle className="text-lg">{member.name}</CardTitle>
                <Badge variant="secondary" className="mx-auto w-fit">
                  {member.position}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Bio */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>

                {/* Details */}
                <div className="space-y-2">
                  {member.graduationYear && (
                    <div className="flex items-center space-x-2 text-sm">
                      <GraduationCap className="text-primary h-4 w-4" />
                      <span className="text-muted-foreground">
                        Angkatan {member.graduationYear}
                      </span>
                    </div>
                  )}

                  {member.specialization && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Award className="text-primary h-4 w-4" />
                      <span className="text-muted-foreground">
                        {member.specialization}
                      </span>
                    </div>
                  )}

                  {member.currentCompany && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Building className="text-primary h-4 w-4" />
                      <span className="text-muted-foreground">
                        {member.currentCompany}
                      </span>
                    </div>
                  )}
                </div>

                {/* Achievements */}
                {member.achievements && member.achievements.length > 0 && (
                  <div>
                    <h4 className="text-foreground mb-2 text-sm font-semibold">
                      Pencapaian Utama:
                    </h4>
                    <ul className="space-y-1">
                      {member.achievements
                        .slice(0, 3)
                        .map((achievement, idx) => (
                          <li
                            key={idx}
                            className="flex items-start space-x-2 text-xs"
                          >
                            <div className="bg-primary mt-1.5 h-1.5 w-1.5 rounded-full" />
                            <span className="text-muted-foreground">
                              {achievement}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Contact Information */}
                <div className="border-t pt-4">
                  <div className="flex flex-wrap gap-2">
                    {member.email && (
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`mailto:${member.email}`}>
                          <Mail className="mr-1 h-3 w-3" />
                          Email
                        </Link>
                      </Button>
                    )}

                    {member.linkedin && (
                      <Button size="sm" variant="outline" asChild>
                        <Link
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="mr-1 h-3 w-3" />
                          LinkedIn
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Advisory Board Section */}
        <div className="mt-16">
          <div className="mb-8 text-center">
            <h3 className="text-foreground text-2xl font-bold">
              Dewan Penasihat
            </h3>
            <p className="text-muted-foreground mt-2">
              Alumni terhormat yang memberikan bimbingan strategis
            </p>
          </div>

          <Card className="from-primary/5 to-secondary/5 bg-gradient-to-r">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="text-center">
                  <Users className="text-primary mx-auto mb-2 h-8 w-8" />
                  <h4 className="text-foreground font-semibold">
                    Prof. Dr. Ir. Bambang Riyanto
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Penasihat Senior - Keunggulan Akademik
                  </p>
                </div>

                <div className="text-center">
                  <Building className="text-primary mx-auto mb-2 h-8 w-8" />
                  <h4 className="text-foreground font-semibold">
                    Ir. Soekarno Hatta, M.T.
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Penasihat Hubungan Industri
                  </p>
                </div>

                <div className="text-center">
                  <Award className="text-primary mx-auto mb-2 h-8 w-8" />
                  <h4 className="text-foreground font-semibold">
                    Dr. Ir. Kartini Sari, M.Eng.
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Penasihat Penelitian & Inovasi
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Leadership */}
        <div className="mt-12 text-center">
          <h3 className="text-foreground mb-4 text-xl font-bold">
            Hubungi Tim Kepemimpinan
          </h3>
          <p className="text-muted-foreground mb-6">
            Ada pertanyaan atau saran? Tim kepemimpinan kami siap membantu.
          </p>
          <Button asChild>
            <Link href="/contact">Hubungi Tim Kepemimpinan</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
