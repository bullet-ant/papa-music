"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, X, ClipboardPaste, Loader2 } from "lucide-react";

import { useState } from "react";

interface AudioStream {
  format: string;
  bitrate: number;
  filesize: number | null;
  url: string;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [audioStreams, setAudioStreams] = useState<AudioStream[]>([]);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [hasResults, setHasResults] = useState(false);
  const [selectedStreamIndex, setSelectedStreamIndex] = useState<string>("0");
  const [showHero, setShowHero] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isValidYouTubeUrl = (url: string) => {
    return url.includes("youtube.com/watch?v=") || url.includes("youtu.be/");
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setUrl(text);
  };

  const handleClear = () => {
    setUrl("");
  };

  const handleExtract = async () => {
    setShowHero(false); // Remove hero when download is clicked
    setError("");
    setLoading(true);
    setAudioStreams([]);
    setTitle("");
    setThumbnail("");
    setSelectedStreamIndex("0");
    setHasResults(false);
    setIsTransitioning(false);
    try {
      const res = await fetch("http://localhost:8000/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) {
        throw new Error("Extraction failed");
      }
      const data = await res.json();
      const streams = data.audio_streams || [];

      // Start fade-out transition
      setIsTransitioning(true);

      // Wait for fade-out to complete, then show results
      setTimeout(() => {
        setAudioStreams(streams);
        setTitle(data.title || "");
        setThumbnail(data.thumbnail || "");
        setLoading(false);
        setHasResults(true);
      }, 300); // Match the fade-out duration
    } catch (err) {
      setError("Failed to extract audio. Please check the URL and try again.");
      setShowHero(true); // Show hero again if error
      setLoading(false);
      setIsTransitioning(false);
    }
  };

  const handleDownload = () => {
    const selectedStream = audioStreams[parseInt(selectedStreamIndex)];
    if (selectedStream) {
      window.open(selectedStream.url, "_blank");
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      {/* Landing Page - Hero + Input Centered */}
      {showHero && (
        <div className="flex flex-col items-center justify-center h-screen transition-all duration-500 ease-out">
          <div className="mb-8 text-center fade-in">
            <h1 className="text-6xl font-bold mb-2">Papa Music</h1>
            <p className="text-muted-foreground text-lg">
              Download audio from YouTube with ease
            </p>
          </div>

          <div className="w-full max-w-2xl px-4 space-y-4">
            {/* Input field with icons */}
            <div className="relative">
              <button
                onClick={handlePaste}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <ClipboardPaste className="h-5 w-5" />
              </button>
              <Input
                className="flex-1 h-12 pl-10 pr-24"
                placeholder="paste the link here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && isValidYouTubeUrl(url) && !loading) {
                    handleExtract();
                  }
                }}
              />
              {url && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    onClick={handleClear}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  {isValidYouTubeUrl(url) && (
                    <button
                      onClick={handleExtract}
                      disabled={loading}
                      className="text-foreground hover:text-foreground/80"
                    >
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Download className="h-5 w-5" />
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-500 mt-4 text-center w-full px-4">{error}</div>
      )}

      {/* Skeleton Loading State */}
      {loading && !showHero && (
        <div className="flex flex-col items-center justify-center h-screen px-4">
          <div className="w-full max-w-2xl space-y-4">
            {/* Input field */}
            <div className="relative">
              <button
                onClick={handlePaste}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <ClipboardPaste className="h-5 w-5" />
              </button>
              <Input
                className="flex-1 h-12 pl-10 pr-24"
                placeholder="paste the link here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && isValidYouTubeUrl(url) && !loading) {
                    handleExtract();
                  }
                }}
              />
              {url && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    onClick={handleClear}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  {isValidYouTubeUrl(url) && (
                    <button
                      onClick={handleExtract}
                      disabled={loading}
                      className="text-foreground hover:text-foreground/80"
                    >
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Skeleton Card */}
            <Card className={isTransitioning ? "fade-out" : ""}>
              <CardContent className="p-4 space-y-3">
                {/* Skeleton Thumbnail */}
                <Skeleton className="w-full h-40 rounded-lg" />

                {/* Skeleton Title */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-3/4 mx-auto" />
                  <Skeleton className="h-5 w-1/2 mx-auto" />
                </div>

                {/* Skeleton Selector */}
                <div className="space-y-2">
                  <Skeleton className="h-3 w-1/4" />
                  <Skeleton className="h-9 w-full" />
                </div>

                {/* Skeleton Button */}
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Results Section - Single Card */}
      {hasResults && audioStreams.length > 0 && !loading && (
        <div className="flex flex-col items-center justify-center h-screen px-4">
          <div className="w-full max-w-2xl space-y-4">
            {/* Input field */}
            <div className="relative">
              <button
                onClick={handlePaste}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <ClipboardPaste className="h-5 w-5" />
              </button>
              <Input
                className="flex-1 h-12 pl-10 pr-24"
                placeholder="paste the link here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && isValidYouTubeUrl(url) && !loading) {
                    handleExtract();
                  }
                }}
              />
              {url && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    onClick={handleClear}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  {isValidYouTubeUrl(url) && (
                    <button
                      onClick={handleExtract}
                      disabled={loading}
                      className="text-foreground hover:text-foreground/80"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Results Card */}
            <Card className="fade-in">
              <CardContent className="p-4 space-y-3">
                {/* Thumbnail - constrained height */}
                {thumbnail && (
                  <img
                    src={thumbnail}
                    alt="thumbnail"
                    className="w-full rounded-lg h-40 object-cover"
                  />
                )}

                {/* Title - truncated */}
                {title && (
                  <h2 className="text-xl font-semibold text-center line-clamp-2">
                    {title}
                  </h2>
                )}

                {/* Bitrate Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Select Audio Quality
                  </label>
                  <Select
                    value={selectedStreamIndex}
                    onValueChange={setSelectedStreamIndex}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a bitrate" />
                    </SelectTrigger>
                    <SelectContent>
                      {audioStreams
                        .sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0))
                        .map((stream, idx) => (
                          <SelectItem key={idx} value={idx.toString()}>
                            {stream.format} -{" "}
                            {stream.bitrate.toFixed(0) || "Unknown"} kbps
                            {stream.filesize
                              ? ` (${(stream.filesize / (1024 * 1024)).toFixed(
                                  2
                                )} MB)`
                              : ""}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Download Button */}
                <Button onClick={handleDownload} className="w-full" size="lg">
                  <Download className="h-5 w-5 mr-2" />
                  Download Audio
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
