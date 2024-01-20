import { useEffect } from "react";
import { StyledToastContainer } from "./toast.styles";

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, show, onClose }) => {
  useEffect(() => {
    const hideToast = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(hideToast);
  }, [onClose]);

  return <StyledToastContainer $show={show}>{message}</StyledToastContainer>;
};

export default Toast;
