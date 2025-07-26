import { Users, Eye } from 'lucide-react';
import { SectionHeader } from '@/components/ui/legal/SectionHeader';
import { InfoCard } from '@/components/ui/legal/InfoCard';

export const InformationCollectionSection = () => (
  <section id="information-collection" className="scroll-mt-4">
    <SectionHeader
      icon={Users}
      title="Informasi yang Kami Kumpulkan"
      color="purple"
    />
    <div className="grid gap-6 md:grid-cols-2">
      <InfoCard color="purple">
        <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200">
          <Users className="h-5 w-5 text-purple-600" />
          1. Informasi Pribadi
        </h3>
        <p className="leading-relaxed text-slate-700 dark:text-slate-300">
          Kami dapat mengumpulkan informasi pribadi yang Anda berikan secara
          sukarela, seperti nama, alamat email, nomor telepon, dan informasi
          lainnya ketika Anda menghubungi kami atau menggunakan layanan kami.
        </p>
      </InfoCard>
      <InfoCard color="purple">
        <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200">
          <Eye className="h-5 w-5 text-purple-600" />
          2. Cookies dan Teknologi Serupa
        </h3>
        <p className="leading-relaxed text-slate-700 dark:text-slate-300">
          Website kami menggunakan cookies untuk meningkatkan fungsionalitas dan
          memberikan pengalaman yang lebih baik. Anda dapat mengatur preferensi
          cookies melalui pengaturan browser Anda.
        </p>
      </InfoCard>
    </div>
  </section>
);
