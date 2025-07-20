import { RootLayout } from '@/components/layout/RootLayout';
import { HeroSection } from '@/components/common/HeroSection';
import { LatestNews } from '@/components/features/news/LatestNews';
import { FeaturedAlumni } from '@/components/features/alumni/FeaturedAlumni';
import { Separator } from '@/components/ui/separator';
import { AboutSection } from '@/components/features/home/AboutSection';

export default function Home() {
  return (
    <RootLayout>
      <HeroSection />
      <AboutSection />
      {/* TODO: Implement OurFocus */}
      <Separator />
      <FeaturedAlumni />
      <Separator />
      <LatestNews />
      <Separator />
    </RootLayout>
  );
}
