```typescript
import localforage from 'localforage';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Initialize localforage instances for different data types
const messageQueue = localforage.createInstance({
  name: 'disasterResponse',
  storeName: 'messageQueue'
});

const resourceQueue = localforage.createInstance({
  name: 'disasterResponse',
  storeName: 'resourceQueue'
});

// Initialize Supabase client
const supabase = createClientComponentClient();

export interface QueuedMessage {
  id: string;
  content: string;
  senderId: string;
  recipientId: string | null;
  timestamp: string;
  type: 'direct' | 'broadcast';
  priority: 'normal' | 'urgent';
}

export interface QueuedResource {
  id: string;
  type: string;
  name: string;
  quantity: number;
  unit: string;
  organizationId: string;
  action: 'create' | 'update' | 'delete';
}

// Add message to queue when offline
export async function queueMessage(message: QueuedMessage) {
  await messageQueue.setItem(message.id, message);
}

// Add resource update to queue when offline
export async function queueResourceUpdate(resource: QueuedResource) {
  await resourceQueue.setItem(resource.id, resource);
}

// Sync queued messages when online
export async function syncMessages() {
  await messageQueue.iterate(async (message: QueuedMessage, key) => {
    try {
      await supabase.from('messages').insert(message);
      await messageQueue.removeItem(key);
    } catch (error) {
      console.error('Error syncing message:', error);
    }
  });
}

// Sync queued resource updates when online
export async function syncResources() {
  await resourceQueue.iterate(async (resource: QueuedResource, key) => {
    try {
      switch (resource.action) {
        case 'create':
          await supabase.from('resources').insert(resource);
          break;
        case 'update':
          await supabase.from('resources')
            .update(resource)
            .eq('id', resource.id);
          break;
        case 'delete':
          await supabase.from('resources')
            .delete()
            .eq('id', resource.id);
          break;
      }
      await resourceQueue.removeItem(key);
    } catch (error) {
      console.error('Error syncing resource:', error);
    }
  });
}

// Network status monitoring and auto-sync
export function initializeOfflineSync() {
  window.addEventListener('online', async () => {
    await syncMessages();
    await syncResources();
  });
}