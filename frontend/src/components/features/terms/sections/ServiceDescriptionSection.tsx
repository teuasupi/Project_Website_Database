import { Eye, Shield, Users } from 'lucide-react';
import { SectionHeader } from '@/components/ui/legal/SectionHeader';
import { InfoCard } from '@/components/ui/legal/InfoCard';

export const ServiceDescriptionSection = () => (
  <section id="service-description" className="scroll-mt-4">
    <SectionHeader icon={Eye} title="Deskripsi Layanan" color="purple" />
    <InfoCard color="purple">
      <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200">
        <Users className="h-5 w-5 text-purple-600" />
        Layanan Alumni
      </h3>
      <p className="leading-relaxed text-slate-700 dark:text-slate-300">
        Kami menyediakan platform untuk menghubungkan alumni Teknik Elektro
        Universitas Andalas, termasuk jaringan profesional, informasi acara, dan
        berbagai layanan pendukung lainnya.
      </p>
    </InfoCard>
    <InfoCard color="purple">
      <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200">
        <Shield className="h-5 w-5 text-purple-600" />
        Batasan Layanan
      </h3>
      <p className="leading-relaxed text-slate-700 dark:text-slate-300">
        Layanan kami dapat berubah sewaktu-waktu. Kami berhak untuk
        memodifikasi, menangguhkan, atau menghentikan layanan tanpa
        pemberitahuan sebelumnya dalam situasi tertentu.
      </p>
    </InfoCard>
  </section>
);
