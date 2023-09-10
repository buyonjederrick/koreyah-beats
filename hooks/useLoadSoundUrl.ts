import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Sound } from "@/types";

const useLoadSoundUrl = (sound: Sound) => {
  const supabaseClient = useSupabaseClient();

  if (!sound) {
    return '';
  }

  const { data: soundData } = supabaseClient
  .storage
  .from('sounds')
  .getPublicUrl(sound.sound_path);

  return soundData.publicUrl;
};

export default useLoadSoundUrl;
