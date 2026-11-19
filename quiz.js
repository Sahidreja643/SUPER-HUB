
import { supabase } from "./database.js";

// সব কুইজের প্রশ্ন আনা
export async function getQuizzes() {
  if (!supabase) {
    throw new Error("Database is not connected.");
  }

  const { data, error } = await supabase
    .from("quizzes")
    .select("id, question, options, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Quiz loading error:", error);
    throw error;
  }

  return data || [];
}

// একটি কুইজের উত্তর জমা দেওয়া
export async function submitQuizAnswer(quizId, selectedAnswer) {
  if (!supabase) {
    throw new Error("Database is not connected.");
  }

  if (!quizId || !Number.isInteger(selectedAnswer)) {
    throw new Error("Please select a valid answer.");
  }

  const { data, error } = await supabase.rpc(
    "submit_quiz_answer",
    {
      p_quiz_id: quizId,
      p_selected_answer: selectedAnswer
    }
  );

  if (error) {
    console.error("Quiz submission error:", error);
    throw error;
  }

  return data;
}

// কুইজের ফলাফল দেখা
export async function getMyQuizResults() {
  if (!supabase) {
    throw new Error("Database is not connected.");
  }

  const { data, error } = await supabase
    .from("quiz_results")
    .select("id, quiz_id, selected_answer, is_correct, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Quiz results error:", error);
    throw error;
  }

  return data || [];
}
  
