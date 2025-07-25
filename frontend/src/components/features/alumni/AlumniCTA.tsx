'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, Users, MessageCircle, BookOpen } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

interface AlumniCTAProps {
  className?: string;
}

export function AlumniCTA({ className = '' }: AlumniCTAProps) {
  return (
    <section className={`bg-primary/5 py-20 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main CTA */}
          <div className="mb-16">
            <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
              Bergabung dengan Komunitas Alumni TEUAS
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Daftarkan diri Anda sebagai alumni dan nikmati berbagai manfaat eksklusif dari jaringan profesional Teknik Elektro UPI.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href={ROUTES.REGISTER}>
                  <UserPlus className="mr-2 h-5 w-5" />
                  Daftar Sebagai Alumni
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={ROUTES.CONTACT}>
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Hubungi Kami
                </Link>
              </Button>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="border-0 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Jaringan Profesional</h3>
                <p className="text-sm text-muted-foreground">
                  Terhubung dengan 5,000+ alumni di berbagai industri dan posisi strategis
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Pengembangan Karir</h3>
                <p className="text-sm text-muted-foreground">
                  Akses ke program mentorship, pelatihan, dan peluang karir eksklusif
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Berbagi Pengetahuan</h3>
                <p className="text-sm text-muted-foreground">
                  Platform untuk berbagi artikel, pengalaman, dan insight industri
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-12 rounded-lg bg-background/30 p-6 backdrop-blur-sm">
            <p className="text-sm text-muted-foreground">
              <strong>Sudah terdaftar?</strong>{' '}
              <Link href={ROUTES.LOGIN} className="text-primary hover:underline">
                Masuk ke akun Anda
              </Link>{' '}
              untuk mengakses fitur lengkap direktori alumni.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}