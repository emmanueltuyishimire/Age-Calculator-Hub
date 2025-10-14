
'use client';

import Link from 'next/link';
import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn } from 'lucide-react';

interface SignUpPromptProps {
  message?: string;
  description?: string;
  buttonText?: string;
}

export function SignUpPrompt({
  message = "Want to Save Your Results?",
  description = "Create a free account to save and track your results over time.",
  buttonText = "Sign Up for Free",
}: SignUpPromptProps) {
  const { user, isUserLoading } = useUser();

  if (isUserLoading || user) {
    return null;
  }

  return (
    <Card className="mt-6 bg-muted/50 animate-fade-in border-dashed">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
            <LogIn className="h-5 w-5" />
            {message}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full">
          <Link href="/login">{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
