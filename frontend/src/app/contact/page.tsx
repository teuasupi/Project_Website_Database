import { RootLayout } from '@/components/layout/RootLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { ContactForm } from '@/components/features/contact/ContactForm';
import { OfficeLocation } from '@/components/features/contact/OfficeLocation';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with IKA TEUAS UPI. Find our contact information, alumni services, and office locations.',
};

export default function ContactPage() {
  return (
    <RootLayout>
      {/* Page Header */}
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with IKA TEUAS UPI"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact', current: true },
        ]}
      />

      <Separator />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Office Location Section */}
      <OfficeLocation />
    </RootLayout>
  );
}
