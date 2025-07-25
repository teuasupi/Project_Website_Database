import { PageHeader } from '@/components/common/PageHeader';
import { AlumniDirectory } from '@/components/features/alumni/AlumniDirectory';
import { AlumniStats } from '@/components/features/alumni/AlumniStats';
import { AlumniCTA } from '@/components/features/alumni/AlumniCTA';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Direktori Alumni | IKA TEUAS UPI',
  description:
    'Temukan dan terhubung dengan alumni Teknik Elektro UPI. Jelajahi profil alumni, bangun koneksi profesional, dan bergabung dengan komunitas yang kuat.',
};

export default function AlumniDirectoryPage() {
  const breadcrumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Alumni', current: true },
  ];

  return (
    <>
      <PageHeader
        title="Direktori Alumni"
        subtitle="Temukan dan terhubung dengan lebih dari 5,000+ alumni Teknik Elektro UPI di seluruh dunia"
        breadcrumbs={breadcrumbs}
      />

      <AlumniStats />
      <AlumniDirectory />
      <Separator />
      <AlumniCTA />
    </>
  );
}
