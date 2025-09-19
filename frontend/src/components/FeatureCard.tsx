import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  icon: React.ReactNode;
  color?: "primary" | "earth" | "success" | "accent";
}

const FeatureCard = ({
  title,
  description,
  image,
  href,
  icon,
  color = "primary"
}: FeatureCardProps) => {
  const { t, currentLanguage } = useLanguage();

  const handleVoice = () => {
    const utter = new window.SpeechSynthesisUtterance(title);
    // Get language from localStorage if available
    const selectedLang = localStorage.getItem("selectedLanguage");
    if (selectedLang) {
      utter.lang = selectedLang;
    } else if (currentLanguage) {
      utter.lang =  currentLanguage;
        
    }
    window.speechSynthesis.speak(utter);
  };

  const colorClasses = {
    primary: "border-primary/20 hover:border-primary/40 hover:shadow-soft",
    earth: "border-amber-200 hover:border-amber-300 hover:shadow-soft",
    success: "border-emerald-200 hover:border-emerald-300 hover:shadow-soft",
    accent: "border-blue-200 hover:border-blue-300 hover:shadow-soft",
  };

  return (
    <Card className={`transition-all duration-300 hover:scale-105 animate-fade-in ${colorClasses[color]}`}>
      <CardHeader className="pb-3">
        <div className="relative h-48 rounded-lg overflow-hidden mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-3 left-3 p-2 bg-white/90 rounded-lg">
            {icon}
          </div>
        </div>
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Button variant="voice" size="sm" className="flex-1" onClick={handleVoice}>
            <Mic className="h-4 w-4" />
            {t('common.voice')}
          </Button>
          <Link to={href} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              {t('common.open')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;