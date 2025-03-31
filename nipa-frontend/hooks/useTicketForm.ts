import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postCreateTicket } from "@/lib/api/ticketApi";
import { toast } from "sonner";
import { AxiosError } from "axios";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(50, { message: "Title must be less than 50 characters" })
    .regex(/^[a-zA-Z0-9\s\-_.,!?()]+$/, {
      message:
        "Title may contain only letters, numbers, spaces, and basic punctuation",
    }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(500, { message: "Description must be less than 500 characters" })
    .regex(/^[a-zA-Z0-9\s\-_.,!?()]+$/, {
      message:
        "Description may contain only letters, numbers, spaces, and basic punctuation",
    }),
  contactInformation: z
    .string()
    .min(5, {
      message: "Contact information must be at least 5 characters long",
    })
    .max(200, {
      message: "Contact information must be less than 200 characters",
    })
    .regex(/^[a-zA-Z0-9\s\-_.,!?()@]+$/, {
      message:
        "Contact information may contain only letters, numbers, spaces, and basic punctuation",
    }),
});

export type TicketFormValues = z.infer<typeof formSchema>;

export function useTicketForm(onSuccess: () => void) {
  const form = useForm<TicketFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      contactInformation: "",
    },
  });

  const onSubmit = async (values: TicketFormValues) => {
    try {
      await postCreateTicket(
        values.title,
        values.description,
        values.contactInformation
      );
      toast.success("Ticket created successfully");
      form.reset();
      onSuccess();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Failed to create ticket", {
          description: error.response?.data.error.message,
        });
      }
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
