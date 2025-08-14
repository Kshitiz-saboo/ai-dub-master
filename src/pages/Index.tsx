import { useState } from "react";
import { VideoUploader } from "@/components/VideoUploader";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ProcessingProgress } from "@/components/ProcessingProgress";
import { VideoComparison } from "@/components/VideoComparison";

type AppStage = "upload" | "configure" | "processing" | "complete";

const Index = () => {
  const [stage, setStage] = useState<AppStage>("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [voiceOption, setVoiceOption] = useState("");

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setStage("configure");
  };

  const handleConfigureContinue = () => {
    setStage("processing");
  };

  const handleProcessingComplete = () => {
    setStage("complete");
  };

  const handleNewVideo = () => {
    setStage("upload");
    setUploadedFile(null);
    setSourceLanguage("");
    setTargetLanguage("");
    setVoiceOption("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {stage === "upload" && (
          <VideoUploader onUpload={handleFileUpload} />
        )}

        {stage === "configure" && uploadedFile && (
          <LanguageSelector
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            voiceOption={voiceOption}
            onSourceLanguageChange={setSourceLanguage}
            onTargetLanguageChange={setTargetLanguage}
            onVoiceOptionChange={setVoiceOption}
            onContinue={handleConfigureContinue}
            fileName={uploadedFile.name}
          />
        )}

        {stage === "processing" && uploadedFile && (
          <ProcessingProgress
            onComplete={handleProcessingComplete}
            fileName={uploadedFile.name}
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
          />
        )}

        {stage === "complete" && uploadedFile && (
          <VideoComparison
            fileName={uploadedFile.name}
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            onNewVideo={handleNewVideo}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
