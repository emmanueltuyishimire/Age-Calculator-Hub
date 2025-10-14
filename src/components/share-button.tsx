
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Share2, Copy } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, text, url }) => {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const handleShare = async () => {
    const shareUrl = url ? `${window.location.origin}${url}` : window.location.href;
    const shareData = {
      title,
      text,
      url: shareUrl,
    };

    if (isClient && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for desktop or unsupported browsers
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: 'Link Copied!',
          description: 'The link has been copied to your clipboard.',
        });
      } catch (error) {
        console.error('Failed to copy:', error);
        toast({
          variant: 'destructive',
          title: 'Failed to Copy',
          description: 'Could not copy the link to your clipboard.',
        });
      }
    }
  };

  if (!isClient) {
    return null;
  }
  
  const isWebShareSupported = 'share' in navigator;

  return (
    <Button onClick={handleShare} variant="outline" className="w-full sm:w-auto" aria-label="Share">
      {isWebShareSupported ? (
          <>
            <Share2 className="mr-2 h-4 w-4" /> Share
          </>
      ) : (
          <>
            <Copy className="mr-2 h-4 w-4" /> Copy Link
          </>
      )}
    </Button>
  );
};

export default ShareButton;
