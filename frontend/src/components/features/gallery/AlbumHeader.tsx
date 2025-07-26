import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Calendar,
  User,
  Download,
  Share2,
  Eye,
  Image as ImageIcon,
  Video,
} from 'lucide-react';
import Image from 'next/image';
import { MediaAlbum } from '@/types/content';

interface AlbumHeaderProps {
  album: MediaAlbum;
  photoCount: number;
  videoCount: number;
}

export function AlbumHeader({
  album,
  photoCount,
  videoCount,
}: AlbumHeaderProps) {
  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Album Info */}
        <div className="space-y-6 lg:col-span-2">
          <div className="space-y-4">
            <h1 className="text-foreground text-3xl leading-tight font-bold lg:text-4xl">
              {album.title}
            </h1>

            {album.description && (
              <p className="text-muted-foreground text-lg">
                {album.description}
              </p>
            )}

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground">
                  {new Date(album.createdAt).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <User className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground">
                  {album.creator?.fullName || 'Admin'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <ImageIcon className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground">{photoCount} Foto</span>
              </div>

              {videoCount > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Video className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground">
                    {videoCount} Video
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm">
                <Eye className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground">1.2K views</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download Album
              </Button>

              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Bagikan
              </Button>
            </div>

            {/* Tags */}
            {album.tags.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-muted-foreground text-sm font-medium">
                  Tags:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {album.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Album Cover */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden p-0">
            <CardContent className="p-0">
              <div className="relative h-64 lg:h-80">
                <Image
                  src={album.coverImage || '/images/placeholder-album.jpg'}
                  alt={album.title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Item count overlay */}
                <div className="absolute top-4 right-4 rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                  {album.itemCount} item{album.itemCount > 1 ? 's' : ''}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
