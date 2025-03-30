import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postRegister } from "@/lib/api/authApi";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3)
    .regex(/^[a-z0-9]+$/, {
      message: "Username may contain only lowercase letters and numbers",
    }),
  email: z.string().email(),
  password: z.string().min(8),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export function useRegisterForm(onSuccess: () => void) {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const response = await postRegister(
        values.username,
        values.email,
        values.password
      );
      if (response.success) {
        toast.success("Account created", {
          description: "Your account has been created successfully.",
        });
        onSuccess();
      } else {
        toast.error("Account creation failed", {
          description: response.error?.message,
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Account creation failed", {
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
