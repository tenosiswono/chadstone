import React, { useContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    // Check active sessions and sets the user
    console.log('get ses')
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setLoading(false);

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );
    getNotifications()

    return () => {
      listener?.unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    if (user) {
      const subscription = supabase.from('notifications').on('*', () => {
        getNotifications()
      }).subscribe()
      return () => supabase.removeSubscription(subscription)
    }
  }, [user])

  const getNotifications = async () => {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('notifications')
        .select(`id, title, description, image_url`)
        .order('id', { ascending: false })

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setNotifications(data)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Will be passed down to Signup, Login and Dashboard components
  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    signGoogle: () => {
      supabase.auth.signIn({
        provider: "google",
      })
    },
    user,
    notifications,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext)
}

