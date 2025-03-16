'use client';

import { useState } from 'react';
import { Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Personnel } from '@/app/types';

export default function PersonnelPage() {
  const [personnel] = useState<Personnel[]>([
    {
      id: '1',
      name: 'John Doe',
      role: 'Emergency Responder',
      status: 'deployed',
      location: { lat: 40.7128, lng: -74.006 },
      skills: ['First Aid', 'Search and Rescue', 'Crisis Management'],
      contact: {
        phone: '+1-555-0123',
        email: 'john.doe@example.com',
      },
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'Medical Officer',
      status: 'available',
      skills: ['Emergency Medicine', 'Trauma Care', 'Field Surgery'],
      contact: {
        phone: '+1-555-0124',
        email: 'jane.smith@example.com',
      },
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Personnel Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Personnel
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {personnel.map((person) => (
          <Card key={person.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                {person.name}
              </CardTitle>
              <span className={`px-2 py-1 rounded-full text-sm ${
                person.status === 'available'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                  : person.status === 'deployed'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
              }`}>
                {person.status.charAt(0).toUpperCase() + person.status.slice(1)}
              </span>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium">{person.role}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Skills</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {person.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-secondary rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{person.contact.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{person.contact.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}