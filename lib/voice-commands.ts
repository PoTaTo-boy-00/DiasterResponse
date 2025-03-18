```typescript
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface Command {
  command: string | string[];
  callback: (...args: any[]) => void;
  isFuzzyMatch?: boolean;
  fuzzyMatchingThreshold?: number;
  bestMatchOnly?: boolean;
}

export const useVoiceCommands = (commands: Command[]) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands });

  const startListening = async () => {
    try {
      await SpeechRecognition.startListening({ continuous: true });
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return {
    transcript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition
  };
};

// Common voice commands
export const commonCommands = [
  {
    command: 'create alert',
    callback: () => {
      // Trigger alert creation dialog
    }
  },
  {
    command: 'send message *',
    callback: (message: string) => {
      // Handle message sending
    }
  },
  {
    command: 'update status *',
    callback: (status: string) => {
      // Handle status update
    }
  },
  {
    command: 'emergency report',
    callback: () => {
      // Open emergency report form
    }
  }
];