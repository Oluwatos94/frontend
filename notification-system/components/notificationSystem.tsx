"use client"; 

import dynamic from "next/dynamic";
import 'react-toastify/dist/ReactToastify.css';
import useContractListener from '../hooks/useContractListener';
import React from 'react';

const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);

const NotificationSystem = () => {
  useContractListener();

  return <ToastContainer />;
};

export default NotificationSystem;