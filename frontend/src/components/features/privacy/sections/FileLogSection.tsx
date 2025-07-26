import { Eye, CheckCircle } from 'lucide-react';
import { SectionHeader } from '@/components/ui/legal/SectionHeader';
import { InfoCard } from '@/components/ui/legal/InfoCard';

const logData: string[] = [
  'Alamat IP (Internet Protocol)',
  'Jenis browser yang digunakan',
  'Penyedia Layanan Internet (ISP)',
  'Cap tanggal dan waktu akses',
  'Halaman rujukan/keluar',
  'Jumlah klik yang dilakukan',
];

export const FileLogSection = () => (
  <section id="file-log" className="scroll-mt-4">
    <SectionHeader icon={Eye} title="File Log" color="green" />
    <div className="space-y-4">
      <p className="leading-relaxed text-slate-700 dark:text-slate-300">
        IKA TEUAS mengikuti prosedur standar dalam menggunakan file log.
        File-file ini mencatat pengunjung saat mereka mengunjungi situs web.
        Semua perusahaan hosting melakukan ini sebagai bagian dari analitik
        layanan hosting.
      </p>
      <InfoCard color="green">
        <h4 className="mb-3 font-semibold text-slate-800 dark:text-slate-200">
          Informasi yang dikumpulkan meliputi:
        </h4>
        <div className="grid gap-3 md:grid-cols-2">
          {logData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                {item}
              </span>
            </div>
          ))}
        </div>
      </InfoCard>
    </div>
  </section>
);
