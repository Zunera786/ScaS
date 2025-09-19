import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface VoiceInputProps {
  onVoiceResult?: (text: string) => void;
  onPlayAudio?: (text: string) => void;
  className?: string;
}

const VoiceInput = ({ onVoiceResult, onPlayAudio, className }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const { t, getCurrentLanguage } = useLanguage();

  const startListening = () => {
    setIsListening(true);
    // Mock voice input for demo
    setTimeout(() => {
      const mockTranscript = "Tell me about soil testing for my wheat crop";
      setTranscript(mockTranscript);
      setIsListening(false);
      onVoiceResult?.(mockTranscript);
    }, 2000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const playResponse = () => {
    if (onPlayAudio && transcript) {
      onPlayAudio(transcript);
    }
  };

  return (
    <Card className={`bg-accent/5 border-accent/20 ${className}`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <Button
              variant={isListening ? "destructive" : "voice"}
              size="lg"
              onClick={isListening ? stopListening : startListening}
              className="h-16 w-16 rounded-full"
            >
              {isListening ? (
                <MicOff className="h-6 w-6 animate-pulse" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </Button>
            
            {transcript && (
              <Button
                variant="outline"
                size="lg"
                onClick={playResponse}
                className="h-16 w-16 rounded-full"
              >
                <Volume2 className="h-6 w-6" />
              </Button>
            )}
          </div>

          <div className="text-center">
            {isListening ? (
              <div className="space-y-2">
                <p className="text-sm font-medium text-accent">Listening...</p>
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            ) : transcript ? (
              <div className="space-y-2">
                <p className="text-sm font-medium text-success">Voice Input Received:</p>
                <p className="text-sm text-muted-foreground italic">"{transcript}"</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Tap microphone to speak</p>
                <p className="text-xs text-muted-foreground">Available in all local languages</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceInput;