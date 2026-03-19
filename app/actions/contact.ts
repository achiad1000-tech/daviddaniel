"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type ContactState = {
  success: boolean;
  message: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name    = (formData.get("name")    as string)?.trim();
  const phone   = (formData.get("phone")   as string)?.trim();
  const email   = (formData.get("email")   as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !phone) {
    return { success: false, message: "נא למלא שם וטלפון." };
  }

  const { error } = await supabase.from("leads").insert([
    { name, phone, email, message },
  ]);

  if (error) {
    console.error("Supabase error:", error.message);
    return { success: false, message: "שגיאה בשליחה. נסה שוב." };
  }

  return {
    success: true,
    message: "תודה! קיבלתי את הפנייה שלך. אחזור אליך בהקדם.",
  };
}
