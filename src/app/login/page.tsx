
import AuthForm from '@/components/auth/auth-form';
import { type Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login to your account to save and track your results.',
};

export default function LoginPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Login or Sign Up</h1>
                <AuthForm />
            </div>
        </div>
    );
}
