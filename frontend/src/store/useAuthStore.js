import { create } from "zustand";
import instance from "../lib/axios.js";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5000";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSignInUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await instance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket();
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
            get().connectSocket();
        } catch (error) {
            console.error("Error signing up:", error);
            toast.error(error.response.data.message || "Failed to create account");
        } finally {
            set({ isSignInUp: false });
        }
    },

    logOut: async () => {
        try {
            const res = await instance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disConnectSocket();
        } catch (error) {
            console.log("Error logging out:", error);
            toast.error("Failed to log out");
        }
    },

    logIn: async (formData) => {
        set({ isLoggingIn: true });
        try {
            const res = await instance.post("/auth/login", formData);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
            get().connectSocket();
        } catch (error) {
            console.log("Error logging in:", error);
            toast.error("Failed to log in");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await instance.put("/auth/updateProfile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");

        } catch (error) {
            console.log("Error updating profile:", error);
            toast.error("Failed to update profile");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });
        socket.connect();
        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers: userIds});
        })
    },

    disConnectSocket: () => {
        if(get().socket.connected) get().socket.disconnect();
    }
}));
