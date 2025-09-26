import React, { useState } from 'react';
import { Send, Paperclip, Search, User, Clock } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'sent' | 'received';
}

interface Conversation {
  id: string;
  tenantName: string;
  property: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

const MessagesView = () => {
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      tenantName: 'Sarah Johnson',
      property: 'Sunset Apartments 2A',
      lastMessage: 'Thank you for the quick response!',
      timestamp: '2024-03-15T10:30:00',
      unreadCount: 0,
    },
    {
      id: '2',
      tenantName: 'Michael Chen',
      property: 'Riverside House',
      lastMessage: 'The AC repair is scheduled for tomorrow.',
      timestamp: '2024-03-15T09:15:00',
      unreadCount: 2,
    },
    {
      id: '3',
      tenantName: 'Emma Rodriguez',
      property: 'Garden View 3B',
      lastMessage: 'I have a question about the lease renewal.',
      timestamp: '2024-03-14T16:45:00',
      unreadCount: 1,
    },
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Sarah Johnson',
      recipient: 'Property Manager',
      content: 'Hi, I wanted to report that the kitchen faucet is leaking. Could someone take a look at it?',
      timestamp: '2024-03-15T09:00:00',
      read: true,
      type: 'received',
    },
    {
      id: '2',
      sender: 'Property Manager',
      recipient: 'Sarah Johnson',
      content: 'Hi Sarah, thank you for reporting this. I\'ll schedule a maintenance visit for tomorrow morning. Is 10 AM convenient for you?',
      timestamp: '2024-03-15T09:30:00',
      read: true,
      type: 'sent',
    },
    {
      id: '3',
      sender: 'Sarah Johnson',
      recipient: 'Property Manager',
      content: 'Yes, 10 AM works perfectly. Thank you for the quick response!',
      timestamp: '2024-03-15T10:30:00',
      read: true,
      type: 'received',
    },
  ];

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message sending logic here
      setNewMessage('');
    }
  };

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[calc(100vh-200px)] flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{conversation.tenantName}</h4>
                <span className="text-xs text-gray-500">{formatDate(conversation.timestamp)}</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">{conversation.property}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 truncate flex-1">{conversation.lastMessage}</p>
                {conversation.unreadCount > 0 && (
                  <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Message View */}
      <div className="flex-1 flex flex-col">
        {selectedConversationData ? (
          <>
            {/* Message Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{selectedConversationData.tenantName}</h3>
                  <p className="text-sm text-gray-500">{selectedConversationData.property}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'sent'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.type === 'sent' ? 'text-blue-200' : 'text-gray-500'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation from the list to start messaging.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesView;