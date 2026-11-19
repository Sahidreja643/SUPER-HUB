
import { supabase } from "./database.js";

// নতুন পোস্ট তৈরি
export async function createPost(content) {
  try {
    if (!supabase) throw new Error("Database not configured");

    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      throw new Error("Please login first");
    }

    if (!content || !content.trim()) {
      throw new Error("Post cannot be empty");
    }

    const { data, error } = await supabase
      .from("posts")
      .insert({
        user_id: user.data.user.id,
        content: content.trim()
      })
      .select()
      .single();

    if (error) throw error;

    return { success: true, post: data };

  } catch (error) {
    return { success: false, message: error.message };
  }
}

// সব পোস্ট দেখা
export async function getPosts() {
  try {
    if (!supabase) throw new Error("Database not configured");

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { success: true, posts: data };

  } catch (error) {
    return { success: false, message: error.message };
  }
}

// পোস্টে লাইক দেওয়া বা তুলে নেওয়া
export async function toggleLike(postId) {
  try {
    if (!supabase) throw new Error("Database not configured");

    const { data: authData, error: authError } =
      await supabase.auth.getUser();

    if (authError) throw authError;

    const user = authData.user;

    if (!user) throw new Error("Please login first");

    const { data: existingLike, error: findError } =
      await supabase
        .from("likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .maybeSingle();

    if (findError) throw findError;

    if (existingLike) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("id", existingLike.id);

      if (error) throw error;

      return { success: true, liked: false };
    }

    const { error } = await supabase
      .from("likes")
      .insert({
        post_id: postId,
        user_id: user.id
      });

    if (error) throw error;

    return { success: true, liked: true };

  } catch (error) {
    return { success: false, message: error.message };
  }
}

// পোস্টে কমেন্ট করা
export async function addComment(postId, content) {
  try {
    if (!supabase) throw new Error("Database not configured");

    const { data: authData, error: authError } =
      await supabase.auth.getUser();

    if (authError) throw authError;

    const user = authData.user;

    if (!user) throw new Error("Please login first");

    if (!content || !content.trim()) {
      throw new Error("Comment cannot be empty");
    }

    const { data, error } = await supabase
      .from("comments")
      .insert({
        post_id: postId,
        user_id: user.id,
        content: content.trim()
      })
      .select()
      .single();

    if (error) throw error;

    return { success: true, comment: data };

  } catch (error) {
    return { success: false, message: error.message };
  }
}

// কোনো পোস্টের কমেন্ট দেখা
export async function getComments(postId) {
  try {
    if (!supabase) throw new Error("Database not configured");

    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) throw error;

    return { success: true, comments: data };

  } catch (error) {
    return { success: false, message: error.message };
  }
      }
        
