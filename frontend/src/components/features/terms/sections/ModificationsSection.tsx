import { AlertTriangle } from 'lucide-react';
import { SectionHeader } from '@/components/ui/legal/SectionHeader';

export const ModificationsSection = () => (
  <section id="modifications" className="scroll-mt-4">
    <SectionHeader
      icon={AlertTriangle}
      title="Perubahan Ketentuan"
      color="yellow"
    />
    <div className="rounded-xl border border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50 p-6 dark:border-yellow-800 dark:from-yellow-900/20 dark:to-amber-900/20">
      <div className="flex items-start gap-4">
        <AlertTriangle className="mt-1 h-8 w-8 flex-shrink-0 text-yellow-600" />
        <div>
          <h3 className="mb-2 font-semibold text-slate-800 dark:text-slate-200">
            Hak Modifikasi
          </h3>
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            IKA TEUAS berhak untuk mengubah atau memperbarui Syarat dan
            Ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya.
            Perubahan akan berlaku efektif setelah dipublikasikan di website
            ini. Penggunaan berkelanjutan layanan kami setelah perubahan berarti
            Anda menyetujui ketentuan yang telah diperbarui.
          </p>
        </div>
      </div>
    </div>
  </section>
);
