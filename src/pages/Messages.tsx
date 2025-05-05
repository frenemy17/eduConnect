import React, { useState } from 'react';
import { Search, Video, Phone, MoreVertical, Send, Smile, Paperclip } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: number;
  sender: 'me' | 'other';
  content: string;
  time: string;
  read: boolean;
}

export default function Messages() {
  const { currentUser } = useAuth();
  const [activeConversation, setActiveConversation] = useState<number>(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock conversations
  const conversations: Conversation[] = [
    {
      id: 1,
      name: 'Emma Thompson',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Can we study together tomorrow?',
      time: '10:30 AM',
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Thanks for the help with calculus!',
      time: 'Yesterday',
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: 'Priya Patel',
      avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Did you see the assignment?',
      time: 'Yesterday',
      unread: 0,
      online: true,
    },
    {
      id: 4,
      name: 'Marcus Johnson',
      avatar: 'https://images.pexels.com/photos/2876486/pexels-photo-2876486.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Let me know if you need any more help',
      time: 'Mon',
      unread: 0,
      online: false,
    },
    {
      id: 5,
      name: 'Sophie Chen',
      avatar: 'https://images.pexels.com/photos/3783958/pexels-photo-3783958.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'See you in class tomorrow',
      time: 'Sun',
      unread: 0,
      online: true,
    },
  ];

  // Filter conversations by search term
  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mock messages for the active conversation
  const messages: Record<number, Message[]> = {
    1: [
      {
        id: 1,
        sender: 'other',
        content: 'Hi there! I noticed you\'re also taking Advanced Calculus this semester.',
        time: '10:15 AM',
        read: true,
      },
      {
        id: 2,
        sender: 'me',
        content: 'Yes, I am! Are you in Professor Martinez\'s class?',
        time: '10:18 AM',
        read: true,
      },
      {
        id: 3,
        sender: 'other',
        content: 'I am! I was wondering if you\'d like to form a study group for the midterm?',
        time: '10:20 AM',
        read: true,
      },
      {
        id: 4,
        sender: 'me',
        content: 'That sounds great! I was actually struggling with the latest concepts.',
        time: '10:23 AM',
        read: true,
      },
      {
        id: 5,
        sender: 'other',
        content: 'Perfect! I think we can help each other out. Can we study together tomorrow?',
        time: '10:30 AM',
        read: false,
      },
      {
        id: 6,
        sender: 'other',
        content: 'I\'m free after 3 PM. Does that work for you?',
        time: '10:31 AM',
        read: false,
      },
    ],
    2: [
      {
        id: 1,
        sender: 'me',
        content: 'Hey David, do you have the notes from yesterday\'s lecture?',
        time: '2:45 PM',
        read: true,
      },
      {
        id: 2,
        sender: 'other',
        content: 'Yes, I\'ll send them over in a minute!',
        time: '3:00 PM',
        read: true,
      },
      {
        id: 3,
        sender: 'other',
        content: 'Here they are. Let me know if you need anything else!',
        time: '3:05 PM',
        read: true,
      },
      {
        id: 4,
        sender: 'me',
        content: 'Thanks so much for the calculus help!',
        time: '4:30 PM',
        read: true,
      },
    ],
    3: [
      {
        id: 1,
        sender: 'other',
        content: 'Have you started working on the economics assignment?',
        time: '11:30 AM',
        read: true,
      },
      {
        id: 2,
        sender: 'me',
        content: 'Not yet, I was planning to start tomorrow. Is it difficult?',
        time: '11:45 AM',
        read: true,
      },
      {
        id: 3,
        sender: 'other',
        content: 'It\'s not too bad, but question 3 is tricky. Did you see the assignment details?',
        time: '12:00 PM',
        read: true,
      },
    ],
  };

  const activeConversationData = conversations.find((conv) => conv.id === activeConversation);
  const activeMessages = messages[activeConversation] || [];

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    // In a real app, you would send this to a backend
    // Here we're just updating the UI state
    const nextId = Math.max(...activeMessages.map((m) => m.id)) + 1;
    const newMessageObj: Message = {
      id: nextId,
      sender: 'me',
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };

    messages[activeConversation] = [...activeMessages, newMessageObj];
    setNewMessage('');
  };

  const startVideoCall = () => {
    // In a real app, this would start a video call
    // For demo purposes, we'll navigate to the study room
    window.location.href = '/study-room';
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)] flex overflow-hidden bg-white">
      {/* Conversation List */}
      <div className="w-full sm:w-80 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
          <div className="mt-2 relative">
            <input
              type="text"
              placeholder="Search conversations"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 border-b border-gray-100 flex items-center cursor-pointer hover:bg-gray-50 ${
                  activeConversation === conversation.id ? 'bg-indigo-50' : ''
                }`}
                onClick={() => setActiveConversation(conversation.id)}
              >
                <div className="relative">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                  )}
                </div>
                <div className="ml-3 flex-1 overflow-hidden">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="ml-2 bg-indigo-600 rounded-full w-5 h-5 flex items-center justify-center">
                    <span className="text-xs text-white">{conversation.unread}</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No conversations found</div>
          )}
        </div>
      </div>

      {/* Message Area */}
      <div className="hidden sm:flex flex-col flex-1">
        {activeConversationData ? (
          <>
            {/* Conversation Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <div className="flex items-center">
                <img
                  src={activeConversationData.avatar}
                  alt={activeConversationData.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">{activeConversationData.name}</h3>
                  <p className="text-xs text-gray-500">
                    {activeConversationData.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={startVideoCall}
                  className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100"
                >
                  <Video size={20} />
                </button>
                <button className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100">
                  <Phone size={20} />
                </button>
                <button className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'other' && (
                    <img
                      src={activeConversationData.avatar}
                      alt={activeConversationData.name}
                      className="w-8 h-8 rounded-full object-cover mr-2 self-end"
                    />
                  )}
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 ${
                      message.sender === 'me'
                        ? 'bg-indigo-100 text-indigo-900'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs text-right mt-1 text-gray-500">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-3">
              <div className="flex items-center">
                <button className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100">
                  <Smile size={20} />
                </button>
                <button className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100">
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Type a message"
                  className="flex-1 mx-2 py-2 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className={`p-2 rounded-full ${
                    newMessage.trim()
                      ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                      : 'text-gray-400 bg-gray-200'
                  }`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
              <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}