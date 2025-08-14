import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
}

interface ProcessingProgressProps {
  onComplete: () => void;
  fileName: string;
  sourceLanguage: string;
  targetLanguage: string;
}

const processingSteps: ProcessingStep[] = [
  {
    id: "upload",
    title: "Uploading Video",
    description: "Securing your video file in our system",
    duration: 2
  },
  {
    id: "analyze",
    title: "Analyzing Audio",
    description: "Separating dialogue from background audio",
    duration: 8
  },
  {
    id: "translate",
    title: "Translating Content",
    description: "Converting speech to target language",
    duration: 6
  },
  {
    id: "generate",
    title: "Generating Dubbed Audio",
    description: "Creating AI voice in target language",
    duration: 12
  },
  {
    id: "lipsync",
    title: "Adjusting Lip-Sync",
    description: "Synchronizing lip movements with new audio",
    duration: 10
  },
  {
    id: "render",
    title: "Rendering Final Video",
    description: "Combining all elements into final output",
    duration: 8
  }
];

export function ProcessingProgress({ 
  onComplete, 
  fileName, 
  sourceLanguage, 
  targetLanguage 
}: ProcessingProgressProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const totalDuration = processingSteps.reduce((sum, step) => sum + step.duration, 0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let stepStartTime = Date.now();

    const updateProgress = () => {
      const currentStepData = processingSteps[currentStep];
      const elapsed = (Date.now() - stepStartTime) / 1000;
      const stepProgress = Math.min(elapsed / currentStepData.duration, 1);
      
      const previousStepsProgress = processingSteps
        .slice(0, currentStep)
        .reduce((sum, step) => sum + step.duration, 0);
      
      const overallProgress = ((previousStepsProgress + stepProgress * currentStepData.duration) / totalDuration) * 100;
      setProgress(overallProgress);

      if (stepProgress >= 1) {
        if (currentStep < processingSteps.length - 1) {
          setCurrentStep(currentStep + 1);
          stepStartTime = Date.now();
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
        }
      }
    };

    interval = setInterval(updateProgress, 100);
    return () => clearInterval(interval);
  }, [currentStep, onComplete, totalDuration]);

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return "completed";
    if (stepIndex === currentStep) return "active";
    return "pending";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Processing Your Video</h2>
        <p className="text-muted-foreground">
          Dubbing <span className="text-ai-primary font-medium">{fileName}</span> from{" "}
          <span className="capitalize">{sourceLanguage}</span> to{" "}
          <span className="capitalize">{targetLanguage}</span>
        </p>
      </div>

      <Card className="p-8 bg-gradient-card backdrop-blur-md border-border/50">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Overall Progress</span>
              <span className="text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3">
              <div className="h-full bg-gradient-primary rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-progress-flow" />
              </div>
            </Progress>
          </div>

          <div className="space-y-4">
            {processingSteps.map((step, index) => {
              const status = getStepStatus(index);
              return (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg transition-all duration-300",
                    status === "active" && "bg-ai-primary/10 border border-ai-primary/30 shadow-glow",
                    status === "completed" && "bg-success/10 border border-success/30",
                    status === "pending" && "bg-card/20 border border-border/30"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                    status === "active" && "bg-ai-primary text-primary-foreground",
                    status === "completed" && "bg-success text-white",
                    status === "pending" && "bg-muted text-muted-foreground"
                  )}>
                    {status === "completed" && <CheckCircle className="h-5 w-5" />}
                    {status === "active" && <Loader2 className="h-5 w-5 animate-spin" />}
                    {status === "pending" && <Clock className="h-5 w-5" />}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-medium",
                      status === "active" && "text-ai-primary",
                      status === "completed" && "text-success"
                    )}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {status === "active" && (
                    <div className="text-sm text-ai-primary font-medium">
                      Processing...
                    </div>
                  )}
                  {status === "completed" && (
                    <div className="text-sm text-success font-medium">
                      Complete
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}