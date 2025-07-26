import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Calendar,
  User,
  Download,
  Share2,
  ArrowLeft,
  Eye,
  Image as ImageIcon,
  Video,
  Grid3X3,
  List,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES, APP_CONFIG } from '@/lib/constants';
import { MOCK_MEDIA_ALBUMS, MOCK_MEDIA_ITEMS } from '@/lib/constants/content';

interface AlbumDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: AlbumDetailPageProps): Promise<Metadata> {
  // In real implementation, this would fetch from API
  const album = MOCK_MEDIA_ALBUMS.find((a) => a.slug === params.slug);

  if (!album) {
    return {
      title: 'Album Tidak Ditemukan',
    };
  }

  return {
    title: `${album.title} | Galeri | ${APP_CONFIG.name}`,
    description: album.description,
    openGraph: {
      title: album.title,
      description: album.description,
      type: 'article',
      images: album.coverImage ? [album.coverImage] : undefined,
    },
  };
}

export default function AlbumDetailPage({ params }: AlbumDetailPageProps) {
  // In real implementation, this would fetch from API
  const album = MOCK_MEDIA_ALBUMS.find((a) => a.slug === params.slug);

  if (!album) {
    notFound();
  }

  // Filter media items for this album
  const albumItems = MOCK_MEDIA_ITEMS.filter(
    (item) => item.albumId === album.id
  );
  const photoCount = albumItems.filter((item) => item.type === 'image').length;
  const videoCount = albumItems.filter((item) => item.type === 'video').length;

  const breadcrumbItems = [
    { label: 'Beranda', href: ROUTES.HOME },
    { label: 'Galeri', href: ROUTES.GALLERY.ROOT },
    { label: album.title, href: ROUTES.GALLERY.ALBUM(album.slug) },
  ];

  const relatedAlbums = MOCK_MEDIA_ALBUMS.filter(
    (a) => a.id !== album.id
  ).slice(0, 3);

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <BreadcrumbItem>
                    {index < breadcrumbItems.length - 1 ? (
                      <BreadcrumbLink asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="line-clamp-1">
                        {item.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbItems.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={ROUTES.GALLERY.ROOT}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Galeri
          </Link>
        </Button>
      </div>

      {/* Album Header */}
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
                  <span className="text-muted-foreground">
                    {photoCount} Foto
                  </span>
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
                    {album.tags.map((tag) => (
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
            <Card className="overflow-hidden">
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

      {/* Media Grid */}
      <div className="container mx-auto px-4 pb-12">
        <div className="space-y-6">
          {/* Grid Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-foreground text-2xl font-bold">
              Media ({albumItems.length})
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
          {albumItems.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {albumItems.map((item) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
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
                          {new Date(item.capturedAt).toLocaleDateString(
                            'id-ID',
                            {
                              day: 'numeric',
                              month: 'short',
                            }
                          )}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
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

      {/* Related Albums */}
      {relatedAlbums.length > 0 && (
        <div className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-foreground mb-6 text-2xl font-bold">
              Album Terkait
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedAlbums.map((relatedAlbum) => (
                <Link
                  key={relatedAlbum.id}
                  href={ROUTES.GALLERY.ALBUM(relatedAlbum.slug)}
                  className="group block"
                >
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-0">
                      <div className="relative h-32 overflow-hidden">
                        <Image
                          src={
                            relatedAlbum.coverImage ||
                            '/images/placeholder-album.jpg'
                          }
                          alt={relatedAlbum.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        <div className="absolute top-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          {relatedAlbum.itemCount} items
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-foreground group-hover:text-primary line-clamp-1 font-medium transition-colors">
                          {relatedAlbum.title}
                        </h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {new Date(relatedAlbum.createdAt).toLocaleDateString(
                            'id-ID',
                            {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            }
                          )}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
