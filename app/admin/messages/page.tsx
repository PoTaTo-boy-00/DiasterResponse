'use client';

import { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Message } from '@/app/types';

export default function MessagesPage() {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'user1',
      recipientId: null,
      type: 'broadcast',
      content: 'Emergency response teams needed in downtown area',
      timestamp: new Date().toISOString(),
      priority: 'urgent',
      status: 'delivered'
    },
    {
      id: '2',
      senderId: 'user2',
      recipientId: 'user1',
      type: 'direct',
      content: 'Medical supplies being dispatched to location',
      timestamp: new Date().toISOString(),
      priority: 'normal',
      status: 'read'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Messages</h1>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" /> New Message
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Input
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                {message.type === 'broadcast' ? 'Broadcast Message' : 'Direct Message'}
              </CardTitle>
              <span className={`px-2 py-1 rounded-full text-xs ${
                message.priority === 'urgent'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
              }`}>
                {message.priority}
              </span>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">{message.content}</p>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>{new Date(message.timestamp).toLocaleString()}</span>
                <span>{message.status}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}