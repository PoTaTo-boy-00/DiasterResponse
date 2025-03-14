'use client';

import { useState } from 'react';
import { Building2, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Organization } from '@/app/types';

export default function OrganizationsPage() {
  const [organizations] = useState<Organization[]>([
    {
      id: '1',
      name: 'City General Hospital',
      type: 'healthcare',
      capabilities: ['Emergency Care', 'Trauma Center', 'Ambulance Service'],
      coverage: {
        center: { lat: 40.7128, lng: -74.006 },
        radius: 10,
      },
      status: 'active',
      contact: {
        email: 'emergency@citygeneral.org',
        phone: '+1-555-0123',
        emergency: '+1-555-0911',
      },
      address: '123 Medical Center Blvd, City, State 12345',
      operatingHours: {
        start: '00:00',
        end: '24:00',
        timezone: 'America/New_York',
      },
      resources: [],
      personnel: [],
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Organizations</h1>
        <Button>
          <Building2 className="mr-2 h-4 w-4" /> Add Organization
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {organizations.map((org) => (
          <Card key={org.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {org.name}
              </CardTitle>
              <span className={`px-2 py-1 rounded-full text-sm ${
                org.status === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
              }`}>
                {org.status.charAt(0).toUpperCase() + org.status.slice(1)}
              </span>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-medium capitalize">{org.type}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Capabilities</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {org.capabilities.map((capability) => (
                    <span
                      key={capability}
                      className="px-2 py-1 bg-secondary rounded-full text-xs"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{org.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{org.contact.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                <span>{org.address}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}