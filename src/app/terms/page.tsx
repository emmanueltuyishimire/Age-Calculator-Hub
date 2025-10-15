
import { type Metadata } from 'next';
import { ClientPage } from './client-page';

export const metadata: Metadata = {
    title: 'Terms of Service – Calculators',
    description: 'Read the Terms of Service for Calculators. By using our website, you agree to these terms and conditions. Learn about acceptable use, disclaimers, and liability.',
    alternates: {
        canonical: '/terms',
    },
};

export default function TermsPage() {
  return <ClientPage />;
}
