
import { supabase } from "./database.js";

// সব কমিউনিটি দেখা
export async function getCommunities() {
  try {
    if (!supabase) {
      throw new Error("Database not configured");
    }

    const { data, error } = await supabase
      .from("communities")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return {
      success: true,
      communities: data
    };

  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// নতুন কমিউনিটি তৈরি
export async function createCommunity(name, description) {
  try {
    if (!supabase) {
      throw new Error("Database not configured");
    }

    const { data: authData, error: authError } =
      await supabase.auth.getUser();

    if (authError) throw authError;

    const user = authData.user;

    if (!user) {
      throw new Error("Please login first");
    }

    if (!name || !name.trim()) {
      throw new Error("Community name is required");
    }

    const { data, error } = await supabase
      .from("communities")
      .insert({
        name: name.trim(),
        description: description?.trim() || "",
        created_by: user.id
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      community: data
    };

  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// কমিউনিটিতে যোগ দেওয়া
export async function joinCommunity(communityId) {
  try {
    if (!supabase) {
      throw new Error("Database not configured");
    }

    const { data: authData, error: authError } =
      await supabase.auth.getUser();

    if (authError) throw authError;

    const user = authData.user;

    if (!user) {
      throw new Error("Please login first");
    }

    const { error } = await supabase
      .from("community_members")
      .insert({
        community_id: communityId,
        user_id: user.id
      });

    if (error) throw error;

    return { success: true };

  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// কমিউনিটির সদস্য দেখা
export async function getCommunityMembers(communityId) {
  try {
    if (!supabase) {
      throw new Error("Database not configured");
    }

    const { data, error } = await supabase
      .from("community_members")
      .select("*")
      .eq("community_id", communityId);

    if (error) throw error;

    return {
      success: true,
      members: data
    };

  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// কমিউনিটি থেকে বের হওয়া
export async function leaveCommunity(communityId) {
  try {
    if (!supabase) {
      throw new Error("Database not configured");
    }

    const { data: authData, error: authError } =
      await supabase.auth.getUser();

    if (authError) throw authError;

    const user = authData.user;

    if (!user) {
      throw new Error("Please login first");
    }

    const { error } = await supabase
      .from("community_members")
      .delete()
      .eq("community_id", communityId)
      .eq("user_id", user.id);

    if (error) throw error;

    return { success: true };

  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
      }
      
