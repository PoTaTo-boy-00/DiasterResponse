'use client';

import { cn } from '@/lib/utils';
import {
  AlertTriangle,
  Box,
  Building2,
  LayoutDashboard,
  Map,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/partner', icon: LayoutDashboard },
  { name: 'Alerts', href: '/partner/alerts', icon: AlertTriangle },
  { name: 'Resources', href: '/partner/resources', icon: Box },
  { name: 'Personnel', href: '/partner/personnel', icon: Users },
  { name: 'Map', href: '/partner/map', icon: Map },
  { name: 'Messages', href: '/partner/messages', icon: MessageSquare },
  { name: 'Organization', href: '/partner/organization', icon: Building2 },
  { name: 'Settings', href: '/partner/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r">
      <div className="flex h-16 items-center border-b px-6">
        <span className="text-lg font-semibold">Partner Dashboard</span>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              )}
            >
              <item.icon
                className={cn('mr-3 h-5 w-5 flex-shrink-0')}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}