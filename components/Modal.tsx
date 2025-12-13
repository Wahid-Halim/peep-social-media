import React from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabe: string;
  disabled?: boolean;
}

const Modal = () => {
  return <div></div>;
};

export default Modal;
