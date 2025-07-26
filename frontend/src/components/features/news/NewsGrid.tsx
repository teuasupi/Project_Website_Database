import { NewsArticle } from '@/types/content';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { NewsCard } from './NewsCard';

interface NewsGridProps {
  articles: NewsArticle[];
  isLoading?: boolean;
}

export function NewsGrid({ articles, isLoading = false }: NewsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="bg-muted h-48 animate-pulse" />
            <CardContent className="p-4">
              <div className="bg-muted mb-2 h-4 animate-pulse rounded" />
              <div className="bg-muted mb-3 h-6 animate-pulse rounded" />
              <div className="space-y-2">
                <div className="bg-muted h-3 animate-pulse rounded" />
                <div className="bg-muted h-3 w-3/4 animate-pulse rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="text-muted-foreground mb-4">
          <Calendar className="mx-auto mb-4 h-12 w-12 opacity-50" />
          <h3 className="mb-2 text-lg font-medium">Belum ada berita</h3>
          <p>Belum ada berita yang tersedia saat ini.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}
