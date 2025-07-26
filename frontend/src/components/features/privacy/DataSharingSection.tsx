import { InfoCard } from '@/components/ui/legal/InfoCard';
import { NumberedItem } from '@/components/ui/legal/NumberedItem';
import { SectionHeader } from '@/components/ui/legal/SectionHeader';
import { Users } from 'lucide-react';

const sharingConditions: string[] = [
  'Dengan persetujuan eksplisit dari Anda',
  'Untuk mematuhi kewajiban hukum',
  'Untuk melindungi hak dan keamanan kami atau orang lain',
  'Dengan penyedia layanan terpercaya yang membantu operasional kami',
];

export const DataSharingSection = () => (
  <section id="data-sharing" className="scroll-mt-4">
    <SectionHeader icon={Users} title="Berbagi Informasi" color="indigo" />
    <InfoCard color="indigo">
      <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">
        Kami tidak menjual, menyewakan, atau membagikan informasi pribadi Anda
        kepada pihak ketiga, kecuali dalam situasi berikut:
      </p>
      <div className="grid gap-3">
        {sharingConditions.map((item, index) => (
          <NumberedItem key={index} number={index + 1} color="indigo">
            {item}
          </NumberedItem>
        ))}
      </div>
    </InfoCard>
  </section>
);
