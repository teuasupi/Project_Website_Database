import { EventCategory, EventFilter } from '@/types/content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Separator } from '@/components/ui/separator';
import { Search, Filter, X, Calendar } from 'lucide-react';
import { useState } from 'react';

interface EventsFilterSidebarProps {
  categories: EventCategory[];
  selectedFilters: Partial<EventFilter>;
  onFilterChange: (filters: Partial<EventFilter>) => void;
}

export function EventsFilterSidebar({
  categories,
  selectedFilters,
  onFilterChange,
}: EventsFilterSidebarProps) {
  const [searchTerm, setSearchTerm] = useState(selectedFilters.search || '');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onFilterChange({ ...selectedFilters, search: value });
  };

  const handleCategoryFilter = (categorySlug: string) => {
    const newCategory =
      selectedFilters.category === categorySlug ? undefined : categorySlug;
    onFilterChange({ ...selectedFilters, category: newCategory });
  };

  const handleStatusFilter = (status: string) => {
    const newStatus = selectedFilters.status === status ? undefined : status;
    onFilterChange({ ...selectedFilters, status: newStatus });
  };

  const clearFilters = () => {
    setSearchTerm('');
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(selectedFilters).some(
    (key) => selectedFilters[key as keyof EventFilter] !== undefined
  );

  const eventStatuses = [
    { value: 'upcoming', label: 'Mendatang' },
    { value: 'ongoing', label: 'Sedang Berlangsung' },
    { value: 'completed', label: 'Selesai' },
  ];

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Search className="h-5 w-5" />
            Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Cari acara..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Kategori
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedFilters.category === category.slug
                    ? 'default'
                    : 'ghost'
                }
                size="sm"
                className="w-full justify-start"
                onClick={() => handleCategoryFilter(category.slug)}
              >
                <div
                  className="mr-2 h-3 w-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                {category.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Date Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5" />
            Filter Tanggal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="dateFrom" className="text-sm font-medium">
              Dari Tanggal
            </Label>
            <Input
              id="dateFrom"
              type="date"
              value={selectedFilters.dateFrom || ''}
              onChange={(e) =>
                onFilterChange({
                  ...selectedFilters,
                  dateFrom: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="dateTo" className="text-sm font-medium">
              Sampai Tanggal
            </Label>
            <Input
              id="dateTo"
              type="date"
              value={selectedFilters.dateTo || ''}
              onChange={(e) =>
                onFilterChange({
                  ...selectedFilters,
                  dateTo: e.target.value,
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {hasActiveFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedFilters.search && (
                <Badge
                  variant="secondary"
                  className="flex w-fit items-center gap-1"
                >
                  Pencarian: "{selectedFilters.search}"
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleSearchChange('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {selectedFilters.category && (
                <Badge
                  variant="secondary"
                  className="flex w-fit items-center gap-1"
                >
                  Kategori:{' '}
                  {
                    categories.find((c) => c.slug === selectedFilters.category)
                      ?.name
                  }
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() =>
                      handleCategoryFilter(selectedFilters.category!)
                    }
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {selectedFilters.status && (
                <Badge
                  variant="secondary"
                  className="flex w-fit items-center gap-1"
                >
                  Status:{' '}
                  {
                    eventStatuses.find(
                      (s) => s.value === selectedFilters.status
                    )?.label
                  }
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleStatusFilter(selectedFilters.status!)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              <Separator />

              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="w-full"
              >
                <X className="mr-2 h-4 w-4" />
                Hapus Semua Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
