import { MediaAlbum } from '@/types/content';
import { MediaCard } from '@/components/features/cards';

interface RelatedAlbumsProps {
  albums: MediaAlbum[];
}

export function RelatedAlbums({ albums }: RelatedAlbumsProps) {
  if (albums.length === 0) {
    return null;
  }

  return (
    <div className="bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-foreground mb-6 text-2xl font-bold">
          Album Terkait
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-4">
          {albums.map((album) => (
            <MediaCard key={album.id} album={album} />
          ))}
        </div>
      </div>
    </div>
  );
}
