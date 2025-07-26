import { Scale } from 'lucide-react';
import { SectionHeader } from '@/components/ui/legal/SectionHeader';
import { InfoCard } from '@/components/ui/legal/InfoCard';

const limitationItems: string[] = [
  'Layanan disediakan "sebagaimana adanya" tanpa jaminan',
  'Kami tidak bertanggung jawab atas kerugian tidak langsung',
  'Tanggung jawab terbatas pada nilai layanan yang dibayarkan',
  'Tidak ada jaminan ketersediaan layanan 100%',
];

export const LimitationLiabilitySection = () => (
  <section id="limitation-liability" className="scroll-mt-4">
    <SectionHeader
      icon={Scale}
      title="Pembatasan Tanggung Jawab"
      color="cyan"
    />
    <InfoCard color="cyan">
      <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">
        Pembatasan tanggung jawab IKA TEUAS:
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {limitationItems.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-lg bg-white p-3 dark:bg-slate-800"
          >
            <Scale className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-600" />
            <span className="text-slate-700 dark:text-slate-300">{item}</span>
          </div>
        ))}
      </div>
    </InfoCard>
  </section>
);
