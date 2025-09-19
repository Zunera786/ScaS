import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage, languages } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

interface LanguagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLanguageSelect: (languageCode: string) => void;
}

const LanguagePopup = ({ isOpen, onClose, onLanguageSelect }: LanguagePopupProps) => {

  const handleLanguageSelect = (languageCode: string) => {
    onLanguageSelect(languageCode);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center justify-center">
            <Globe className="h-5 w-5" />
            Select Your Language / अपनी भाषा चुनें
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4">
          {languages.map((language) => (
            <Card 
              key={language.code} 
              className="cursor-pointer hover:shadow-medium transition-all duration-200 hover:scale-105"
              onClick={() => handleLanguageSelect(language.code)}
            >
              <CardContent className="p-4 text-center">
                <div className="font-medium text-sm">{language.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{language.nativeName}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LanguagePopup;