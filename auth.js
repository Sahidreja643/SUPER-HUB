
import { supabase } from "./js/database.js";

// নতুন অ্যাকাউন্ট তৈরি
export async function signUp(email, password, displayName) {
  try {
    if (!supabase) {
      throw new Error("Supabase is not configured");
    }

    if (!email || !password || !displayName) {
      throw new Error("সব তথ্য পূরণ করুন");
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          display_name: displayName.trim()
        }
      }
    });

    if (error) throw error;

    return {
      success: true,
      data,
      message: "Account created successfully"
    };

  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// লগইন
export async function signIn(email, password) {
  try {
    if (!supabase) {
      throw new Error("Supabase is not configured");
    }

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

    if (error) throw error;

    return {
      success: true,
      data,
      message: "Login successful"
    };

  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// লগআউট
export async function signOut() {
  try {
    if (!supabase) {
      throw new Error("Supabase is not configured");
    }

    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return {
      success: true,
      message: "Logout successful"
    };

  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

// বর্তমানে লগইন করা ইউজার
export async function getCurrentUser() {
  try {
    if (!supabase) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    return data.user;

  } catch (error) {
    console.error("User error:", error.message);
    return null;
  }
}

// লগইন পরিবর্তন পর্যবেক্ষণ
export function listenAuthChanges(callback) {
  if (!supabase) return null;

  const { data } = supabase.auth.onAuthStateChange(
    (event, session) => {
      callback(event, session);
    }
  );

  return data.subscription;
}
