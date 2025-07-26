import { Gavel } from 'lucide-react';
import { SectionHeader } from '@/components/ui/legal/SectionHeader';
import { InfoCard } from '@/components/ui/legal/InfoCard';

export const GoverningLawSection = () => (
  <section id="governing-law" className="scroll-mt-4">
    <SectionHeader
      icon={Gavel}
      title="Pembatasan Tanggung Jawab"
      color="purple"
    />
    <InfoCard color="purple">
      <div className="flex items-start gap-4">
        <Gavel className="mt-1 h-8 w-8 flex-shrink-0 text-purple-600" />
        <div>
          <h3 className="mb-2 font-semibold text-slate-800 dark:text-slate-200">
            Yurisdiksi
          </h3>
          <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">
            Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan
            hukum Republik Indonesia. Setiap sengketa yang timbul akan
            diselesaikan melalui pengadilan yang berwenang di Indonesia.
          </p>
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            Apabila ada ketentuan dalam syarat ini yang dianggap tidak dapat
            dilaksanakan, ketentuan lainnya tetap berlaku sepenuhnya.
          </p>
        </div>
      </div>
    </InfoCard>
  </section>
);
