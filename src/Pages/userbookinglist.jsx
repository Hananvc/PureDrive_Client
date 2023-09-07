import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Button,
  Dialog, // Import the Dialog component
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axiosInstance from "../api/apiconfig";
import '../styles/test.css';
import '../styles/loginloader.css';
import { toast } from 'react-toastify';
import { MessageDialog } from './MessageDialog';


export function BookingCard() {


  return (
<div class="newtons-cradle">
<div class="newtons-cradle__dot"></div>
<div class="newtons-cradle__dot"></div>
<div class="newtons-cradle__dot"></div>
<div class="newtons-cradle__dot"></div>
</div>
  );
}
