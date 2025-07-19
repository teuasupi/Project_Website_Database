import { RootLayout } from '@/components/layout/RootLayout';
import { HeroSection } from '@/components/common/HeroSection';
import { LatestNews } from '@/components/features/news/LatestNews';
import { FeaturedAlumni } from '@/components/features/alumni/FeaturedAlumni';
import { UpcomingEvents } from '@/components/features/events/UpcomingEvents';

export default function Home() {
  return (
    <RootLayout>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Latest News Section */}
      <LatestNews />
      
      {/* Featured Alumni Section */}
      <FeaturedAlumni />
      
      {/* Upcoming Events Section */}
      <UpcomingEvents />
    </RootLayout>
  );
}
