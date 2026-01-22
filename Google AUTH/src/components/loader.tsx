import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Loader({ className }: { className?: string }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <Loader2 className={cn("h-16 w-16 animate-spin text-primary", className)} />
    </div>
  );
}
