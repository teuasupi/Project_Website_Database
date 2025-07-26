import { Button } from '@/components/ui/button';
import { Grid3X3, List, Image as ImageIcon } from 'lucide-react';
import { MediaItem as MediaItemType } from '@/types/content';
import { MediaItem } from './MediaItem';

interface MediaGridProps {
  items: MediaItemType[];
}

export function MediaGrid({ items }: MediaGridProps) {
  return (
    <div className="container mx-auto px-4 pb-12">
      <div className="space-y-6">
        {/* Grid Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-foreground text-2xl font-bold">
            Media ({items.length})
          </h2>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Media Items */}
        {items.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {items.map((item) => (
              <MediaItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <ImageIcon className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h3 className="text-foreground mb-2 text-lg font-medium">
              Album ini belum memiliki media
            </h3>
            <p className="text-muted-foreground">
              Media akan ditampilkan di sini setelah diunggah.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
