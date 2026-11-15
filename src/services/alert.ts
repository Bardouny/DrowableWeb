import { toast } from "sonner";

type AlertOptions = {
  description?: string;
};

function getToastOptions(description?: string) {
  return description ? { description } : undefined;
}

export const alertService = {
  success(message: string, options?: AlertOptions) {
    return toast.success(message, getToastOptions(options?.description));
  },

  error(message: string, options?: AlertOptions) {
    return toast.error(message, getToastOptions(options?.description));
  },

  info(message: string, options?: AlertOptions) {
    return toast.info(message, getToastOptions(options?.description));
  },

  warning(message: string, options?: AlertOptions) {
    return toast.warning(message, getToastOptions(options?.description));
  },

  loading(message: string, options?: AlertOptions) {
    return toast.loading(message, getToastOptions(options?.description));
  },

  dismiss(toastId?: number | string) {
    toast.dismiss(toastId);
  },
};
