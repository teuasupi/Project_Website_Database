'use client';

import { useState, useMemo } from 'react';
import { EventsHeroSection } from '@/components/features/events/EventsHeroSection';
import { EventsGrid } from '@/components/features/events/EventsGrid';
import { EventsFilterSidebar } from '@/components/features/events/EventsFilterSidebar';
import { Event, EventCategory, EventFilter } from '@/types/content';

interface EventsPageContentProps {
  events: Event[];
  categories: EventCategory[];
}

export function EventsPageContent({
  events,
  categories,
}: EventsPageContentProps) {
  const [selectedFilters, setSelectedFilters] = useState<Partial<EventFilter>>(
    {}
  );

  const featuredEvent = events[0];

  // Filter events based on selected filters
  const filteredEvents = useMemo(() => {
    let filtered = events.slice(1); // Exclude featured event

    // Apply search filter
    if (selectedFilters.search) {
      const searchTerm = selectedFilters.search.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm) ||
          event.description.toLowerCase().includes(searchTerm) ||
          event.location.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (selectedFilters.category) {
      filtered = filtered.filter(
        (event) => event.category.slug === selectedFilters.category
      );
    }

    // Apply status filter
    if (selectedFilters.status) {
      filtered = filtered.filter(
        (event) => event.status === selectedFilters.status
      );
    }

    // Apply location filter
    if (selectedFilters.location) {
      filtered = filtered.filter((event) =>
        event.location
          .toLowerCase()
          .includes(selectedFilters.location!.toLowerCase())
      );
    }

    // Apply date range filter
    if (selectedFilters.dateFrom && selectedFilters.dateFrom.trim() !== '') {
      const fromDate = new Date(selectedFilters.dateFrom as string);
      if (!isNaN(fromDate.getTime())) {
        filtered = filtered.filter(
          (event) => new Date(event.eventDate) >= fromDate
        );
      }
    }

    if (selectedFilters.dateTo && selectedFilters.dateTo.trim() !== '') {
      const toDate = new Date(selectedFilters.dateTo as string);
      if (!isNaN(toDate.getTime())) {
        filtered = filtered.filter(
          (event) => new Date(event.eventDate) <= toDate
        );
      }
    }

    // Apply registration required filter
    if (selectedFilters.requiresRegistration !== undefined) {
      filtered = filtered.filter(
        (event) =>
          event.requiresRegistration === selectedFilters.requiresRegistration
      );
    }

    return filtered;
  }, [events, selectedFilters]);

  const handleFilterChange = (filters: Partial<EventFilter>) => {
    setSelectedFilters(filters);
  };

  return (
    <>
      {/* Hero Section */}
      <EventsHeroSection featuredEvent={featuredEvent} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <EventsFilterSidebar
              categories={categories}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Events Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-foreground mb-2 text-2xl font-bold">
                Acara Mendatang
              </h2>
              <p className="text-muted-foreground">
                Temukan dan ikuti berbagai acara menarik dari komunitas alumni
                TEUAS UPI
              </p>
              {Object.keys(selectedFilters).length > 0 && (
                <p className="text-muted-foreground mt-2 text-sm">
                  Menampilkan {filteredEvents.length} dari {events.length - 1}{' '}
                  acara
                </p>
              )}
            </div>

            <EventsGrid events={filteredEvents} />
          </div>
        </div>
      </div>
    </>
  );
}
