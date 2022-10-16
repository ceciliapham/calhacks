import { useEffect, useState } from "react";
import AuthStackScreen from "./auth/AuthStackScreen";
import HomeScreen from "./root/HomeScreen";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils";
import React from "react";

export function EntryStackScreen() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser: any) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
  }, [setUser]);

  return user ? <HomeScreen /> : <AuthStackScreen />;
}