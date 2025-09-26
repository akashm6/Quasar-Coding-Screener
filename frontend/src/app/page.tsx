import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-zinc-950 dark:to-zinc-900">
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          EEG + ECG Signal Viewer
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl">
          Upload your CSV files and visualize EEG & ECG signals interactively.
        </p>

        <div className="w-full max-w-md">
          <FileUploader />
        </div>

        <Button
          asChild
          variant="outline"
          className="mt-6 flex items-center gap-2 hover:shadow-md hover:shadow-indigo-500/30 transition"
        >
          <a
            href="https://github.com/akashm6/Quasar-Coding-Screener"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
        </Button>
      </main>

      <footer className="py-6 border-t text-center text-sm text-zinc-400">
        <p>
          Built by{" "}
          <a
            href="https://akashmohan.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-purple-400 hover:drop-shadow-md transition"
          >
            Akash Mohan
          </a>{" "}
          for the QUASAR Software Intern Coding Screener
        </p>
      </footer>
    </div>
  );
}
