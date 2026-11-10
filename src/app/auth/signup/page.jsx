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
  Radio,
  RadioGroup,
} from "@heroui/react";
import { At, Eye, EyeSlash, Person, Picture, Lock } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";


export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    photoUrl: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.photoUrl,
        role: formData.role,
      });

      if (error) {
        setErrorMsg(error.message || "Failed to create account. Please try again.");
      } else {
  setSuccessMsg("Signed in successfully! Redirecting...");

  const { data: session } = await authClient.getSession();

  const role = session?.user?.role;

  const dashboardRoutes = {
    seeker: "/dashboard/client",
    employer: "/dashboard/freelencer",
    admin: "/dashboard/admin",
  };

  const redirectPath = dashboardRoutes[role] || "/";

  setTimeout(() => {
    router.replace(redirectPath);
  }, 1000);
}
    } catch (err) {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-950">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-sm text-gray-500">Sign up to get started</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Success Message Banner */}
          

            {/* Name Input */}
            <TextField isRequired className="w-full">
              <Label>Full Name</Label>
              <InputGroup className="w-full">
                <InputGroup.Prefix>
                  <Person className="text-gray-400" />
                </InputGroup.Prefix>
                <Input
                  placeholder="John Doe"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full flex-1 min-w-0"
                />
              </InputGroup>
            </TextField>

            {/* Photo URL Input */}
            <TextField className="w-full">
              <Label>Photo URL</Label>
              <InputGroup className="w-full">
                <InputGroup.Prefix>
                  <Picture className="text-gray-400" />
                </InputGroup.Prefix>
                <Input
                  placeholder="https://example.com/avatar.jpg"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  className="w-full flex-1 min-w-0"
                />
              </InputGroup>
            </TextField>

            {/* Email Input using Gravity UI At Icon */}
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
              <Label>Password</Label>
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

            {/* Confirm Password Input */}
            <TextField isRequired className="w-full">
              <Label>Confirm Password</Label>
              <InputGroup className="relative w-full">
                <InputGroup.Prefix>
                  <Lock className="text-gray-400" />
                </InputGroup.Prefix>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full flex-1 min-w-0 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center cursor-pointer focus:outline-none"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeSlash className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                  ) : (
                    <Eye className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                  )}
                </button>
              </InputGroup>
            </TextField>
                  {/* Role Input */}
                  <div className="flex flex-col gap-4">
  <Label id="role-label">Select A Role</Label>

  <RadioGroup
    aria-labelledby="role-label"
    name="role"
    value={formData.role}
    onChange={(value) =>
      setFormData((prev) => ({
        ...prev,
        role: value,
      }))
    }
    orientation="horizontal"
  >
    <Radio value="client">
      <Radio.Content>
        <Radio.Control>
          <Radio.Indicator />
        </Radio.Control>
        Client
      </Radio.Content>
    </Radio>

    <Radio value="recruiter">
      <Radio.Content>
        <Radio.Control>
          <Radio.Indicator />
        </Radio.Control>
        Freelencer
      </Radio.Content>
    </Radio>
  </RadioGroup>
</div>
            <Button
              type="submit"
              color="primary"
              isLoading={loading}
              className="bg-[#8661f1] w-full font-semibold text-white hover:bg-[#744ee6]"
            >
              Sign Up
            </Button>
              {successMsg && (
              <Alert status="success">
                <Alert.Content>
                  <Alert.Title>Success</Alert.Title>
                  <Alert.Description>{successMsg}</Alert.Description>
                </Alert.Content>
              </Alert>
            )}

            {/* Error Message Banner */}
            {errorMsg && (
              <Alert status="danger">
                <Alert.Content>
                  <Alert.Title>Error</Alert.Title>
                  <Alert.Description>{errorMsg}</Alert.Description>
                </Alert.Content>
              </Alert>
            )}
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}