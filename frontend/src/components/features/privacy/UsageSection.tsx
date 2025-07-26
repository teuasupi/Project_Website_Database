import { ChecklistItem } from '@/components/ui/legal/CheckListItem';
import { InfoCard } from '@/components/ui/legal/InfoCard';
import { SectionHeader } from '@/components/ui/legal/SectionHeader';
import { CheckCircle } from 'lucide-react';

const usageItems: string[] = [
  'Menyediakan dan meningkatkan layanan kami',
  'Merespons pertanyaan dan permintaan Anda',
  'Mengirimkan informasi penting terkait layanan',
  'Menganalisis penggunaan website untuk perbaikan',
  'Mematuhi kewajiban hukum yang berlaku',
  'Memberikan dukungan teknis dan bantuan',
];

export const UsageSection = () => (
  <section id="usage" className="scroll-mt-4">
    <SectionHeader
      icon={CheckCircle}
      title="Penggunaan Informasi"
      color="orange"
    />
    <InfoCard color="orange">
      <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">
        Kami menggunakan informasi yang dikumpulkan untuk:
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {usageItems.map((item, index) => (
          <ChecklistItem key={index} color="orange">
            {item}
          </ChecklistItem>
        ))}
      </div>
    </InfoCard>
  </section>
);
