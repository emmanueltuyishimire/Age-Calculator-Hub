
import { type Metadata } from 'next';
import { ClientPage } from './client-page';

export const metadata: Metadata = {
    title: 'Disclaimer – Calculators',
    description: 'Read the disclaimer for Calculators. Our tools are for informational purposes only and should not be considered professional, medical, or financial advice.',
    alternates: {
        canonical: '/disclaimer',
    },
};

export default function DisclaimerPage() {
  return <ClientPage />;
}
