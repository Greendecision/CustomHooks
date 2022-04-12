import { useSnackbar, VariantType } from "notistack";
import React from "react";

/** Hook for alert management. */
export const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar();
  return {
    /**
     * Add an alert with optional action button(s) to the current stack of alerts. It will be hidden after 3.5 seconds.
     * @param message {string} Message to show.
     * @param type {"default"|"error"|"success"|"warning"|"info"} Alert type.
     * @param action {ReactNode} Action button(s) to be displayed on the right of the alert.
     */
    showAlert: (message: string, type: VariantType, action?: React.ReactNode) => {
      enqueueSnackbar(message, {
        anchorOrigin: { horizontal: "right", vertical: "bottom" },
        autoHideDuration: 3500,
        variant: type,
        action,
      });
    },
    /**
     * Add an alert with optional sub-content to the current stack of alerts. It will be hidden after 3.5 seconds.
     * @param message Message to show.
     * @param type {"default"|"error"|"success"|"warning"|"info"} Alert type.
     * @param content {ReactNode} Sub-content of the alert, that is being displayed when clicking to the expand icon.
     */
    showAlertWithContent: (message: string, type: VariantType, content: React.ReactNode) => {
      enqueueSnackbar(message, {
        anchorOrigin: { horizontal: "right", vertical: "bottom" },
        autoHideDuration: 3500,
        variant: type,
        content,
      });
    },
  };
};

export default useAlert;
