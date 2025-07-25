'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Send,
  CheckCircle,
  AlertCircle,
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
import { logger } from '@teuas/shared/utils';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: 'general' | 'alumni-services' | 'technical' | 'partnerships';
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const categories = [
    { value: 'general', label: 'Pertanyaan Umum' },
    { value: 'alumni-services', label: 'Layanan Alumni' },
    { value: 'technical', label: 'Dukungan Teknis' },
    { value: 'partnerships', label: 'Kemitraan & Kolaborasi' },
  ];

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'info@ikateuas.upi.edu',
      href: 'mailto:info@ikateuas.upi.edu',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+62 22 2013163',
      href: 'tel:+622220131163',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Jl. Dr. Setiabudhi No. 207, Bandung',
    },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/ikateuas' },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/ikateuas',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/company/ikateuas',
    },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/ikateuas' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@ikateuas' },
  ];

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the data to your backend
      logger.log('Form submitted:', formData);

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general',
      });
    } catch (error) {
      logger.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name && formData.email && formData.subject && formData.message;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">Hubungi Kami</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Ada pertanyaan atau butuh bantuan? Kami siap membantu. Kirimkan
            pesan kepada kami dan kami akan merespons secepat mungkin.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>Kirim Pesan</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange('name', e.target.value)
                        }
                        placeholder="Masukkan nama lengkap Anda"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Alamat Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        placeholder="Masukkan alamat email Anda"
                        required
                      />
                    </div>
                  </div>

                  {/* Category & Subject Row */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleInputChange('category', value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subjek *</Label>
                      <Input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange('subject', e.target.value)
                        }
                        placeholder="Masukkan subjek pesan Anda"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange('message', e.target.value)
                      }
                      placeholder="Masukkan pesan Anda di sini..."
                      rows={10}
                      className="h-[160px]"
                      required
                    />
                  </div>

                  {/* Submit Status */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span>
                        Pesan berhasil dikirim! Kami akan segera menghubungi
                        Anda.
                      </span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-center space-x-2 text-red-600">
                      <AlertCircle className="h-5 w-5" />
                      <span>Gagal mengirim pesan. Silakan coba lagi.</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span>Mengirim...</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <Send className="h-4 w-4" />
                        <span>Kirim Pesan</span>
                      </span>
                    )}
                  </Button>

                  <p className="text-muted-foreground text-sm">
                    * Field wajib diisi. Kami akan merespons dalam 24-48 jam.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informasi Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-primary/10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                        <IconComponent className="text-primary h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-foreground text-sm font-medium">
                          {method.label}
                        </p>
                        {method.href ? (
                          <Link
                            href={method.href}
                            className="text-muted-foreground hover:text-primary text-sm break-words transition-colors"
                          >
                            {method.value}
                          </Link>
                        ) : (
                          <p className="text-muted-foreground text-sm break-words">
                            {method.value}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Clock className="h-5 w-5" />
                  <span>Jam Kantor</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Sen - Jum</span>
                    <span className="text-muted-foreground">08:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Sabtu</span>
                    <span className="text-muted-foreground">08:00 - 12:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Minggu</span>
                    <span className="text-muted-foreground">Tutup</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ikuti Kami</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        asChild
                        className="min-w-0 flex-1"
                      >
                        <Link
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ikuti kami di ${social.name}`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
