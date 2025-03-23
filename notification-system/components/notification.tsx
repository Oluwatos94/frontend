"use client";

import { useEffect } from "react";
import { toast, ToastOptions } from "react-toastify";
import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  useEffect(() => {
    const toastOptions: ToastOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    switch (type) {
      case 'success':
        toast.success(message, toastOptions);
        break;
      case 'error':
        toast.error(message, toastOptions);
        break;
      case 'info':
        toast.info(message, toastOptions);
        break;
      case 'warning':
        toast.warn(message, toastOptions);
        break;
      default:
        toast(message, toastOptions);
    }
  }, [message, type]);

  return <></>;
};

export default Notification;