import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';
import { FOOTER_NAVIGATION } from '@/lib/constants/navigation';
import Image from 'next/image';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-gradient-to-br from-[#1a1825] via-[#212025] to-[#252030]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Organization Info - Left Side */}
          <div className="flex-shrink-0 lg:w-80">
            <div className="mb-8">
              <div className="mb-6 flex items-center space-x-4">
                <div className="relative">
                  <Image
                    src="/assets/icon/logo.png"
                    alt="IKA TE UPI Logo"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-lg shadow-lg ring-2 ring-blue-500/20"
                  />
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur"></div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">TEUAS UPI</div>
                  <div className="text-sm font-medium text-blue-300">
                    Alumni Network
                  </div>
                </div>
              </div>

              <p className="mb-6 text-base leading-relaxed text-gray-300">
                Menghubungkan alumni Teknik Elektro UPI untuk membangun masa
                depan yang lebih cerah bersama melalui kolaborasi dan inovasi.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="group flex items-center text-sm text-gray-400 transition-colors duration-300 hover:text-orange-300">
                  <Mail className="mr-2 h-4 w-4 text-orange-400 transition-transform duration-300 group-hover:scale-110" />
                  <span>info@ikateuas.upi.edu</span>
                </div>
                <div className="group flex items-center text-sm text-gray-400 transition-colors duration-300 hover:text-orange-300">
                  <Phone className="mr-2 h-4 w-4 text-orange-400 transition-transform duration-300 group-hover:scale-110" />
                  <span>+62 22 2013161</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Sections - Flex Layout */}
          <div className="flex-grow">
            <div className="flex h-full flex-col gap-8 md:flex-row md:gap-6 lg:gap-8">
              {/* About Section */}
              <div className="min-w-0 flex-1">
                <h3 className="relative mb-6 border-b border-blue-500/30 pb-3 text-lg font-bold text-white">
                  <span className="relative">
                    {FOOTER_NAVIGATION.about.title}
                    <div className="absolute -bottom-3 left-0 h-0.5 w-8 bg-gradient-to-r from-blue-500 to-blue-300"></div>
                  </span>
                </h3>
                <ul className="space-y-3">
                  {FOOTER_NAVIGATION.about.items.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="group flex items-center text-sm text-gray-400 transition-all duration-300 hover:translate-x-1 hover:text-blue-300"
                      >
                        <span className="mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500 opacity-0 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100"></span>
                        <span className="relative">
                          {item.title}
                          <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Community Section */}
              <div className="min-w-0 flex-1">
                <h3 className="relative mb-6 border-b border-purple-500/30 pb-3 text-lg font-bold text-white">
                  <span className="relative">
                    {FOOTER_NAVIGATION.community.title}
                    <div className="absolute -bottom-3 left-0 h-0.5 w-8 bg-gradient-to-r from-purple-500 to-purple-300"></div>
                  </span>
                </h3>
                <ul className="space-y-3">
                  {FOOTER_NAVIGATION.community.items.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="group flex items-center text-sm text-gray-400 transition-all duration-300 hover:translate-x-1 hover:text-purple-300"
                      >
                        <span className="mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500 opacity-0 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100"></span>
                        <span className="relative">
                          {item.title}
                          <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Opportunities Section */}
              <div className="min-w-0 flex-1">
                <h3 className="relative mb-6 border-b border-green-500/30 pb-3 text-lg font-bold text-white">
                  <span className="relative">
                    {FOOTER_NAVIGATION.opportunities.title}
                    <div className="absolute -bottom-3 left-0 h-0.5 w-8 bg-gradient-to-r from-green-500 to-green-300"></div>
                  </span>
                </h3>
                <ul className="space-y-3">
                  {FOOTER_NAVIGATION.opportunities.items.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="group flex items-center text-sm text-gray-400 transition-all duration-300 hover:translate-x-1 hover:text-green-300"
                      >
                        <span className="mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500 opacity-0 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100"></span>
                        <span className="relative">
                          {item.title}
                          <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location Section */}
              <div className="min-w-0 flex-1">
                <h3 className="relative mb-6 flex items-center border-b border-orange-500/30 pb-3 text-lg font-bold text-white">
                  <MapPin className="mr-2 h-4 w-4 text-orange-400" />
                  <span className="relative">
                    Lokasi
                    <div className="absolute -bottom-3 left-0 h-0.5 w-8 bg-gradient-to-r from-orange-500 to-orange-300"></div>
                  </span>
                </h3>
                <div className="text-sm leading-relaxed text-gray-300">
                  <p className="mb-2 font-semibold text-white">
                    Fakultas Pendidikan Teknologi dan Kejuruan
                  </p>
                  <div className="space-y-1 text-gray-400">
                    <p>Jl. Dr. Setiabudi No.207</p>
                    <p>Isola, Kec. Sukasari</p>
                    <p>Kota Bandung - 40154</p>
                    <p>Jawa Barat, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Separator */}
        <div className="my-12">
          <Separator className="bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col space-y-6 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          {/* Left side - Terms and Copyright */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Link
                href="/terms"
                className="text-gray-400 decoration-blue-400 underline-offset-4 transition-all duration-300 hover:text-white hover:underline"
              >
                Syarat & Ketentuan
              </Link>
              <span className="hidden text-gray-600 sm:inline">•</span>
              <Link
                href="/privacy"
                className="text-gray-400 decoration-blue-400 underline-offset-4 transition-all duration-300 hover:text-white hover:underline"
              >
                Kebijakan Privasi
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              © {currentYear} IKA TEUAS UPI. Seluruh hak cipta dilindungi.
            </p>
          </div>

          {/* Right side - Social Media Links */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6">
            <span className="text-sm font-medium text-gray-300">
              Ikuti Kami:
            </span>
            <div className="flex space-x-2">
              {APP_CONFIG.social &&
                Object.entries(APP_CONFIG.social).map(([platform, url]) => {
                  const socialConfig = {
                    facebook: {
                      icon: Facebook,
                      colors:
                        'hover:bg-blue-600/20 hover:text-blue-400 hover:shadow-blue-500/25',
                      bgColor: 'bg-blue-600/10',
                    },
                    instagram: {
                      icon: Instagram,
                      colors:
                        'hover:bg-pink-600/20 hover:text-pink-400 hover:shadow-pink-500/25',
                      bgColor:
                        'bg-gradient-to-br from-pink-600/10 to-purple-600/10',
                    },
                    twitter: {
                      icon: Twitter,
                      colors:
                        'hover:bg-sky-600/20 hover:text-sky-400 hover:shadow-sky-500/25',
                      bgColor: 'bg-sky-600/10',
                    },
                    linkedin: {
                      icon: Linkedin,
                      colors:
                        'hover:bg-blue-700/20 hover:text-blue-500 hover:shadow-blue-600/25',
                      bgColor: 'bg-blue-700/10',
                    },
                    youtube: {
                      icon: Youtube,
                      colors:
                        'hover:bg-red-600/20 hover:text-red-400 hover:shadow-red-500/25',
                      bgColor: 'bg-red-600/10',
                    },
                  };

                  const config =
                    socialConfig[platform as keyof typeof socialConfig];
                  if (!config) return null;

                  const IconComponent = config.icon;

                  return (
                    <Link
                      key={platform}
                      href={url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative rounded-xl p-3 text-gray-400 transition-all duration-300 ${config.colors} hover:scale-110 hover:shadow-lg`}
                      aria-label={
                        platform.charAt(0).toUpperCase() + platform.slice(1)
                      }
                    >
                      <IconComponent className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                      <div
                        className={`absolute inset-0 rounded-xl ${config.bgColor} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                      ></div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
