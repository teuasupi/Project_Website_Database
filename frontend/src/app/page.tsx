import { RootLayout } from '@/components/layout/RootLayout';
import { HeroSection } from '@/components/common/HeroSection';
import { LatestNews } from '@/components/features/news/LatestNews';
import { FeaturedAlumni } from '@/components/features/alumni/FeaturedAlumni';
import { Separator } from '@/components/ui/separator';
import { AboutSection } from '@/components/features/home/AboutSection';
import { OurFocus } from '@/components/features/home/OurFocus';
import { APP_CONFIG } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Home | ${APP_CONFIG.name}`,
  description: `${APP_CONFIG.shortDescription}. Join our community of ${APP_CONFIG.fullName} graduates and connect with fellow electrical engineering professionals.`,
  openGraph: {
    title: `${APP_CONFIG.name} - Alumni Network`,
    description: `${APP_CONFIG.shortDescription}. Join our community of ${APP_CONFIG.fullName} graduates and connect with fellow electrical engineering professionals.`,
    url: APP_CONFIG.url,
    type: 'website',
    images: [
      {
        url: '/assets/hero/background.png',
        width: 1200,
        height: 630,
        alt: `${APP_CONFIG.fullName} - Connect with Alumni`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    title: `${APP_CONFIG.name} - Alumni Network`,
    description: `${APP_CONFIG.shortDescription}. Join our community of ${APP_CONFIG.fullName} graduates.`,
    images: ['/assets/hero/background.png'],
  },
};

export default function Home() {
  return (
    <RootLayout>
      <HeroSection />
      <AboutSection />
      <Separator />
      <OurFocus />
      <Separator />
      <FeaturedAlumni />
      <Separator />
      <LatestNews />
    </RootLayout>
  );
}
