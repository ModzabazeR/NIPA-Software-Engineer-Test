"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginForm } from "@/hooks/useLoginForm";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";

export default function AuthPage() {
  const [selectedTab, setSelectedTab] = useState<"login" | "register">("login");

  const { form: loginForm, onSubmit: handleLogin } = useLoginForm();
  const { form: registerForm, onSubmit: handleRegister } = useRegisterForm(
    () => {
      setSelectedTab("login");
    }
  );

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Tabs
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value as "login" | "register")}
        className="w-sm"
      >
        <TabsList className="flex w-full">
          <TabsTrigger className="cursor-pointer" value="login">
            Login
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="register">
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="animate-fade-left">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm form={loginForm} onSubmit={handleLogin} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card className="animate-fade-right">
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                Fill in your details to create a new account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm form={registerForm} onSubmit={handleRegister} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
