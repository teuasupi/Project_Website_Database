import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Image as ImageIcon } from 'lucide-react';
import { MediaAlbum } from '@/types/content';
import { MediaCard } from './MediaCard';

interface MediaGridProps {
  albums: MediaAlbum[];
  loading?: boolean;
}

export function MediaGrid({ albums, loading = false }: MediaGridProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <Skeleton className="h-48 w-full" />
                <div className="space-y-3 p-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (albums.length === 0) {
    return (
      <div className="py-12 text-center">
        <ImageIcon className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
        <h3 className="text-foreground mb-2 text-lg font-medium">
          Tidak ada album ditemukan
        </h3>
        <p className="text-muted-foreground">
          Coba ubah filter pencarian atau kembali lagi nanti.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6" id="gallery">
      {/* Albums Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <MediaCard key={album.id} album={album} />
        ))}
      </div>

      {/* Load More */}
      <div className="pt-8 text-center">
        <Button variant="outline" size="lg">
          Muat Lebih Banyak
        </Button>
      </div>
    </div>
  );
}
