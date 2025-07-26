import { FileText } from 'lucide-react';
import { SectionHeader } from '@/components/ui/legal/SectionHeader';
import { InfoCard } from '@/components/ui/legal/InfoCard';

export const Introduction = () => (
  <section id="introduction" className="scroll-mt-4">
    <SectionHeader icon={FileText} title="Pendahuluan" color="blue" />
    <InfoCard color="blue" className="border-l-4 border-blue-500">
      <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">
        Selamat datang di IKA TEUAS (Ikatan Alumni Teknik Elektro Universitas
        Andalas). Syarat dan Ketentuan ini mengatur penggunaan layanan dan
        website kami. Dengan mengakses atau menggunakan layanan kami, Anda
        menyetujui untuk terikat dengan ketentuan-ketentuan ini.
      </p>
      <p className="leading-relaxed text-slate-700 dark:text-slate-300">
        Harap membaca dengan seksama sebelum menggunakan layanan kami. Jika Anda
        tidak menyetujui ketentuan ini, mohon untuk tidak menggunakan layanan
        kami.
      </p>
    </InfoCard>
  </section>
);
