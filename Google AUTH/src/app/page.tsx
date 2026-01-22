"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User as UserIcon } from "lucide-react";
import Loader from "@/components/loader";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function HomePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card/80 backdrop-blur-sm px-4 sm:px-6">
        <h1 className="text-xl font-bold text-primary font-headline">AuthNexus</h1>
        <Button onClick={logout} variant="ghost" size="sm">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-lg shadow-2xl animate-in fade-in-50 zoom-in-95 duration-500">
          <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24 mb-4 border-2 border-primary/10">
              <AvatarImage src={user.photoURL || userAvatar?.imageUrl} alt={user.displayName || "User"} data-ai-hint={userAvatar?.imageHint || 'avatar person'} />
              <AvatarFallback>
                <UserIcon className="h-12 w-12 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl font-bold">Welcome, {user.displayName || "User"}!</CardTitle>
            <CardDescription>You have successfully and securely logged in.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-1 rounded-lg border bg-secondary/50 p-4">
              <p className="text-sm font-medium text-muted-foreground">Email Address</p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
            <div className="flex justify-center pt-4">
              <Button onClick={logout} className="bg-accent text-accent-foreground hover:bg-accent/90">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
