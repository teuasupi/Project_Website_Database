'use client';

import { Users } from 'lucide-react';
import { AlumniCard } from './AlumniCard';
import { AlumniFilters } from './AlumniFilters';
import { AlumniPagination } from './AlumniPagination';
import { useAlumniFilters } from './hooks/useAlumniFilters';

export function AlumniDirectory() {
  const {
    searchQuery,
    selectedYear,
    selectedLocation,
    selectedCompany,
    currentPage,
    filteredAlumni,
    currentAlumni,
    totalPages,
    setCurrentPage,
    handleFilterChange,
    handleSearchChange,
  } = useAlumniFilters();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">Direktori Alumni</h1>
        <p className="text-muted-foreground text-lg">
          Temukan dan terhubung dengan alumni Universitas Teuku Umar
        </p>
      </div>

      <AlumniFilters
        searchQuery={searchQuery}
        selectedYear={selectedYear}
        selectedLocation={selectedLocation}
        selectedCompany={selectedCompany}
        filteredCount={filteredAlumni.length}
        currentPage={currentPage}
        totalPages={totalPages}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentAlumni.map((alumni) => (
          <AlumniCard key={alumni.id} alumni={alumni} />
        ))}
      </div>

      {/* Empty State */}
      {filteredAlumni.length === 0 && (
        <div className="py-12 text-center">
          <Users className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
          <h3 className="mb-2 text-lg font-semibold">
            Tidak ada alumni ditemukan
          </h3>
          <p className="text-muted-foreground">
            Coba ubah kriteria pencarian atau filter Anda
          </p>
        </div>
      )}

      <AlumniPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
