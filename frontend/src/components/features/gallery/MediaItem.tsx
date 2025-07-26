import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Download, Video } from 'lucide-react';
import Image from 'next/image';
import { MediaItem as MediaItemType } from '@/types/content';

interface MediaItemProps {
  item: MediaItemType;
}

export function MediaItem({ item }: MediaItemProps) {
  return (
    <Card className="group overflow-hidden p-0 transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={item.thumbnailUrl || item.url}
            alt={item.altText || item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Type indicator */}
          {item.type === 'video' && (
            <div className="absolute top-2 left-2 rounded bg-black/70 p-1 text-white backdrop-blur-sm">
              <Video className="h-3 w-3" />
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

          {/* Actions overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 text-black hover:bg-white"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 text-black hover:bg-white"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Item info */}
        <div className="p-3">
          <h3 className="text-foreground line-clamp-1 text-sm font-medium">
            {item.title}
          </h3>
          {item.capturedAt && (
            <p className="text-muted-foreground mt-1 text-xs">
              {new Date(item.capturedAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
              })}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
