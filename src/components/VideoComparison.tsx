import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Play, Pause, Volume2, Settings, FileText, CheckCircle } from "lucide-react";

interface VideoComparisonProps {
  fileName: string;
  sourceLanguage: string;
  targetLanguage: string;
  onNewVideo: () => void;
}

export function VideoComparison({
  fileName,
  sourceLanguage,
  targetLanguage,
  onNewVideo
}: VideoComparisonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [includeSubtitles, setIncludeSubtitles] = useState(true);
  const [exportFormat, setExportFormat] = useState("1080p");

  // Mock transcript data
  const originalTranscript = [
    { time: "00:00", text: "Hello everyone, welcome to today's presentation." },
    { time: "00:05", text: "We'll be discussing the future of artificial intelligence." },
    { time: "00:12", text: "This technology is revolutionizing how we work and live." },
    { time: "00:18", text: "Let's explore the key innovations and their impact." },
  ];

  const translatedTranscript = [
    { time: "00:00", text: "Hola a todos, bienvenidos a la presentación de hoy." },
    { time: "00:05", text: "Discutiremos el futuro de la inteligencia artificial." },
    { time: "00:12", text: "Esta tecnología está revolucionando cómo trabajamos y vivimos." },
    { time: "00:18", text: "Exploremos las innovaciones clave y su impacto." },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <CheckCircle className="h-8 w-8 text-success" />
          <h2 className="text-3xl font-bold">Dubbing Complete!</h2>
        </div>
        <p className="text-muted-foreground">
          Your video has been successfully dubbed from{" "}
          <span className="capitalize font-medium">{sourceLanguage}</span> to{" "}
          <span className="capitalize font-medium">{targetLanguage}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original Video */}
        <Card className="p-6 bg-gradient-card backdrop-blur-md border-border/50">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Original Video</h3>
              <span className="text-sm text-muted-foreground capitalize">
                {sourceLanguage}
              </span>
            </div>
            
            <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/20 to-muted/40">
                <div className="text-center">
                  <Play className="h-12 w-12 text-white/70 mx-auto mb-2" />
                  <p className="text-white/70 text-sm">Original Video Preview</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="glass"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-ai-primary rounded-full" />
              </div>
              
              <Button variant="ghost" size="sm">
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Dubbed Video */}
        <Card className="p-6 bg-gradient-card backdrop-blur-md border-border/50 border-ai-primary/30 shadow-glow">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Dubbed Video</h3>
              <span className="text-sm text-ai-primary capitalize font-medium">
                {targetLanguage}
              </span>
            </div>
            
            <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ai-primary/20 to-ai-secondary/40">
                <div className="text-center">
                  <Play className="h-12 w-12 text-white/70 mx-auto mb-2" />
                  <p className="text-white/70 text-sm">Dubbed Video Preview</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ai"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-primary rounded-full" />
              </div>
              
              <Button variant="ghost" size="sm">
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Transcripts */}
      <Card className="p-6 bg-gradient-card backdrop-blur-md border-border/50">
        <Tabs defaultValue="comparison" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="original">Original Transcript</TabsTrigger>
            <TabsTrigger value="translated">Translated Transcript</TabsTrigger>
            <TabsTrigger value="comparison">Side by Side</TabsTrigger>
          </TabsList>
          
          <TabsContent value="original" className="mt-6 space-y-3">
            {originalTranscript.map((item, index) => (
              <div key={index} className="flex gap-4 p-3 bg-card/20 rounded-lg">
                <span className="text-sm text-muted-foreground font-mono min-w-[50px]">
                  {item.time}
                </span>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="translated" className="mt-6 space-y-3">
            {translatedTranscript.map((item, index) => (
              <div key={index} className="flex gap-4 p-3 bg-card/20 rounded-lg">
                <span className="text-sm text-muted-foreground font-mono min-w-[50px]">
                  {item.time}
                </span>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="comparison" className="mt-6 space-y-4">
            {originalTranscript.map((item, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex gap-4 p-3 bg-card/20 rounded-lg">
                  <span className="text-sm text-muted-foreground font-mono min-w-[50px]">
                    {item.time}
                  </span>
                  <span className="text-sm">{item.text}</span>
                </div>
                <div className="flex gap-4 p-3 bg-ai-primary/10 rounded-lg border border-ai-primary/20">
                  <span className="text-sm text-muted-foreground font-mono min-w-[50px]">
                    {translatedTranscript[index].time}
                  </span>
                  <span className="text-sm">{translatedTranscript[index].text}</span>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </Card>

      {/* Export Options */}
      <Card className="p-6 bg-gradient-card backdrop-blur-md border-border/50">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-ai-primary" />
            <h3 className="text-lg font-semibold">Export Options</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">Video Quality</label>
              <div className="space-y-2">
                {["1080p", "720p"].map((format) => (
                  <label key={format} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value={format}
                      checked={exportFormat === format}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="text-ai-primary focus:ring-ai-primary"
                    />
                    <span className="text-sm">{format} MP4</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Additional Options</label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSubtitles}
                  onChange={(e) => setIncludeSubtitles(e.target.checked)}
                  className="text-ai-primary focus:ring-ai-primary"
                />
                <span className="text-sm">Include subtitles in video</span>
              </label>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button variant="outline" onClick={onNewVideo}>
              Process Another Video
            </Button>
            
            <div className="flex gap-3">
              <Button variant="glass">
                <FileText className="h-4 w-4" />
                Download Transcript
              </Button>
              <Button variant="hero" size="lg">
                <Download className="h-5 w-5" />
                Download Video ({exportFormat})
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}