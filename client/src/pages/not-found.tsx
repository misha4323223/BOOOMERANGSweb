import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center space-y-6 text-center px-4">
        <AlertTriangle className="h-24 w-24 text-primary animate-pulse" />
        <h1 className="text-6xl md:text-9xl font-display font-bold text-white tracking-tighter">404</h1>
        <p className="text-xl font-mono text-zinc-500 max-w-md">
          The page you are looking for has been lost in the void.
        </p>
        
        <Link href="/">
          <button className="mt-8 px-8 py-3 bg-white text-black font-display text-xl uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
