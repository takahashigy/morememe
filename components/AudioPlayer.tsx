// components/AudioPlayer.tsx
import React from 'react';

const AudioPlayer = ({ url }: { url: string }) => {
  return (
    <div className="mt-4">
      <p className="mb-2">🎧 试听你的 Meme 音频：</p>
      <audio controls src={url} className="w-72" />
    </div>
  );
};

export default AudioPlayer;
