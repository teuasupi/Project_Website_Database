import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Search,
  X,
  Calendar,
  Image as ImageIcon,
  Video,
  User,
  Tag,
} from 'lucide-react';

interface MediaFilterSidebarProps {
  onFilterChange?: (filters: MediaFilters) => void;
}

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

const MEDIA_TYPES = [
  { id: 'image', label: 'Foto', icon: ImageIcon },
  { id: 'video', label: 'Video', icon: Video },
];

const POPULAR_TAGS = [
  'workshop',
  'seminar',
  'reuni',
  'alumni',
  'networking',
  'teknologi',
  'AI',
  'IoT',
  'graduation',
  'conference',
];

const CREATORS = [
  'Admin IKA TEUAS',
  'Tim Humas IKA TEUAS',
  'Divisi Dokumentasi',
  'Panitia Acara',
];

export function MediaFilterSidebar({
  onFilterChange,
}: MediaFilterSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    emitFilterChange();
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked
      ? [...selectedTypes, type]
      : selectedTypes.filter((t) => t !== type);
    setSelectedTypes(newTypes);
    emitFilterChange();
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    const newTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(newTags);
    emitFilterChange();
  };

  const handleCreatorChange = (creator: string, checked: boolean) => {
    const newCreators = checked
      ? [...selectedCreators, creator]
      : selectedCreators.filter((c) => c !== creator);
    setSelectedCreators(newCreators);
    emitFilterChange();
  };

  const emitFilterChange = () => {
    if (onFilterChange) {
      onFilterChange({
        search: searchTerm,
        type: selectedTypes,
        tags: selectedTags,
        dateRange: {
          from: dateFrom || undefined,
          to: dateTo || undefined,
        },
        creator: selectedCreators,
      });
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedTypes([]);
    setSelectedTags([]);
    setSelectedCreators([]);
    setDateFrom('');
    setDateTo('');
    emitFilterChange();
  };

  const getActiveFilterCount = () => {
    return (
      selectedTypes.length +
      selectedTags.length +
      selectedCreators.length +
      (dateFrom ? 1 : 0) +
      (dateTo ? 1 : 0) +
      (searchTerm ? 1 : 0)
    );
  };

  const removeFilter = (type: string, value: string) => {
    switch (type) {
      case 'type':
        setSelectedTypes((prev) => prev.filter((t) => t !== value));
        break;
      case 'tag':
        setSelectedTags((prev) => prev.filter((t) => t !== value));
        break;
      case 'creator':
        setSelectedCreators((prev) => prev.filter((c) => c !== value));
        break;
      case 'search':
        setSearchTerm('');
        break;
      case 'dateFrom':
        setDateFrom('');
        break;
      case 'dateTo':
        setDateTo('');
        break;
    }
    emitFilterChange();
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Search className="h-4 w-4" />
            Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Cari album..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Media Type Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <ImageIcon className="h-4 w-4" />
            Jenis Media
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {MEDIA_TYPES.map((type) => {
            const IconComponent = type.icon;
            return (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type.id}`}
                  checked={selectedTypes.includes(type.id)}
                  onCheckedChange={(checked) =>
                    handleTypeChange(type.id, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`type-${type.id}`}
                  className="flex cursor-pointer items-center gap-2 text-sm font-normal"
                >
                  <IconComponent className="h-4 w-4" />
                  {type.label}
                </Label>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Tags Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Tag className="h-4 w-4" />
            Tag Populer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-2">
            {POPULAR_TAGS.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={`tag-${tag}`}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={(checked) =>
                    handleTagChange(tag, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`tag-${tag}`}
                  className="cursor-pointer text-sm font-normal"
                >
                  #{tag}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Date Range Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="h-4 w-4" />
            Rentang Tanggal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="date-from" className="text-sm">
              Dari
            </Label>
            <Input
              id="date-from"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date-to" className="text-sm">
              Sampai
            </Label>
            <Input
              id="date-to"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Creator Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-4 w-4" />
            Pembuat
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {CREATORS.map((creator) => (
            <div key={creator} className="flex items-center space-x-2">
              <Checkbox
                id={`creator-${creator}`}
                checked={selectedCreators.includes(creator)}
                onCheckedChange={(checked) =>
                  handleCreatorChange(creator, checked as boolean)
                }
              />
              <Label
                htmlFor={`creator-${creator}`}
                className="cursor-pointer text-sm font-normal"
              >
                {creator}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Active Filters */}
      {getActiveFilterCount() > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                Filter Aktif ({getActiveFilterCount()})
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs"
              >
                Hapus Semua
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <Badge variant="secondary" className="text-xs">
                  "{searchTerm}"
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 text-xs"
                    onClick={() => removeFilter('search', searchTerm)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {selectedTypes.map((type) => (
                <Badge key={type} variant="secondary" className="text-xs">
                  {MEDIA_TYPES.find((t) => t.id === type)?.label}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 text-xs"
                    onClick={() => removeFilter('type', type)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}

              {selectedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 text-xs"
                    onClick={() => removeFilter('tag', tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}

              {selectedCreators.map((creator) => (
                <Badge key={creator} variant="secondary" className="text-xs">
                  {creator}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 text-xs"
                    onClick={() => removeFilter('creator', creator)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}

              {dateFrom && (
                <Badge variant="secondary" className="text-xs">
                  Dari: {dateFrom}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 text-xs"
                    onClick={() => removeFilter('dateFrom', dateFrom)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {dateTo && (
                <Badge variant="secondary" className="text-xs">
                  Sampai: {dateTo}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 text-xs"
                    onClick={() => removeFilter('dateTo', dateTo)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
