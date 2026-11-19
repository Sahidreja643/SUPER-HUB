
import { supabase } from "./database.js";

// Supabase সেটআপ পরীক্ষা
function checkDatabase() {
  if (!supabase) {
    throw new Error(
      "Supabase configuration missing. Please check config.js"
    );
  }
}

// নতুন অ্যাকাউন্ট তৈরি
export async function signUp(email, password, displayName) {
  try {
    checkDatabase();

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
      data: null,
      message: error.message
    };
  }
}

// অ্যাকাউন্টে লগইন
export async function signIn(email, password) {
  try {
    checkDatabase();

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
      data: null,
      message: error.message
    };
  }
}

// লগআউট
export async function signOut() {
  try {
    checkDatabase();

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

// বর্তমানে লগইন করা ব্যবহারকারী
export async function getCurrentUser() {
  try {
    checkDatabase();

    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    return data.user;

  } catch (error) {
    console.error("User check error:", error.message);
    return null;
  }
}

// লগইন পরিবর্তন পর্যবেক্ষণ
export function listenAuthChanges(callback) {
  try {
    checkDatabase();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        callback(event, session);
      }
    );

    return subscription;

  } catch (error) {
    console.error("Auth listener error:", error.message);
    return null;
  }
      }
