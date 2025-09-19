import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface VoiceButtonProps {
  text: string;
  className?: string;
}

const VoiceButton = ({ text, className }: VoiceButtonProps) => {
  const { getCurrentLanguage } = useLanguage();

  const playText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const currentLang = getCurrentLanguage();
      
      // Set language based on current selection
      switch (currentLang.code) {
        case 'hi':
          utterance.lang = 'hi-IN';
          break;
        case 'bn':
          utterance.lang = 'bn-IN';
          break;
        case 'te':
          utterance.lang = 'te-IN';
          break;
        case 'ta':
          utterance.lang = 'ta-IN';
          break;
        case 'mr':
          utterance.lang = 'mr-IN';
          break;
        case 'gu':
          utterance.lang = 'gu-IN';
          break;
        case 'kn':
          utterance.lang = 'kn-IN';
          break;
        case 'ml':
          utterance.lang = 'ml-IN';
          break;
        case 'pa':
          utterance.lang = 'pa-IN';
          break;
        case 'or':
          utterance.lang = 'or-IN';
          break;
        default:
          utterance.lang = 'en-IN';
      }
      
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={playText}
      className={`h-8 w-8 text-accent hover:text-accent-foreground hover:bg-accent/20 ${className}`}
      type="button"
    >
      <Volume2 className="h-4 w-4" />
    </Button>
  );
};

export default VoiceButton;