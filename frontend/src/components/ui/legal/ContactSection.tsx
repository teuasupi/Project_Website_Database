import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { SectionHeader } from '@/components/ui/legal/SectionHeader';
import { InfoCard } from '@/components/ui/legal/InfoCard';
import { ContactItem } from '@/components/ui/legal/ContactItem';

interface ContactSectionProps {
  pageType: 'terms' | 'privacy';
  color?: string;
}

export const ContactSection = ({
  pageType,
  color = 'emerald',
}: ContactSectionProps) => {
  const getIntroText = (type: 'terms' | 'privacy') => {
    return type === 'terms'
      ? 'Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami melalui:'
      : 'Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau memerlukan informasi lebih lanjut, silakan hubungi kami melalui:';
  };

  const getFooterText = (type: 'terms' | 'privacy') => {
    return type === 'terms'
      ? 'Dengan menggunakan layanan kami, Anda menyetujui Syarat dan Ketentuan ini.'
      : 'Dengan menggunakan website ini, Anda menyetujui pengumpulan dan penggunaan informasi sesuai dengan kebijakan privasi ini.';
  };

  const getFooterGradient = (type: 'terms' | 'privacy') => {
    return type === 'terms'
      ? 'bg-gradient-to-r from-slate-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700'
      : 'bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700';
  };

  return (
    <section id="contact" className="scroll-mt-4">
      <SectionHeader icon={Phone} title="Hubungi Kami" color={color} />
      <InfoCard color={color}>
        <p className="mb-6 leading-relaxed text-slate-700 dark:text-slate-300">
          {getIntroText(pageType)}
        </p>
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
          <h3 className="mb-4 text-xl font-semibold text-slate-800 dark:text-slate-200">
            IKA TEUAS UPI
          </h3>
          <div className="space-y-4">
            <ContactItem
              icon={Mail}
              label="Email"
              value="legal@ikateuas.org"
              color={color}
            />
            <ContactItem
              icon={Phone}
              label="Telepon"
              value="+62 22 2013163"
              color={color}
            />
            <ContactItem
              icon={MapPin}
              label="Alamat"
              value="Jl. Dr. Setiabudi No.229, Isola, Kec. Sukasari, Kota Bandung, Jawa Barat 40154"
              color={color}
            />
          </div>
        </div>
      </InfoCard>

      {/* Footer */}
      <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-700">
        <div
          className={`${getFooterGradient(pageType)} rounded-xl p-6 text-center`}
        >
          <div className="mb-3 flex justify-center">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          {pageType === 'terms' && (
            <p className="mb-2 text-slate-600 dark:text-slate-400">
              <strong>Efektif sejak:</strong>{' '}
              {new Date().toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
          <p className="text-slate-600 dark:text-slate-400">
            {getFooterText(pageType)}
          </p>
        </div>
      </div>
    </section>
  );
};
