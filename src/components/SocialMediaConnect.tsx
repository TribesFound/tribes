
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Instagram, Music, Link, CheckCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialMediaConnectProps {
  instagramConnected: boolean;
  instagramUsername?: string;
  spotifyConnected: boolean;
  websiteUrl?: string;
  isBusinessProfile?: boolean;
  onInstagramConnect: () => void;
  onSpotifyConnect: () => void;
  onWebsiteUpdate: (url: string) => void;
  onInstagramDisconnect: () => void;
  onSpotifyDisconnect: () => void;
}

const SocialMediaConnect: React.FC<SocialMediaConnectProps> = ({
  instagramConnected,
  instagramUsername,
  spotifyConnected,
  websiteUrl,
  isBusinessProfile,
  onInstagramConnect,
  onSpotifyConnect,
  onWebsiteUpdate,
  onInstagramDisconnect,
  onSpotifyDisconnect
}) => {
  const [connectingInstagram, setConnectingInstagram] = useState(false);
  const [connectingSpotify, setConnectingSpotify] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState(false);
  const [websiteInput, setWebsiteInput] = useState(websiteUrl || '');
  const { toast } = useToast();

  const handleInstagramConnect = async () => {
    setConnectingInstagram(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onInstagramConnect();
      toast({
        title: "Instagram connected!",
        description: "Your Instagram account is now linked to your profile.",
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Unable to connect to Instagram. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConnectingInstagram(false);
    }
  };

  const handleSpotifyConnect = async () => {
    setConnectingSpotify(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSpotifyConnect();
      toast({
        title: "Spotify connected!",
        description: "Your music preferences are now synced.",
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Unable to connect to Spotify. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConnectingSpotify(false);
    }
  };

  const handleWebsiteUpdate = () => {
    onWebsiteUpdate(websiteInput);
    setEditingWebsite(false);
    toast({
      title: "Website updated!",
      description: "Your website URL has been saved.",
    });
  };

  return (
    <div className="space-y-4">
      {/* Instagram Connection */}
      <div className="flex items-center justify-between p-3 tribal-card">
        <div className="flex items-center space-x-3">
          <Instagram className="w-5 h-5 text-pink-600" />
          <div>
            <Label className="text-sm font-medium">Instagram</Label>
            {instagramConnected && instagramUsername && (
              <p className="text-xs text-gray-600">{instagramUsername}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {instagramConnected && (
            <Button
              onClick={onInstagramDisconnect}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          <Button
            onClick={handleInstagramConnect}
            disabled={connectingInstagram}
            className={instagramConnected ? 'tribal-button' : 'tribal-button-outline'}
            size="sm"
          >
            {connectingInstagram ? (
              <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
            ) : instagramConnected ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Instagram className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Spotify Connection */}
      <div className="flex items-center justify-between p-3 tribal-card">
        <div className="flex items-center space-x-3">
          <Music className="w-5 h-5 text-green-600" />
          <div>
            <Label className="text-sm font-medium">Spotify</Label>
            {spotifyConnected && (
              <p className="text-xs text-gray-600">Music synced</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {spotifyConnected && (
            <Button
              onClick={onSpotifyDisconnect}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          <Button
            onClick={handleSpotifyConnect}
            disabled={connectingSpotify}
            className={spotifyConnected ? 'tribal-button' : 'tribal-button-outline'}
            size="sm"
          >
            {connectingSpotify ? (
              <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
            ) : spotifyConnected ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Music className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Website URL (for business profiles) */}
      {isBusinessProfile && (
        <div className="p-3 tribal-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Link className="w-5 h-5 text-blue-600" />
              <Label className="text-sm font-medium">Website</Label>
            </div>
            <Button
              onClick={() => setEditingWebsite(!editingWebsite)}
              variant="ghost"
              size="sm"
            >
              {editingWebsite ? 'Cancel' : 'Edit'}
            </Button>
          </div>
          
          {editingWebsite ? (
            <div className="space-y-2">
              <Input
                value={websiteInput}
                onChange={(e) => setWebsiteInput(e.target.value)}
                placeholder="https://your-website.com"
                className="text-sm"
              />
              <Button
                onClick={handleWebsiteUpdate}
                className="tribal-button"
                size="sm"
              >
                Save Website
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {websiteUrl || 'No website added'}
              </p>
              {websiteUrl && (
                <Button
                  onClick={() => window.open(websiteUrl, '_blank')}
                  className="tribal-button-outline"
                  size="sm"
                >
                  Visit
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SocialMediaConnect;
