import { Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

export const RecordView = () => {
  const [audioUrl, setAudioUrl] = useState('');

  const handleRecordingComplete = (blob:TODO) => {
    const url = URL.createObjectURL(blob);
    setAudioUrl(url); 
    console.log('Recording complete. URL:', url); 
  };

  return (
    <Stack direction={"row"}>
      <AudioRecorder
        onRecordingComplete={handleRecordingComplete}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadOnSavePress={false}
        downloadFileExtension="webm"
      />
      {audioUrl && (
        <audio src={audioUrl} controls  />
      )}
    </Stack>
  );
};

