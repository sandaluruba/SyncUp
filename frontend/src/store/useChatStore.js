import { create } from "zustand";
import toast from "react-hot-toast";
import instance from "../lib/axios.js";


export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const res = await instance.get("/message/users");
            set({ users: res.data });
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to load users");
        } finally {
            set({ isUserLoading: false });
        }
    },

    getMessages: async (userId) => {
        try {
            set({ isMessagesLoading: true });
            const res = await instance.get(`/message/${userId}`);
            set({ messages: res.data });

        } catch (error) {
            console.error("Error fetching messages:", error);
            toast.error("Failed to load messages");
        } finally {
            set({ isMessagesLoading: false });
        }

    },

    setSelectedUser: (selectedUser) => set({selectedUser}),
}))
