import { Sound } from "@/types";

import usePlayer from "./usePlayer";
import useSubscribeModal from "./useSubscribeModal";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

const useOnPlay = (sounds: Sound[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const {  user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

   

    player.setId(id);
    player.setIds(sounds.map((sound) => sound.id));
  }

  return onPlay;
};

export default useOnPlay;
