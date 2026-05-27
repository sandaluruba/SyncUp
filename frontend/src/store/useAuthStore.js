import { create } from "zustand";
import instance from "../lib/axios.js";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSignInUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await instance.get("/auth/check");
            set({ authUser: res.data.user });
        } catch (error) {
            console.error("Error checking auth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (formData) => {
        set({ isSignInUp: true });
        try {
            const res = await instance.post("/auth/signup", formData);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            console.error("Error signing up:", error);
            toast.error(error.response.data.message || "Failed to create account");
        } finally {
            set({ isSignInUp: false });
        }
    },

    logOut: async () => {
        try{
            const res = await instance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully");
        } catch(error) {
            console.log("Error logging out:", error);
            toast.error("Failed to log out");
        }
    }
}));
