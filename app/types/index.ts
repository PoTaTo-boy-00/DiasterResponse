export type AlertSeverity = 'red' | 'orange' | 'yellow' | 'green';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'partner';
  organizationId?: string;
  createdAt: string;
  lastLogin: string;
}

export interface Alert {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  affectedAreas: GeoArea[];
  timestamp: string;
  isActive: boolean;
  createdBy: string;
  updates: AlertUpdate[];
}

export interface AlertUpdate {
  id: string;
  alertId: string;
  message: string;
  timestamp: string;
  userId: string;
}

export interface Resource {
  id: string;
  type: 'food' | 'medicine' | 'shelter' | 'equipment';
  name: string;
  quantity: number;
  unit: string;
  location: GeoLocation;
  status: 'available' | 'allocated' | 'depleted';
  organizationId: string;
  lastUpdated: string;
  expiryDate?: string;
  conditions?: string[];
}

export interface Organization {
  id: string;
  name: string;
  type: 'healthcare' | 'ngo' | 'essential' | 'infrastructure' | 'community' | 'private' | 'specialized';
  capabilities: string[];
  coverage: {
    center: GeoLocation;
    radius: number;
  };
  status: 'active' | 'inactive';
  contact: {
    email: string;
    phone: string;
    emergency: string;
  };
  address: string;
  operatingHours: {
    start: string;
    end: string;
    timezone: string;
  };
  resources: Resource[];
  personnel: Personnel[];
}

export interface Personnel {
  id: string;
  name: string;
  role: string;
  status: 'available' | 'deployed' | 'unavailable';
  location?: GeoLocation;
  skills: string[];
  contact: {
    phone: string;
    email: string;
  };
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string | null;
  type: 'direct' | 'group' | 'broadcast';
  content: string;
  timestamp: string;
  priority: 'normal' | 'urgent' | 'emergency';
  status: 'sent' | 'delivered' | 'read';
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  type: 'image' | 'document' | 'audio' | 'video';
  url: string;
  name: string;
  size: number;
}

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface GeoArea {
  center: GeoLocation;
  radius: number;
  name: string;
  population?: number;
}

export interface AnalyticsData {
  timeframe: 'day' | 'week' | 'month' | 'year';
  metrics: {
    activeAlerts: number;
    resolvedAlerts: number;
    deployedResources: number;
    activePersonnel: number;
    responseTime: number;
  };
  trends: {
    timestamp: string;
    value: number;
  }[];
}