import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileVideo, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoUploaderProps {
  onUpload: (file: File) => void;
}

export function VideoUploader({ onUpload }: VideoUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    const validTypes = ['video/mp4', 'video/mov', 'video/quicktime', 'video/avi', 'video/x-msvideo', 'video/x-matroska'];
    const maxSize = 500 * 1024 * 1024; // 500MB

    if (!validTypes.includes(file.type)) {
      return "Please upload a valid video file (MP4, MOV, AVI, MKV)";
    }

    if (file.size > maxSize) {
      return "File size must be less than 500MB";
    }

    return null;
  };

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    onUpload(file);
  }, [onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  }, [handleFileSelect]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          AI Video Dubber
        </h1>
        <p className="text-xl text-muted-foreground">
          Transform your videos with AI-powered dubbing in any language
        </p>
      </div>

      <Card className={cn(
        "relative p-12 border-2 border-dashed transition-all duration-300 bg-gradient-card backdrop-blur-md",
        isDragOver 
          ? "border-ai-primary shadow-glow animate-pulse-glow" 
          : "border-border hover:border-ai-primary/50 hover:shadow-card"
      )}>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className="text-center space-y-6"
        >
          <div className="flex justify-center">
            <div className={cn(
              "p-6 rounded-full transition-all duration-300",
              isDragOver 
                ? "bg-ai-primary/20 shadow-glow" 
                : "bg-ai-primary/10"
            )}>
              <Upload className={cn(
                "h-12 w-12 transition-colors duration-300",
                isDragOver ? "text-ai-primary" : "text-ai-primary/70"
              )} />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">
              Drop your video here
            </h3>
            <p className="text-muted-foreground">
              or click to browse files
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileVideo className="h-4 w-4" />
              <span>MP4, MOV, AVI, MKV</span>
            </div>
            <div className="text-muted-foreground/60">•</div>
            <span>Max 500MB</span>
            <div className="text-muted-foreground/60">•</div>
            <span>Max 30 minutes</span>
          </div>

          <input
            type="file"
            accept="video/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <Button variant="hero" size="lg" className="mt-4">
            <Upload className="h-5 w-5" />
            Browse Files
          </Button>
        </div>
      </Card>

      {error && (
        <Card className="mt-6 p-4 bg-destructive/10 border-destructive/20">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        </Card>
      )}
    </div>
  );
}