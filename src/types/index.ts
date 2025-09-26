export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'owner';
  createdAt: string;
  avatar?: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: 'apartment' | 'house' | 'townhouse' | 'condo' | 'loft';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  rent: number;
  deposit: number;
  status: 'available' | 'occupied' | 'maintenance';
  description: string;
  amenities: string[];
  images: string[];
  tenantId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  propertyId?: string;
  unit?: string;
  leaseStart?: string;
  leaseEnd?: string;
  rent?: number;
  deposit?: number;
  status: 'active' | 'pending' | 'expired';
  notes: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  tenantId: string;
  propertyId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  method?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'sent' | 'received';
}