import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postCreateTicket } from "@/lib/api/ticketApi";
import { toast } from "sonner";
import { AxiosError } from "axios";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  contactInformation: z
    .string()
    .min(1, { message: "Contact information is required" }),
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
