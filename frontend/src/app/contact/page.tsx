import { PageHeader } from '@/components/common/PageHeader';
import { ContactForm } from '@/components/features/contact/ContactForm';
import { OfficeLocation } from '@/components/features/contact/OfficeLocation';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Hubungi Kami',
  description:
    'Hubungi IKA TEUAS UPI. Temukan informasi kontak kami, layanan alumni, dan lokasi kantor.',
};

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Hubungi Kami"
        subtitle="Hubungi IKA TEUAS UPI"
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Kontak', current: true },
        ]}
      />

      <Separator />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Office Location Section */}
      <OfficeLocation />
    </>
  );
}
