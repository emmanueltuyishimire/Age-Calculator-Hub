
import { type Metadata } from 'next';
import { ClientPage } from './client-page';

export const metadata: Metadata = {
    title: 'Privacy Policy – Calculator Hub',
    description: 'Read the Privacy Policy for Calculator Hub. We are committed to protecting your privacy. Learn how we handle data and use cookies and third-party advertising.',
    alternates: {
        canonical: '/privacy',
    },
};

export default function PrivacyPage() {
  return <ClientPage />;
}
