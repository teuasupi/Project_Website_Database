'use client';

import { useState, useMemo } from 'react';
import { MediaHeroSection } from '@/components/features/media/MediaHeroSection';
import { MediaGrid } from '@/components/features/media/MediaGrid';
import { MediaFilterSidebar } from '@/components/features/media/MediaFilterSidebar';
import { MediaAlbum } from '@/types/content';

interface MediaFilters {
  search: string;
  type: string[];
  tags: string[];
  dateRange: {
    from?: string;
    to?: string;
  };
  creator: string[];
}

interface MediaPageContentProps {
  albums: MediaAlbum[];
}

export function MediaPageContent({ albums }: MediaPageContentProps) {
  const [selectedFilters, setSelectedFilters] = useState<MediaFilters>({
    search: '',
    type: [],
    tags: [],
    dateRange: {},
    creator: [],
  });
  
  const featuredAlbum = albums[0];
  
  // Filter albums based on selected filters
  const filteredAlbums = useMemo(() => {
    let filtered = albums.slice(1); // Exclude featured album
    
    // Apply search filter
    if (selectedFilters.search) {
      const searchTerm = selectedFilters.search.toLowerCase();
      filtered = filtered.filter(
        (album) =>
          album.title.toLowerCase().includes(searchTerm) ||
          (album.description && album.description.toLowerCase().includes(searchTerm)) ||
          album.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply type filter (this would need to be implemented based on album content)
    if (selectedFilters.type.length > 0) {
      // For now, we'll filter based on tags that might indicate type
      filtered = filtered.filter(
        (album) => selectedFilters.type.some(type => 
          album.tags.some(tag => tag.toLowerCase().includes(type))
        )
      );
    }
    
    // Apply tag filter
    if (selectedFilters.tags.length > 0) {
      filtered = filtered.filter(
        (album) => selectedFilters.tags.some(filterTag => 
          album.tags.some(tag => tag.toLowerCase().includes(filterTag.toLowerCase()))
        )
      );
    }
    
    // Apply creator filter
    if (selectedFilters.creator.length > 0) {
      filtered = filtered.filter(
        (album) => selectedFilters.creator.some(creatorFilter =>
          album.creator?.fullName.toLowerCase().includes(creatorFilter.toLowerCase())
        )
      );
    }
    
    // Apply date range filter
    if (selectedFilters.dateRange.from) {
      const fromDate = new Date(selectedFilters.dateRange.from);
      if (!isNaN(fromDate.getTime())) {
        filtered = filtered.filter(
          (album) => new Date(album.createdAt) >= fromDate
        );
      }
    }
    
    if (selectedFilters.dateRange.to) {
      const toDate = new Date(selectedFilters.dateRange.to);
      if (!isNaN(toDate.getTime())) {
        filtered = filtered.filter(
          (album) => new Date(album.createdAt) <= toDate
        );
      }
    }
    
    return filtered;
  }, [albums, selectedFilters]);

  const handleFilterChange = (filters: MediaFilters) => {
    setSelectedFilters(filters);
  };

  return (
    <>
      {/* Hero Section */}
      <MediaHeroSection featuredAlbum={featuredAlbum} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <MediaFilterSidebar onFilterChange={handleFilterChange} />
          </div>

          {/* Media Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-foreground mb-2 text-2xl font-bold">
                Album Media
              </h2>
              <p className="text-muted-foreground">
                Jelajahi koleksi foto dan video kegiatan TEUAS UPI
              </p>
              {(selectedFilters.search || 
                selectedFilters.type.length > 0 || 
                selectedFilters.tags.length > 0 || 
                selectedFilters.creator.length > 0 ||
                selectedFilters.dateRange.from ||
                selectedFilters.dateRange.to) && (
                <p className="text-muted-foreground mt-2 text-sm">
                  Menampilkan {filteredAlbums.length} dari {albums.length - 1} album
                </p>
              )}
            </div>

            <MediaGrid albums={filteredAlbums} />
          </div>
        </div>
      </div>
    </>
  );
}