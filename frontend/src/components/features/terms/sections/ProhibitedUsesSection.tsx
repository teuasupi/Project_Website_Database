import { Ban } from 'lucide-react';
import { SectionHeader } from '@/components/ui/legal/SectionHeader';
import { InfoCard } from '@/components/ui/legal/InfoCard';

const prohibitedUses: string[] = [
  'Melanggar hukum atau peraturan yang berlaku',
  'Mengirimkan konten yang melanggar hukum, berbahaya, atau menyinggung',
  'Menggunakan layanan untuk tujuan komersial tanpa izin',
  'Mencoba mengakses sistem atau data tanpa otorisasi',
  'Mengganggu atau merusak infrastruktur layanan',
  'Melakukan spam, phishing, atau aktivitas berbahaya lainnya',
];

export const ProhibitedUsesSection = () => (
  <section id="prohibited-uses" className="scroll-mt-4">
    <SectionHeader icon={Ban} title="Penggunaan yang Dilarang" color="red" />
    <InfoCard color="red">
      <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">
        Anda dilarang menggunakan layanan kami untuk:
      </p>
      <div className="grid gap-3">
        {prohibitedUses.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-lg bg-white p-3 dark:bg-slate-800"
          >
            <Ban className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
            <span className="text-slate-700 dark:text-slate-300">{item}</span>
          </div>
        ))}
      </div>
    </InfoCard>
  </section>
);
