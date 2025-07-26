import { SectionHeader } from '@/components/ui/legal/SectionHeader';
import { Shield } from 'lucide-react';

export const DataProtectionSection = () => (
  <section id="data-protection" className="scroll-mt-4">
    <SectionHeader icon={Shield} title="Perlindungan Data" color="red" />
    <div className="rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-pink-50 p-6 dark:border-red-800 dark:from-red-900/20 dark:to-pink-900/20">
      <div className="flex items-start gap-4">
        <Shield className="mt-1 h-8 w-8 flex-shrink-0 text-red-600" />
        <div>
          <h3 className="mb-2 font-semibold text-slate-800 dark:text-slate-200">
            Komitmen Keamanan Kami
          </h3>
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang
            sesuai untuk melindungi data pribadi Anda dari akses, penggunaan,
            atau pengungkapan yang tidak sah. Namun, tidak ada metode transmisi
            data yang 100% aman.
          </p>
        </div>
      </div>
    </div>
  </section>
);
