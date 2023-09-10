import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

import { Sound } from "@/types";

import getSounds from "./getSounds";

const getSoundsByTitle = async (title: string): Promise<Sound[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  if (!title) {
    const allSounds = await getSounds();
    return allSounds;
  }

  const { data, error } = await supabase
    .from('sounds')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSoundsByTitle;
