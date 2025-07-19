import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const faqItems = [
  {
    question: 'How do I register as an alumni member?',
    answer:
      'You can register through our online registration form. Visit the Alumni Registration page and fill out the required information including your graduation year and current contact details.',
  },
  {
    question: 'What services are available for alumni?',
    answer:
      'We offer career guidance, networking opportunities, mentorship programs, professional development workshops, and job placement assistance.',
  },
  {
    question: 'How can I update my profile information?',
    answer:
      'Log into your account and navigate to the profile section where you can update your personal and professional information.',
  },
  {
    question: 'Can I contribute articles to the alumni blog?',
    answer:
      'Yes! We welcome contributions from our alumni. Please contact us with your article proposal and we will guide you through the submission process.',
  },
  {
    question: 'How do I access the alumni directory?',
    answer:
      'The alumni directory is available to registered members. Log into your account to search and connect with fellow alumni.',
  },
];

export function FAQ() {
  return (
    <section className="bg-muted/50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Find answers to common questions about our services and membership
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-6">
          {faqItems.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-start space-x-3">
                  <HelpCircle className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
                  <span>{item.question}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
