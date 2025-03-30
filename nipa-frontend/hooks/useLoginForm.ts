import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postLogin } from "@/lib/api/authApi";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await postLogin(values.email, values.password);
      if (response.success) {
        toast.success("Login successful", {
          description: "Welcome back!",
        });
        localStorage.setItem("token", response.data.token);
        router.push("/");
      } else {
        toast.error("Login failed", {
          description: response.error?.message,
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Login failed", {
          description: error.response?.data.error.message,
        });
      }
    }
  };

  return {
    form,
    onSubmit,
  };
}
