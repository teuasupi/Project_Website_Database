import { RootLayout } from '@/components/layout/RootLayout';
import { HeroSection } from '@/components/common/HeroSection';
import { StatisticsSection } from '@/components/features/home/StatisticsSection';
import { LatestNews } from '@/components/features/news/LatestNews';
import { FeaturedAlumni } from '@/components/features/alumni/FeaturedAlumni';
import { UpcomingEvents } from '@/components/features/events/UpcomingEvents';
import { AlumniServices } from '@/components/features/contact/AlumniServices';
import { FAQ } from '@/components/features/home/FAQ';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <RootLayout>
      {/* Hero Section */}
      <HeroSection />

      {/* Statistics Section */}
      <StatisticsSection />

      <Separator />

      {/* Latest News Section */}
      <UpcomingEvents />

      <Separator />

      {/* Featured Alumni Section */}
      <FeaturedAlumni />

      {/* Alumni Services Section */}
      <AlumniServices />

      <Separator />

      <LatestNews />

      <Separator />

      {/* FAQ Section */}
      <FAQ />

      {/* Upcoming Events Section */}
    </RootLayout>
  );
}
