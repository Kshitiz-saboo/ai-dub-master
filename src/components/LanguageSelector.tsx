import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Globe, Mic } from "lucide-react";

interface LanguageSelectorProps {
  sourceLanguage: string;
  targetLanguage: string;
  voiceOption: string;
  onSourceLanguageChange: (language: string) => void;
  onTargetLanguageChange: (language: string) => void;
  onVoiceOptionChange: (option: string) => void;
  onContinue: () => void;
  fileName: string;
}

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese (Mandarin)" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
];

const voiceOptions = [
  { value: "clone", label: "Clone Original Voice", description: "AI replicates the original speaker's voice" },
  { value: "professional-male", label: "Professional Male Voice", description: "High-quality male AI voice" },
  { value: "professional-female", label: "Professional Female Voice", description: "High-quality female AI voice" },
  { value: "natural-male", label: "Natural Male Voice", description: "Standard male AI voice" },
  { value: "natural-female", label: "Natural Female Voice", description: "Standard female AI voice" },
];

export function LanguageSelector({
  sourceLanguage,
  targetLanguage,
  voiceOption,
  onSourceLanguageChange,
  onTargetLanguageChange,
  onVoiceOptionChange,
  onContinue,
  fileName
}: LanguageSelectorProps) {
  const canContinue = sourceLanguage && targetLanguage && voiceOption && sourceLanguage !== targetLanguage;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Configure Your Dubbing</h2>
        <p className="text-muted-foreground">
          Processing: <span className="text-ai-primary font-medium">{fileName}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-card backdrop-blur-md border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-5 w-5 text-ai-primary" />
            <h3 className="text-lg font-semibold">Language Selection</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Source Language
              </label>
              <Select value={sourceLanguage} onValueChange={onSourceLanguageChange}>
                <SelectTrigger className="bg-card/50">
                  <SelectValue placeholder="Select source language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <div className="p-2 bg-ai-primary/10 rounded-full">
                <ArrowRight className="h-4 w-4 text-ai-primary" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Target Language
              </label>
              <Select value={targetLanguage} onValueChange={onTargetLanguageChange}>
                <SelectTrigger className="bg-card/50">
                  <SelectValue placeholder="Select target language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card backdrop-blur-md border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <Mic className="h-5 w-5 text-ai-primary" />
            <h3 className="text-lg font-semibold">Voice Options</h3>
          </div>
          
          <div className="space-y-3">
            {voiceOptions.map((option) => (
              <div
                key={option.value}
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                  voiceOption === option.value
                    ? "border-ai-primary bg-ai-primary/10 shadow-glow"
                    : "border-border/50 bg-card/20 hover:border-ai-primary/50"
                }`}
                onClick={() => onVoiceOptionChange(option.value)}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={voiceOption === option.value}
                    onChange={() => onVoiceOptionChange(option.value)}
                    className="text-ai-primary focus:ring-ai-primary"
                  />
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="text-center">
        <Button
          variant="hero"
          size="lg"
          onClick={onContinue}
          disabled={!canContinue}
          className="px-8"
        >
          Start Dubbing Process
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}