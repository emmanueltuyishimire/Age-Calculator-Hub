
import { type Metadata } from 'next';
import { ClientPage } from './client-page';

export const metadata: Metadata = {
    title: 'Privacy Policy – Age Calculator Hub',
    description: 'Read the Privacy Policy for Age Calculator Hub. We are committed to protecting your privacy. Learn how we handle data and use cookies and third-party advertising.',
    alternates: {
        canonical: '/privacy',
    },
};

export default function PrivacyPage() {
  return <ClientPage />;
}
