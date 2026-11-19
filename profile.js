
import { supabase } from "./database.js";
import { getCurrentUser } from "../auth.js";

// নিজের প্রোফাইল দেখা
export async function getProfile() {
  if (!supabase) {
    return {
      success: false,
      message: "Database not configured"
    };
  }

  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        success: false,
        message: "Please login first"
      };
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("auth_id", user.id)
      .maybeSingle();

    if (error) throw error;

    return {
      success: true,
      user,
      profile: data
    };

  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// নিজের নাম পরিবর্তন
export async function updateProfile(displayName) {
  if (!supabase) {
    return {
      success: false,
      message: "Database not configured"
    };
  }

  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        success: false,
        message: "Please login first"
      };
    }

    const name = displayName.trim();

    if (!name) {
      return {
        success: false,
        message: "Name cannot be empty"
      };
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        display_name: name
      })
      .eq("auth_id", user.id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      profile: data,
      message: "Profile updated successfully"
    };

  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// নিজের অ্যাকাউন্টের তথ্য
export async function getMyAccount() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.display_name || ""
  };
      }
