
'use client';

import { useUser, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

const profileSchema = z.object({
  displayName: z.string().min(1, 'Display name is required.'),
  email: z.string().email('Invalid email address.'),
  photoURL: z.string().url('Please enter a valid URL.').or(z.literal('')),
});

const passwordSchema = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters.'),
});

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: '',
      email: '',
      photoURL: '',
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { newPassword: '' },
  });

  useEffect(() => {
    if (!isUserLoading) {
      if (user) {
        profileForm.reset({
          displayName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || '',
        });
      } else {
        router.push('/login');
      }
    }
  }, [user, isUserLoading, router, profileForm]);

  const handleProfileUpdate = async (values: z.infer<typeof profileSchema>) => {
    if (!auth.currentUser) return;
    setIsUpdating(true);
    setError(null);
    try {
      if (values.email !== auth.currentUser.email) {
        await updateEmail(auth.currentUser, values.email);
      }
      await updateProfile(auth.currentUser, {
        displayName: values.displayName,
        photoURL: values.photoURL,
      });
      toast({ title: 'Success', description: 'Your profile has been updated.' });
    } catch (e: any) {
      setError(e.message);
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordUpdate = async (values: z.infer<typeof passwordSchema>) => {
    if (!auth.currentUser) return;
    setIsUpdating(true);
    setError(null);
    try {
      await updatePassword(auth.currentUser, values.newPassword);
      toast({ title: 'Success', description: 'Your password has been changed.' });
      passwordForm.reset();
    } catch (e: any) {
      setError(e.message);
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} />
            <AvatarFallback className="text-3xl">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : '?'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user.displayName || 'Your Profile'}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Update Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your display name, email, and profile picture.</CardDescription>
          </CardHeader>
          <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" {...profileForm.register('displayName')} />
                {profileForm.formState.errors.displayName && (
                  <p className="text-sm text-destructive">{profileForm.formState.errors.displayName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...profileForm.register('email')} />
                {profileForm.formState.errors.email && (
                  <p className="text-sm text-destructive">{profileForm.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="photoURL">Profile Picture URL</Label>
                <Input id="photoURL" {...profileForm.register('photoURL')} />
                {profileForm.formState.errors.photoURL && (
                  <p className="text-sm text-destructive">{profileForm.formState.errors.photoURL.message}</p>
                )}
              </div>
            </CardContent>
            <CardContent>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? <Loader2 className="animate-spin" /> : 'Save Changes'}
              </Button>
            </CardContent>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Enter a new password for your account.</CardDescription>
          </CardHeader>
          <form onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" {...passwordForm.register('newPassword')} />
                {passwordForm.formState.errors.newPassword && (
                  <p className="text-sm text-destructive">{passwordForm.formState.errors.newPassword.message}</p>
                )}
              </div>
            </CardContent>
            <CardContent>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? <Loader2 className="animate-spin" /> : 'Update Password'}
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
