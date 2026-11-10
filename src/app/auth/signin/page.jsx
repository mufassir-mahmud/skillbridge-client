"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  TextField,
  Label,
  InputGroup,
  Input,
  Button,
  Alert,
} from "@heroui/react";
import { At, Eye, EyeSlash, Lock } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setErrorMsg("");
  setSuccessMsg("");
  setLoading(true);

  try {
    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMsg(
        error.message || "Invalid email or password. Please try again."
      );
      return;
    }

    // Get the latest authenticated session
    const { data: sessionData, error: sessionError } =
      await authClient.getSession();

    if (sessionError || !sessionData?.user) {
      setErrorMsg("Unable to retrieve your session. Please try again.");
      return;
    }

    // Get the user's role
    const role = sessionData.user.role;

    console.log("Logged in user:", sessionData.user);
    console.log("User role:", role);

    // Role-based dashboard routes
    const dashboardRoutes = {
      client: "/dashboard/client",
      freelancer: "/dashboard/freelancer",
      admin: "/dashboard/admin",
    };

    const redirectPath = dashboardRoutes[role];

    if (!redirectPath) {
      setErrorMsg(`Invalid user role: ${role}`);
      return;
    }

    setSuccessMsg("Signed in successfully! Redirecting...");

    router.replace(redirectPath);
    router.refresh();

  } catch (err) {
    console.error("Sign in error:", err);
    setErrorMsg("An unexpected error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-950">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Success Banner */}
            {successMsg && (
              <Alert status="success">
                <Alert.Content>
                  <Alert.Title>Success</Alert.Title>
                  <Alert.Description>{successMsg}</Alert.Description>
                </Alert.Content>
              </Alert>
            )}

            {/* Error Banner */}
            {errorMsg && (
              <Alert status="danger">
                <Alert.Content>
                  <Alert.Title>Error</Alert.Title>
                  <Alert.Description>{errorMsg}</Alert.Description>
                </Alert.Content>
              </Alert>
            )}

            {/* Email Input */}
            <TextField isRequired className="w-full">
              <Label>Email Address</Label>
              <InputGroup className="w-full">
                <InputGroup.Prefix>
                  <At className="text-gray-400" />
                </InputGroup.Prefix>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full flex-1 min-w-0"
                />
              </InputGroup>
            </TextField>

            {/* Password Input */}
            <TextField isRequired className="w-full">
              <div className="flex items-center justify-between">
                <Label>Password</Label>
                <a
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <InputGroup className="relative w-full">
                <InputGroup.Prefix>
                  <Lock className="text-gray-400" />
                </InputGroup.Prefix>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full flex-1 min-w-0 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center cursor-pointer focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeSlash className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                  ) : (
                    <Eye className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                  )}
                </button>
              </InputGroup>
            </TextField>

            <Button
              type="submit"
              color="primary"
              isLoading={loading}
              className="bg-[#8661f1] w-full font-semibold text-white hover:bg-[#744ee6]"
            >
              Sign In
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}