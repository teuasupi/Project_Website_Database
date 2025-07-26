import { InfoCard } from '@/components/ui/legal/InfoCard';
import { SectionHeader } from '@/components/ui/legal/SectionHeader';
import { Lock } from 'lucide-react';

const userRights: string[] = [
  'Mengakses informasi pribadi yang kami miliki tentang Anda',
  'Meminta koreksi atau pembaruan data yang tidak akurat',
  'Meminta penghapusan data pribadi Anda',
  'Menolak atau membatasi pemrosesan data tertentu',
  'Menarik persetujuan yang telah diberikan',
  'Memperoleh salinan data dalam format yang dapat dibaca',
];

export const UserRightsSection = () => (
  <section id="user-rights" className="scroll-mt-4">
    <SectionHeader icon={Lock} title="Hak-Hak Anda" color="cyan" />
    <InfoCard color="cyan">
      <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">
        Anda memiliki hak untuk:
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {userRights.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-lg bg-white p-3 dark:bg-slate-800"
          >
            <Lock className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-600" />
            <span className="text-slate-700 dark:text-slate-300">{item}</span>
          </div>
        ))}
      </div>
    </InfoCard>
  </section>
);
