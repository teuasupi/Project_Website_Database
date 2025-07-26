'use client';

import { useState, useMemo } from 'react';
import { NewsHeroSection } from '@/components/features/news/NewsHeroSection';
import { NewsGrid } from '@/components/features/news/NewsGrid';
import { NewsFilterSidebar } from '@/components/features/news/NewsFilterSidebar';
import { NewsArticle, NewsCategory, NewsFilter } from '@/types/content';

interface NewsPageContentProps {
  newsArticles: NewsArticle[];
  categories: NewsCategory[];
}

export function NewsPageContent({ newsArticles, categories }: NewsPageContentProps) {
  const [selectedFilters, setSelectedFilters] = useState<Partial<NewsFilter>>({});
  
  const featuredArticle = newsArticles[0];
  
  // Filter articles based on selected filters
  const filteredArticles = useMemo(() => {
    let filtered = newsArticles.slice(1); // Exclude featured article
    
    // Apply search filter
    if (selectedFilters.search) {
      const searchTerm = selectedFilters.search.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm) ||
          article.excerpt.toLowerCase().includes(searchTerm) ||
          article.content.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply category filter
    if (selectedFilters.category) {
      filtered = filtered.filter(
        (article) => article.category.slug === selectedFilters.category
      );
    }
    
    // Apply date range filter
    if (selectedFilters.dateFrom && selectedFilters.dateFrom.trim() !== '') {
      const fromDate = new Date(selectedFilters.dateFrom as string);
      if (!isNaN(fromDate.getTime())) {
        filtered = filtered.filter(
          (article) => new Date(article.publishedAt) >= fromDate
        );
      }
    }
    
    if (selectedFilters.dateTo && selectedFilters.dateTo.trim() !== '') {
      const toDate = new Date(selectedFilters.dateTo as string);
      if (!isNaN(toDate.getTime())) {
        filtered = filtered.filter(
          (article) => new Date(article.publishedAt) <= toDate
        );
      }
    }
    
    return filtered;
  }, [newsArticles, selectedFilters]);

  const handleFilterChange = (filters: Partial<NewsFilter>) => {
    setSelectedFilters(filters);
  };

  return (
    <>
      {/* Hero Section */}
      <NewsHeroSection featuredArticle={featuredArticle} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <NewsFilterSidebar
              categories={categories}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* News Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-foreground mb-2 text-2xl font-bold">
                Berita Terbaru
              </h2>
              <p className="text-muted-foreground">
                Ikuti perkembangan terbaru dari komunitas alumni TEUAS UPI
              </p>
              {Object.keys(selectedFilters).length > 0 && (
                <p className="text-muted-foreground mt-2 text-sm">
                  Menampilkan {filteredArticles.length} dari {newsArticles.length - 1} berita
                </p>
              )}
            </div>

            <NewsGrid articles={filteredArticles} />
          </div>
        </div>
      </div>
    </>
  );
}