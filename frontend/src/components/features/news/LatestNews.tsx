import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { formatDistanceToNow } from 'date-fns';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  featuredImage?: string;
  category: {
    name: string;
    color: string;
  };
  publishedAt: string;
  readingTime: number;
}

interface LatestNewsProps {
  title?: string;
  showViewAll?: boolean;
  maxItems?: number;
  className?: string;
}

export function LatestNews({
  title = 'Latest News & Updates',
  showViewAll = true,
  maxItems = 3,
  className = '',
}: LatestNewsProps) {
  // Mock data - would come from API in real implementation
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'IKA TEUAS UPI Hosts Annual Networking Event 2025',
      excerpt:
        'Join us for the biggest alumni gathering of the year, featuring keynote speakers, networking sessions, and career opportunities.',
      slug: 'annual-networking-event-2025',
      featuredImage: '/assets/images/image-business-1.png',
      category: {
        name: 'Events',
        color: '#3B82F6',
      },
      publishedAt: '2025-01-15T10:00:00Z',
      readingTime: 3,
    },
    {
      id: 2,
      title: 'New Scholarship Program for Engineering Students',
      excerpt:
        "We're proud to announce our new scholarship program supporting aspiring electrical engineering students from underprivileged backgrounds.",
      slug: 'new-scholarship-program-2025',
      featuredImage: '/assets/images/image-minimal-1.png',
      category: {
        name: 'Scholarships',
        color: '#10B981',
      },
      publishedAt: '2025-01-12T14:30:00Z',
      readingTime: 5,
    },
    {
      id: 3,
      title: 'Alumni Success Story: Innovation in Renewable Energy',
      excerpt:
        "Meet Sarah Wijaya, Class of 2018, who's making waves in the renewable energy sector with her groundbreaking solar panel technology.",
      slug: 'alumni-success-renewable-energy',
      featuredImage: '/assets/images/image-abstract-1.png',
      category: {
        name: 'Alumni Spotlight',
        color: '#8B5CF6',
      },
      publishedAt: '2025-01-10T09:15:00Z',
      readingTime: 4,
    },
  ];

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-3xl font-bold md:text-4xl">
              {title}
            </h2>
            <p className="text-muted-foreground mt-2">
              Stay updated with the latest news from our community
            </p>
          </div>

          {showViewAll && (
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href={ROUTES.NEWS.ROOT}>
                View All News
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.slice(0, maxItems).map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden p-0 transition-transform hover:scale-[1.02]"
            >
              {/* Featured Image */}
              {item.featuredImage && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item.featuredImage}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge
                      style={{ backgroundColor: item.category.color }}
                      className="text-white"
                    >
                      {item.category.name}
                    </Badge>
                  </div>
                </div>
              )}

              <CardHeader className="px-6 pt-6 pb-2">
                <h3 className="group-hover:text-primary line-clamp-2 text-lg leading-tight font-semibold">
                  <Link href={ROUTES.NEWS.ARTICLE(item.slug)}>
                    {item.title}
                  </Link>
                </h3>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                  {item.excerpt}
                </p>

                {/* Meta Information */}
                <div className="text-muted-foreground flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(item.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{item.readingTime} min read</span>
                    </div>
                  </div>
                </div>

                {/* Read More Link */}
                <Link
                  href={ROUTES.NEWS.ARTICLE(item.slug)}
                  className="text-primary mt-4 inline-flex items-center text-sm font-medium hover:underline"
                >
                  Read More
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile View All Button */}
        {showViewAll && (
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href={ROUTES.NEWS.ROOT}>
                View All News
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
