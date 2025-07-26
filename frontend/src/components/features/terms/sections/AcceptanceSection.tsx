import { UserCheck } from 'lucide-react';
import { SectionHeader } from '@/components/ui/legal/SectionHeader';

export const AcceptanceSection = () => (
  <section id="acceptance" className="scroll-mt-4">
    <SectionHeader
      icon={UserCheck}
      title="Penerimaan Ketentuan"
      color="green"
    />
    <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6 dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20">
      <div className="flex items-start gap-4">
        <UserCheck className="mt-1 h-8 w-8 flex-shrink-0 text-green-600" />
        <div>
          <h3 className="mb-2 font-semibold text-slate-800 dark:text-slate-200">
            Persetujuan Pengguna
          </h3>
          <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">
            Dengan mengakses dan menggunakan website ini, Anda mengakui bahwa
            Anda telah membaca, memahami, dan menyetujui untuk terikat oleh
            Syarat dan Ketentuan ini serta Kebijakan Privasi kami.
          </p>
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            Jika Anda mengakses atas nama organisasi, Anda menyatakan bahwa Anda
            memiliki wewenang untuk mengikat organisasi tersebut pada ketentuan
            ini.
          </p>
        </div>
      </div>
    </div>
  </section>
);
