import { Shield } from 'lucide-react';
import { SectionHeader } from '@/components/ui/legal/SectionHeader';
import { InfoCard } from '@/components/ui/legal/InfoCard';
import { NumberedItem } from '@/components/ui/legal/NumberedItem';

const intellectualPropertyRights: string[] = [
  'Semua konten, logo, dan materi dilindungi hak cipta',
  'Pengguna tidak diizinkan menyalin atau mendistribusikan konten tanpa izin',
  'Merek dagang IKA TEUAS adalah milik eksklusif organisasi',
  'Pelanggaran hak kekayaan intelektual dapat menimbulkan tindakan hukum',
];

export const IntellectualPropertySection = () => (
  <section id="intellectual-property" className="scroll-mt-4">
    <SectionHeader
      icon={Shield}
      title="Hak Kekayaan Intelektual"
      color="indigo"
    />
    <InfoCard color="indigo">
      <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">
        Semua hak kekayaan intelektual dalam layanan ini adalah milik IKA TEUAS:
      </p>
      <div className="grid gap-3">
        {intellectualPropertyRights.map((item, index) => (
          <NumberedItem key={index} number={index + 1} color="indigo">
            {item}
          </NumberedItem>
        ))}
      </div>
    </InfoCard>
  </section>
);
