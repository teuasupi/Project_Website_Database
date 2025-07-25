interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

interface HistoryTimelineProps {
  className?: string;
}

export function HistoryTimeline({ className = '' }: HistoryTimelineProps) {
  const milestones: TimelineEvent[] = [
    {
      year: 1963,
      title: 'Pendirian Teknik Elektro UPI',
      description:
        'Program teknik elektro didirikan sebagai bagian dari Universitas Pendidikan Indonesia.',
    },
    {
      year: 1985,
      title: 'Asosiasi Alumni Pertama',
      description:
        'Pembentukan jaringan alumni informal pertama untuk mempertahankan koneksi.',
    },
    {
      year: 2000,
      title: 'Transformasi Digital',
      description:
        'Peluncuran platform digital pertama untuk menghubungkan alumni secara online.',
    },
    {
      year: 2015,
      title: 'Program Beasiswa',
      description:
        'Pendirian dana beasiswa IKA TEUAS untuk mahasiswa kurang mampu.',
    },
    {
      year: 2020,
      title: 'Ekspansi Global',
      description:
        'Perluasan jaringan untuk mencakup cabang alumni internasional.',
    },
    {
      year: 2025,
      title: 'Peluncuran Platform Modern',
      description:
        'Peluncuran platform digital komprehensif untuk konektivitas yang lebih baik.',
    },
  ];

  return (
    <section className={`bg-muted/50 py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-foreground text-3xl font-bold md:text-4xl">
            Perjalanan Kami
          </h2>
          <p className="text-muted-foreground mt-2">
            Tonggak penting dalam sejarah organisasi kami
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-primary text-primary-foreground flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                  <span className="text-sm font-bold">{milestone.year}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground text-lg font-semibold">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
