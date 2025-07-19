import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';

interface ContactMethod {
  type: 'email' | 'phone' | 'address' | 'social';
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
}

export function ContactInfo() {
  const contactMethods: ContactMethod[] = [
    {
      type: 'email',
      label: 'Email',
      value: 'info@ikateuas.upi.edu',
      icon: Mail,
      href: 'mailto:info@ikateuas.upi.edu',
    },
    {
      type: 'phone',
      label: 'Phone',
      value: '+62 22 2013163',
      icon: Phone,
      href: 'tel:+622220131163',
    },
    {
      type: 'address',
      label: 'Address',
      value: 'Jl. Dr. Setiabudhi No. 207, Bandung, Jawa Barat 40154',
      icon: MapPin,
    },
    {
      type: 'email',
      label: 'Alumni Relations',
      value: 'alumni@ikateuas.upi.edu',
      icon: Mail,
      href: 'mailto:alumni@ikateuas.upi.edu',
    },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com/ikateuas',
      color: 'text-blue-600',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/ikateuas',
      color: 'text-pink-600',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/company/ikateuas',
      color: 'text-blue-700',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/ikateuas',
      color: 'text-blue-500',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      href: 'https://youtube.com/@ikateuas',
      color: 'text-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Contact Methods */}
      {contactMethods.map((method, index) => {
        const IconComponent = method.icon;
        return (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <div className="mb-4 flex justify-center">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                  <IconComponent className="text-primary h-6 w-6" />
                </div>
              </div>
              <h3 className="text-foreground mb-2 text-lg font-semibold">
                {method.label}
              </h3>
              {method.href ? (
                <Link
                  href={method.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {method.value}
                </Link>
              ) : (
                <p className="text-muted-foreground">{method.value}</p>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Social Media Links */}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-center">Follow Us</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  asChild
                  className="transition-transform hover:scale-110"
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <IconComponent className={`h-5 w-5 ${social.color}`} />
                  </Link>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
