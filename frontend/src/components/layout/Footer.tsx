import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';
import { FOOTER_NAVIGATION } from '@/lib/constants/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube,
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Organization Info */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center space-x-3">
              <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-lg">
                <span className="text-lg font-bold">IKA</span>
              </div>
              <div>
                <div className="text-foreground text-lg font-bold">
                  {APP_CONFIG.name}
                </div>
                <div className="text-muted-foreground text-sm">
                  {APP_CONFIG.fullName}
                </div>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 text-sm">
              {APP_CONFIG.shortDescription}
            </p>

            {/* Contact Information */}
            <div className="space-y-2 text-sm">
              <div className="text-muted-foreground flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{APP_CONFIG.contact.address}</span>
              </div>
              <div className="text-muted-foreground flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{APP_CONFIG.contact.phone}</span>
              </div>
              <div className="text-muted-foreground flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{APP_CONFIG.contact.email}</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-6 flex space-x-4">
              {Object.entries(APP_CONFIG.social).map(([platform, url]) => {
                const IconComponent =
                  socialIcons[platform as keyof typeof socialIcons];
                if (!IconComponent) return null;

                return (
                  <Link
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="sr-only">{platform}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          {Object.entries(FOOTER_NAVIGATION).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-foreground mb-4 text-sm font-semibold">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="text-muted-foreground flex flex-col items-center justify-between space-y-4 text-sm md:flex-row md:space-y-0">
          <div className="flex flex-col items-center space-y-1 md:items-start">
            <p>
              © {currentYear} {APP_CONFIG.name}. All rights reserved.
            </p>
            <p className="text-xs">
              Built with ❤️ for the Teknik Elektro UPI community
            </p>
          </div>

          <div className="flex space-x-4">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* University Partnership Acknowledgment */}
        <div className="bg-muted mt-8 rounded-lg p-4 text-center">
          <p className="text-muted-foreground text-xs">
            In partnership with{' '}
            <Link
              href="https://upi.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Universitas Pendidikan Indonesia
            </Link>{' '}
            — Fakultas Pendidikan Teknologi dan Kejuruan
          </p>
        </div>
      </div>
    </footer>
  );
}
