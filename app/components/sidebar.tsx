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
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Alerts', href: '/admin/alerts', icon: AlertTriangle },
  { name: 'Resources', href: '/admin/resources', icon: Box },
  { name: 'Organizations', href: '/admin/organizations', icon: Building2 },
  { name: 'Map', href: '/admin/map', icon: Map },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r">
      <div className="flex h-16 items-center border-b px-6">
        <span className="text-lg font-semibold">Admin Dashboard</span>
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