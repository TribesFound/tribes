
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface ProfileData {
  id: string;
  name: string;
  profilePhoto?: string;
  dateOfBirth?: string;
  location?: {
    lat: number;
    lng: number;
    city: string;
    country: string;
  };
  subscriptionTier: string;
  accountType: string;
  isVerified: boolean;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  eventType: string;
  location: any;
  startDate: string;
  endDate?: string;
  maxParticipants?: number;
  currentParticipants: number;
  isPublic: boolean;
  creatorId: string;
}

export interface Message {
  id: string;
  content?: string;
  senderId: string;
  conversationId: string;
  messageType: string;
  mediaUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export const useSupabaseOperations = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Profile operations
  const updateUserProfile = async (profileData: Partial<ProfileData>) => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profileData.name,
          profile_photo: profileData.profilePhoto,
          date_of_birth: profileData.dateOfBirth,
          location: profileData.location,
          subscription_tier: profileData.subscriptionTier,
          account_type: profileData.accountType,
          is_verified: profileData.isVerified
        })
        .eq('id', user.id);

      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // User preferences operations
  const updateUserPreferences = async (preferences: {
    interests?: string[];
    hobbies?: string[];
    ageRange?: { min: number; max: number };
    locationRadius?: number;
    relationshipGoals?: string[];
    privacySettings?: any;
    notificationSettings?: any;
  }) => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          id: user.id,
          interests: preferences.interests,
          hobbies: preferences.hobbies,
          age_range: preferences.ageRange,
          location_radius: preferences.locationRadius,
          relationship_goals: preferences.relationshipGoals,
          privacy_settings: preferences.privacySettings,
          notification_settings: preferences.notificationSettings
        });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Events operations
  const createEvent = async (eventData: {
    title: string;
    description?: string;
    eventType: string;
    location: any;
    startDate: string;
    endDate?: string;
    maxParticipants?: number;
    isPublic?: boolean;
    requirements?: any;
    tags?: string[];
  }) => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('events')
        .insert({
          creator_id: user.id,
          title: eventData.title,
          description: eventData.description,
          event_type: eventData.eventType,
          location: eventData.location,
          start_date: eventData.startDate,
          end_date: eventData.endDate,
          max_participants: eventData.maxParticipants,
          is_public: eventData.isPublic ?? true,
          requirements: eventData.requirements,
          tags: eventData.tags
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getEvents = async (filters?: {
    eventType?: string;
    location?: { lat: number; lng: number; radius: number };
    startDate?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('events')
        .select('*')
        .eq('is_public', true)
        .order('start_date', { ascending: true });

      if (filters?.eventType) {
        query = query.eq('event_type', filters.eventType);
      }

      if (filters?.startDate) {
        query = query.gte('start_date', filters.startDate);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Messaging operations
  const sendMessage = async (conversationId: string, content: string, messageType: string = 'text') => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content,
          message_type: messageType
        })
        .select()
        .single();

      if (error) throw error;

      // Update conversation's last message timestamp
      await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', conversationId);

      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getConversations = async () => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          messages!messages_conversation_id_fkey (
            content,
            created_at,
            sender_id
          )
        `)
        .or(`participant1_id.eq.${user.id},participant2_id.eq.${user.id}`)
        .order('last_message_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Friendship operations
  const sendFriendRequest = async (addresseeId: string) => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('friendships')
        .insert({
          requester_id: user.id,
          addressee_id: addresseeId,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getFriends = async () => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('friendships')
        .select(`
          *,
          requester:profiles!friendships_requester_id_fkey(*),
          addressee:profiles!friendships_addressee_id_fkey(*)
        `)
        .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`)
        .eq('status', 'accepted');

      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Match operations
  const createMatch = async (user2Id: string, compatibilityScore?: number) => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('matches')
        .insert({
          user1_id: user.id,
          user2_id: user2Id,
          compatibility_score: compatibilityScore,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateUserProfile,
    updateUserPreferences,
    createEvent,
    getEvents,
    sendMessage,
    getConversations,
    sendFriendRequest,
    getFriends,
    createMatch
  };
};
