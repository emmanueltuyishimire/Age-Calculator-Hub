
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Share2, Copy, Mail } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FaFacebook, FaWhatsapp, FaLinkedin } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';
import { Input } from './ui/input';


interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, text, url }) => {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setIsClient(true);
    setShareUrl(url ? `${window.location.origin}${url}` : window.location.href);
  }, [url]);

  const handleNativeShare = async () => {
    const shareData = { title, text, url: shareUrl };
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const copyToClipboard = async () => {
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

  if (!isClient) {
    return null;
  }
  
  const isWebShareSupported = 'share' in navigator;

  if (isWebShareSupported) {
    return (
        <Button onClick={handleNativeShare} variant="outline" className="w-full sm:w-auto" aria-label="Share">
            <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
    )
  }

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(text);

  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto" aria-label="Share">
                <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
            <div className="space-y-4">
                <p className="font-semibold text-center">Share this tool with your friends!</p>
                <div className="flex justify-center gap-2">
                    <Button asChild variant="outline" size="icon" className="rounded-full h-12 w-12">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                            <FaFacebook className="h-6 w-6" />
                        </a>
                    </Button>
                    <Button asChild variant="outline" size="icon" className="rounded-full h-12 w-12">
                         <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
                            <FaXTwitter className="h-6 w-6" />
                        </a>
                    </Button>
                    <Button asChild variant="outline" size="icon" className="rounded-full h-12 w-12">
                         <a href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
                            <FaWhatsapp className="h-6 w-6" />
                        </a>
                    </Button>
                     <Button asChild variant="outline" size="icon" className="rounded-full h-12 w-12">
                        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodeURIComponent(title)}&summary=${encodedText}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
                            <FaLinkedin className="h-6 w-6" />
                        </a>
                    </Button>
                     <Button asChild variant="outline" size="icon" className="rounded-full h-12 w-12">
                        <a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}%20${encodedUrl}`} aria-label="Share via Email">
                            <Mail className="h-6 w-6" />
                        </a>
                    </Button>
                </div>
                 <div className="flex items-center space-x-2">
                    <Input value={shareUrl} readOnly className="h-9"/>
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </PopoverContent>
    </Popover>
  );
};

export default ShareButton;
