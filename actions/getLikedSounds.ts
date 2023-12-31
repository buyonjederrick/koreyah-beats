import { Sound } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedSounds = async (): Promise<Sound[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase 
    .from('liked_sounds')
    .select('*, sounds(*)')
    .eq('user_id', session?.user?.id)
    .order('created_at', { ascending: false })

  if (!data) return [];

  return data.map((item) => ({
    ...item.sounds
  }))
};

export default getLikedSounds;
