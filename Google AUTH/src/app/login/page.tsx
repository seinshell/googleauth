"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GoogleIcon from "@/components/google-icon";
import Loader from "@/components/loader";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const { user, loading, loginWithGoogle } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      toast({
        title: "Success",
        description: "You have successfully signed in.",
      });
    } catch (error) {
      // Error is already handled in auth context, but you could add more specific UI feedback here
    }
  };
  
  if (loading || user) {
    return <Loader />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl animate-in fade-in-50 zoom-in-95 duration-500">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary font-headline">AuthNexus</CardTitle>
          <CardDescription className="pt-2">Secure, seamless sign-in with your Google account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6 pt-4">
            <Button
              onClick={handleLogin}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg transition-transform transform hover:scale-105"
            >
              <GoogleIcon className="mr-3 h-6 w-6" />
              Sign in with Google
            </Button>
             <p className="text-center text-xs text-muted-foreground px-4">
              By signing in, you agree to our terms of service and privacy policy. We use Google Authentication to ensure your data is safe.
            </p>
          </div>
        </CardContent>
      </Card>
       <footer className="absolute bottom-4 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} AuthNexus. All Rights Reserved.
      </footer>
    </main>
  );
}
