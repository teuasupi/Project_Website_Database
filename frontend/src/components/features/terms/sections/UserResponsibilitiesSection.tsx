import { Users } from 'lucide-react';
import { SectionHeader } from '@/components/ui/legal/SectionHeader';
import { InfoCard } from '@/components/ui/legal/InfoCard';
import { ChecklistItem } from '@/components/ui/legal/CheckListItem';

const userResponsibilities: string[] = [
  'Menggunakan layanan sesuai dengan hukum yang berlaku',
  'Memberikan informasi yang akurat dan terkini',
  'Menjaga kerahasiaan akun dan kata sandi Anda',
  'Bertanggung jawab atas semua aktivitas di akun Anda',
  'Menghormati hak pengguna lain',
  'Tidak menyalahgunakan atau mengganggu layanan',
];

export const UserResponsibilitiesSection = () => (
  <section id="user-responsibilities" className="scroll-mt-4">
    <SectionHeader
      icon={Users}
      title="Tanggung Jawab Pengguna"
      color="orange"
    />
    <InfoCard color="orange">
      <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">
        Sebagai pengguna layanan IKA TEUAS, Anda bertanggung jawab untuk:
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {userResponsibilities.map((item, index) => (
          <ChecklistItem key={index} color="orange">
            {item}
          </ChecklistItem>
        ))}
      </div>
    </InfoCard>
  </section>
);
