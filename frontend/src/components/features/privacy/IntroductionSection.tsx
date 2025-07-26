import { InfoCard } from '@/components/ui/legal/InfoCard';
import { SectionHeader } from '@/components/ui/legal/SectionHeader';
import { FileText } from 'lucide-react';

export const IntroductionSection = () => (
  <section id="introduction" className="scroll-mt-4">
    <SectionHeader icon={FileText} title="Pendahuluan" color="blue" />
    <InfoCard color="blue" className="border-l-4 border-blue-500">
      <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">
        IKA TEUAS, yang dapat diakses dari "DOMAIN NAME", privasi pengunjung
        kami adalah salah satu prioritas utama. Dokumen Kebijakan Privasi ini
        menjelaskan jenis informasi yang dikumpulkan dan dicatat oleh IKA TEUAS
        serta bagaimana kami menggunakannya.
      </p>
      <p className="leading-relaxed text-slate-700 dark:text-slate-300">
        Jika Anda memiliki pertanyaan lebih lanjut atau memerlukan informasi
        lebih lanjut tentang Kebijakan Privasi kami, jangan ragu untuk
        menghubungi kami.
      </p>
    </InfoCard>
  </section>
);
