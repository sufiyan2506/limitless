import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import { toast } from "@/hooks/use-toast";
import limitlessLogo from "@/assets/limitless-logo.png";
import { motion } from "framer-motion";

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
        });
        onLogin();
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 900);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden px-4">
      {/* --- Animated Background Glow --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 blur-[60px]" />

      {/* --- Floating particles (soft) --- */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute top-10 left-1/4 w-3 h-3 rounded-full bg-primary animate-pulse" />
        <div className="absolute bottom-16 right-1/3 w-2 h-2 rounded-full bg-accent animate-bounce" />
        <div className="absolute top-1/2 left-1/5 w-2 h-2 rounded-full bg-primary/70 animate-ping" />
      </div>

      {/* --- Login Card Animation --- */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="w-full glass rounded-2xl border border-white/20 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Animated Border Glow */}
          <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-br from-primary/20 via-transparent to-accent/20 [mask-composite:exclude] pointer-events-none" />

          <CardHeader className="text-center pb-2">
            <div className="flex flex-col items-center justify-center mb-4">
              <motion.img
                src={limitlessLogo}
                alt="Limitless Logo"
                className="w-16 h-16 mb-3"
                initial={{ rotate: -6, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />

              <GradientText
                colors={[
                  "hsl(var(--primary))",
                  "hsl(var(--accent))",
                  "hsl(var(--primary))",
                ]}
                className="text-2xl font-black tracking-wide"
              >
                LIMITLESS
              </GradientText>
            </div>

            <CardTitle className="text-xl font-bold tracking-tight">
              Admin Access
            </CardTitle>
            <CardDescription className="">
              Sign in to access the management dashboard
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4 pt-2">
              {/* EMAIL */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@limitless.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass border-white/20"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass border-white/20 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-2">
              <Button
                type="submit"
                className="w-full glass-strong hover:bg-primary/90 transition-all h-11 font-medium tracking-wide"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
