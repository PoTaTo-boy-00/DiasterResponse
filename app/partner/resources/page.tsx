'use client';

import { useState } from 'react';
import { Package, ArrowUpDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Resource } from '@/app/types';

export default function ResourcesPage() {
  const [resources] = useState<Resource[]>([
    {
      id: '1',
      type: 'food',
      name: 'Emergency Food Supplies',
      quantity: 1000,
      unit: 'packages',
      location: { lat: 40.7128, lng: -74.006 },
      status: 'available',
      organizationId: 'org1',
      lastUpdated: new Date().toISOString(),
      conditions: ['refrigerated', 'non-perishable'],
    },
    {
      id: '2',
      type: 'medicine',
      name: 'First Aid Kits',
      quantity: 500,
      unit: 'kits',
      location: { lat: 40.7128, lng: -74.006 },
      status: 'allocated',
      organizationId: 'org2',
      lastUpdated: new Date().toISOString(),
      expiryDate: '2025-12-31',
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Resource Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button>
            <Package className="mr-2 h-4 w-4" /> Add Resource
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Package className="h-5 w-5" />
                {resource.name}
              </CardTitle>
              <span className={`px-2 py-1 rounded-full text-sm ${
                resource.status === 'available' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
              }`}>
                {resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
              </span>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{resource.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-medium">{resource.quantity} {resource.unit}</p>
                </div>
                {resource.conditions && (
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Conditions</p>
                    <div className="flex gap-2 mt-1">
                      {resource.conditions.map((condition) => (
                        <span
                          key={condition}
                          className="px-2 py-1 bg-secondary rounded-full text-xs"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}