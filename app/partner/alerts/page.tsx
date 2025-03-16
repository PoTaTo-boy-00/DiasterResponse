'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertBadge } from '../../components/alert-badge';
import { Alert } from '@/app/types';

export default function AlertsPage() {
  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      severity: 'red',
      title: 'Severe Flooding in Downtown',
      description: 'Multiple streets affected, immediate evacuation required',
      affectedAreas: [
        {
          center: { lat: 40.7128, lng: -74.006 },
          radius: 5,
          name: 'Downtown Area',
          population: 50000,
        },
      ],
      timestamp: new Date().toISOString(),
      isActive: true,
      createdBy: 'admin',
      updates: [],
    },
    {
      id: '2',
      severity: 'orange',
      title: 'High Wind Warning',
      description: 'Strong winds expected, secure loose objects',
      affectedAreas: [
        {
          center: { lat: 40.7128, lng: -74.006 },
          radius: 10,
          name: 'Metropolitan Area',
          population: 100000,
        },
      ],
      timestamp: new Date().toISOString(),
      isActive: true,
      createdBy: 'admin',
      updates: [],
    },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Active Alerts</h1>

      <div className="grid gap-4">
        {alerts.map((alert) => (
          <Card key={alert.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <AlertTriangle
                  className={
                    alert.severity === 'red'
                      ? 'text-red-500'
                      : 'text-yellow-500'
                  }
                />
                {alert.title}
              </CardTitle>
              <AlertBadge severity={alert.severity} />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{alert.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span>
                  Affected Areas:{' '}
                  {alert.affectedAreas.map((a) => a.name).join(', ')}
                </span>
                <span className="text-muted-foreground">
                  {new Date(alert.timestamp).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}