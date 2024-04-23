import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type Message = {
  _id: string;
  message: string;
  receiverId: string;
  senderId: string;
  createdAt: string;
  updatedAt: string;
};

export interface User {
  _id: string;
  fullName: string;
  username: string;
  gender: number;
  profilePic: string;
}

export type Chat = {
  _id: string;
  messages: Message[];
  participants: User[];
  lastMessage: string;
  createdAt: string;
  updatedAt: string;
};

interface ChatState {
  chats: Chat[];
  selectedChat: Chat;
}

const initialState: ChatState = {
  chats: [],
  selectedChat: {
    _id: "",
    messages: [],
    participants: [],
    lastMessage: "",
    createdAt: "",
    updatedAt: "",
  },
};

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<Chat[]>) {
      state.chats = action.payload;
    },
    addNewChat(state, action: PayloadAction<Chat>) {
      state.chats.unshift(action.payload);
    },
    setSelectedChat(state, action: PayloadAction<Chat>) {
      state.selectedChat = action.payload;
    },
    createNewChat(state, action: PayloadAction<Chat>) {
      state.selectedChat = {
        _id: "",
        messages: [],
        participants: action.payload.participants,
        lastMessage: "",
        createdAt: "",
        updatedAt: "",
      };
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.selectedChat.messages.push(action.payload);
    },
    addMessageToChatList(
      state,
      action: PayloadAction<{ message: Message; conversationId: string }>
    ) {
      const { message, conversationId } = action.payload;

      // Find the chat in the list with the matching conversationId
      const chatIndex = state.chats.findIndex(
        (chat) => chat._id === conversationId
      );

      // Update the chat only if the conversationId is found
      if (chatIndex !== -1) {
        state.chats[chatIndex].messages.push(message);
        // Update the last message of the chat
        state.chats[chatIndex].lastMessage = message.message;
      }
    },
    resetChatSlice(state) {
      state.chats = [];
      state.selectedChat = {
        _id: "",
        messages: [],
        participants: [],
        lastMessage: "",
        createdAt: "",
        updatedAt: "",
      };
    },
  },
});

export const selectChats = (state: RootState) => state.chats.chats;
export const selectedChatMessages = (state: RootState) =>
  state.chats.selectedChat.messages;
export const selectedChatParticipants = (state: RootState) =>
  state.chats.selectedChat.participants;
export const isThereSelectedChat = (state: RootState) => {
  const selectedChat = state.chats.selectedChat;

  if (selectedChat.participants.length <= 0) {
    return false;
  }
  return true;
};

export const {
  setChats,
  addNewChat,
  setSelectedChat,
  addMessage,
  createNewChat,
  addMessageToChatList,
  resetChatSlice,
} = chatSlice.actions;

export default chatSlice.reducer;
