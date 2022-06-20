import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import NotificationList from "../components/NotificationList";
import { useAuth } from "../contexts/Auth";

export default function Home() {
  const { user } = useAuth();

  return user ? <NotificationList /> : <Auth />;
}
