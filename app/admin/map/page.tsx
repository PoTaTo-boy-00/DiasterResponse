"use client";

import { useState, useEffect } from "react";
import Map, { Marker, Source, Layer, LayerProps } from "react-map-gl";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Alert, Organization, Resource } from "@/app/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Building2, Package } from "lucide-react";
import * as turf from "@turf/turf";
import MapComponent from "@/components/ui/MapComponent";

export default function MapPage() {
  const [viewState, setViewState] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 11,
  });

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);

  const supabase = createClientComponentClient();

  const personnel = [
    {
      id: 1,
      location_lat: 26.544205506857356,
      location_lng: 88.70577006096832,
    }, // Jalpaiguri
  ];

  const sosAlerts = [
    { id: 1, location_lat: 26.54, location_lng: 88.71 }, // Near Jalpaiguri
  ];

  useEffect(() => {
    async function fetchData() {
      // Fetch alerts
      const { data: alertsData } = await supabase
        .from("alerts")
        .select("*")
        .eq("is_active", true);

      if (alertsData) {
        setAlerts(
          alertsData.map((alert) => ({
            ...alert,
            affected_Areas: alert.affected_areas as any,
          }))
        );
      }

      // Fetch organizations
      const { data: orgsData } = await supabase
        .from("organizations")
        .select("*")
        .eq("status", "active");

      if (orgsData) {
        setOrganizations(
          orgsData.map((org) => ({
            ...org,
            coverage: {
              center: { lat: org.coverage_lat, lng: org.coverage_lng },
              radius: org.coverage_radius,
            },
          }))
        );
      }

      // Fetch resources
      const { data: resourcesData } = await supabase
        .from("resources")
        .select("*")
        .eq("status", "available");

      if (resourcesData) {
        setResources(
          resourcesData.map((resource) => ({
            ...resource,
            location: {
              lat: resource.location_lat,
              lng: resource.location_lng,
            },
          }))
        );
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Interactive Map</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-3">
          <CardContent className="p-0">
            <div className="h-[600px] w-full">
              <MapComponent personnel={personnel} sosAlerts={sosAlerts} />
              <Map>
                {alerts.map((alert) => {
                  const center = [
                    alert.affected_Areas[0].center.lng,
                    alert.affected_Areas[0].center.lat,
                  ];

                  const circleGeoJSON = turf.circle(
                    center,
                    alert.affected_Areas[0].radius,
                    {
                      steps: 64,
                      units: "kilometers",
                    }
                  );

                  const circleLayer: LayerProps = {
                    id: `circle-layer-${alert.id}`,
                    type: "fill",
                    paint: {
                      "fill-color":
                        alert.severity === "red"
                          ? "#ef444480"
                          : alert.severity === "orange"
                          ? "#f9731680"
                          : alert.severity === "yellow"
                          ? "#eab30880"
                          : "#22c55e80",
                      "fill-opacity": 0.5,
                      "fill-outline-color":
                        alert.severity === "red"
                          ? "#ef4444"
                          : alert.severity === "orange"
                          ? "#f97316"
                          : alert.severity === "yellow"
                          ? "#eab308"
                          : "#22c55e",
                    },
                  };

                  return (
                    <Source
                      key={alert.id}
                      id={`circle-source-${alert.id}`}
                      type="geojson"
                      data={circleGeoJSON}
                    >
                      <Layer {...circleLayer} />
                    </Source>
                  );
                })}

                {organizations.map((org) => (
                  <Marker
                    key={org.id}
                    latitude={org.coverage.center.lat}
                    longitude={org.coverage.center.lng}
                  >
                    <Building2 className="h-6 w-6 text-primary" />
                  </Marker>
                ))}

                {resources.map((resource) => (
                  <Marker
                    key={resource.id}
                    latitude={resource.location.lat}
                    longitude={resource.location.lng}
                  >
                    <Package className="h-6 w-6 text-primary" />
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
