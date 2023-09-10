"use client";

import usePlayer from "@/hooks/usePlayer";
import useLoadSoundUrl from "@/hooks/useLoadSoundUrl";
import useGetSoundById from "@/hooks/useGetSoundById";

import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { sound } = useGetSoundById(player.activeId);

  const soundUrl = useLoadSoundUrl(sound!);

  if (!sound || !soundUrl || !player.activeId) {
    return null;
  }

  return (
    <div 
      className="
        fixed 
        bottom-0 
        bg-black 
        w-full 
        py-2 
        h-[80px] 
        px-4
      "
    >
      <PlayerContent key={soundUrl} sounds={sound} soundUrl={soundUrl} />
    </div>
  );
}

export default Player;
