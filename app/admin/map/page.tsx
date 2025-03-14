'use client';

import { useState } from 'react';
import Map, { Marker, Circle } from 'react-map-gl';
import { Alert, Organization, Resource } from '@/app/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Building2, Package } from 'lucide-react';

const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN'; // Replace with your token

export default function MapPage() {
  const [viewState, setViewState] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 11
  });

  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      severity: 'red',
      title: 'Severe Flooding',
      description: 'Downtown area affected',
      affectedAreas: [{
        center: { lat: 40.7128, lng: -74.006 },
        radius: 5,
        name: 'Downtown',
        population: 50000
      }],
      timestamp: new Date().toISOString(),
      isActive: true,
      createdBy: 'admin',
      updates: []
    }
  ]);

  const [organizations] = useState<Organization[]>([
    {
      id: '1',
      name: 'City Hospital',
      type: 'healthcare',
      capabilities: ['Emergency Care'],
      coverage: {
        center: { lat: 40.7200, lng: -74.000 },
        radius: 2
      },
      status: 'active',
      contact: {
        email: 'emergency@hospital.org',
        phone: '555-0123',
        emergency: '555-0911'
      },
      address: '123 Medical Dr',
      operatingHours: {
        start: '00:00',
        end: '24:00',
        timezone: 'UTC'
      },
      resources: [],
      personnel: []
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Interactive Map</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-3">
          <CardContent className="p-0">
            <div className="h-[600px] w-full">
              <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
              >
                {alerts.map(alert => (
                  <Circle
                    key={alert.id}
                    center={[
                      alert.affectedAreas[0].center.lng,
                      alert.affectedAreas[0].center.lat
                    ]}
                    radius={alert.affectedAreas[0].radius * 1000}
                    fillColor={
                      alert.severity === 'red' ? '#ef444480' :
                      alert.severity === 'orange' ? '#f9731680' :
                      alert.severity === 'yellow' ? '#eab30880' :
                      '#22c55e80'
                    }
                    strokeColor={
                      alert.severity === 'red' ? '#ef4444' :
                      alert.severity === 'orange' ? '#f97316' :
                      alert.severity === 'yellow' ? '#eab308' :
                      '#22c55e'
                    }
                  />
                ))}

                {organizations.map(org => (
                  <Marker
                    key={org.id}
                    latitude={org.coverage.center.lat}
                    longitude={org.coverage.center.lng}
                  >
                    <Building2 className="h-6 w-6 text-primary" />
                  </Marker>
                ))}
              </Map>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span>Active Alert</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <span>Organization</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                <span>Resource</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}