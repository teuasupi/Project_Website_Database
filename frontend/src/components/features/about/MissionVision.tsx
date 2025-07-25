import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Heart, Users } from 'lucide-react';

interface MissionVisionProps {
  className?: string;
}

export function MissionVision({ className = '' }: MissionVisionProps) {
  const mission = {
    title: 'Misi Kami',
    icon: Target,
    content:
      'Membangun dan memperkuat jaringan alumni Teknik Elektro UPI, mendorong pertumbuhan profesional, berbagi pengetahuan, dan koneksi bermakna yang mendorong inovasi dalam teknik elektro dan berkontribusi kepada masyarakat.',
    points: [
      'Menghubungkan alumni lintas generasi dan batas geografis',
      'Memfasilitasi transfer pengetahuan dan pengembangan profesional',
      'Mendukung mahasiswa saat ini melalui mentoring dan bimbingan',
      'Mempromosikan keunggulan dalam pendidikan dan praktik teknik elektro',
    ],
  };

  const vision = {
    title: 'Visi Kami',
    icon: Eye,
    content:
      'Menjadi jaringan alumni terdepan yang memberdayakan profesional teknik elektro untuk menciptakan dampak positif dalam teknologi, pendidikan, dan masyarakat sambil mempertahankan standar keunggulan dan integritas tertinggi.',
    points: [
      'Platform terdepan untuk profesional teknik elektro',
      'Jembatan antara akademia dan inovasi industri',
      'Katalis untuk kemajuan teknologi di Indonesia',
      'Simbol keunggulan dalam pendidikan teknik',
    ],
  };

  const values = [
    {
      title: 'Keunggulan',
      icon: Target,
      description:
        'Kami berusaha mencapai standar tertinggi dalam segala yang kami lakukan, dari pencapaian profesional hingga pelayanan masyarakat.',
    },
    {
      title: 'Kolaborasi',
      icon: Users,
      description:
        'Kami percaya pada kekuatan bekerja sama, berbagi pengetahuan, dan saling mendukung pertumbuhan satu sama lain.',
    },
    {
      title: 'Inovasi',
      icon: Eye,
      description:
        'Kami merangkul kreativitas dan pendekatan berpikiran maju untuk memecahkan tantangan teknik yang kompleks.',
    },
    {
      title: 'Integritas',
      icon: Heart,
      description:
        'Kami mempertahankan standar etika tertinggi dan transparansi dalam semua interaksi dan inisiatif kami.',
    },
  ];

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-foreground text-3xl font-bold md:text-4xl">
            Misi & Visi
          </h2>
          <p className="text-muted-foreground mt-2">
            Prinsip panduan dan aspirasi kami untuk masa depan
          </p>
        </div>

        {/* Mission and Vision Cards */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Mission Card */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <mission.icon className="text-primary h-5 w-5" />
                </div>
                <span className="text-2xl">{mission.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{mission.content}</p>

              <h4 className="text-foreground mb-4 text-lg font-semibold">
                Area Fokus Utama:
              </h4>
              <ul className="space-y-2">
                {mission.points.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="bg-primary mt-1.5 h-2 w-2 rounded-full" />
                    <span className="text-muted-foreground text-sm">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Vision Card */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="bg-secondary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <vision.icon className="text-primary h-5 w-5" />
                </div>
                <span className="text-2xl">{vision.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{vision.content}</p>

              <h4 className="text-foreground mb-4 text-lg font-semibold">
                Elemen Visi:
              </h4>
              <ul className="space-y-2">
                {vision.points.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="bg-primary mt-1.5 h-2 w-2 rounded-full" />
                    <span className="text-muted-foreground text-sm">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div>
          <div className="mb-8 text-center">
            <h3 className="text-foreground text-2xl font-bold md:text-3xl">
              Nilai-Nilai Inti Kami
            </h3>
            <p className="text-muted-foreground mt-2">
              Prinsip-prinsip yang memandu komunitas dan tindakan kami
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card
                  key={index}
                  className="text-center transition-transform hover:scale-105"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex justify-center">
                      <div className="from-primary/10 to-secondary/10 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br">
                        <IconComponent className="text-primary h-6 w-6" />
                      </div>
                    </div>
                    <h4 className="text-foreground mb-2 text-lg font-semibold">
                      {value.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
