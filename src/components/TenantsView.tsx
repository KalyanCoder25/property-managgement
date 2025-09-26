import React from 'react';
import { Phone, Mail, MapPin, Calendar, DollarSign, User, CreditCard as Edit, MoreVertical } from 'lucide-react';

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
  leaseStart: string;
  leaseEnd: string;
  rent: number;
  status: 'active' | 'pending' | 'expired';
  avatar?: string;
}

interface TenantsViewProps {
  searchQuery: string;
  onAddTenant: () => void;
}

const TenantsView: React.FC<TenantsViewProps> = ({ searchQuery, onAddTenant }) => {
  const tenants: Tenant[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(555) 123-4567',
      property: 'Sunset Apartments',
      unit: '2A',
      leaseStart: '2023-06-01',
      leaseEnd: '2024-06-01',
      rent: 1800,
      status: 'active',
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '(555) 987-6543',
      property: 'Riverside House',
      unit: '1',
      leaseStart: '2023-08-15',
      leaseEnd: '2024-08-15',
      rent: 3200,
      status: 'active',
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      email: 'emma.rodriguez@email.com',
      phone: '(555) 456-7890',
      property: 'Garden View Townhouse',
      unit: '3B',
      leaseStart: '2023-12-01',
      leaseEnd: '2024-12-01',
      rent: 2400,
      status: 'pending',
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '(555) 321-0987',
      property: 'Downtown Loft',
      unit: '5B',
      leaseStart: '2022-09-01',
      leaseEnd: '2023-09-01',
      rent: 2200,
      status: 'expired',
    },
  ];

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.property.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'expired':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const TenantCard = ({ tenant }: { tenant: Tenant }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{tenant.name}</h3>
            <p className="text-sm text-gray-500">{tenant.property} - Unit {tenant.unit}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(tenant.status)}`}>
            {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
          </span>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span>{tenant.email}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{tenant.phone}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Lease: {formatDate(tenant.leaseStart)} - {formatDate(tenant.leaseEnd)}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="font-semibold text-green-600">${tenant.rent}/month</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center space-x-2">
        <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
          View Details
        </button>
        <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
          <Edit className="w-4 h-4 inline mr-1" />
          Edit
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Tenants</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Expired</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Properties</option>
            <option>Sunset Apartments</option>
            <option>Garden View Townhouse</option>
            <option>Downtown Loft</option>
            <option>Riverside House</option>
          </select>
        </div>

        <div className="text-sm text-gray-500">
          {filteredTenants.length} tenant{filteredTenants.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Tenants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTenants.map(tenant => (
          <TenantCard key={tenant.id} tenant={tenant} />
        ))}
      </div>

      {filteredTenants.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tenants found</h3>
          <p className="text-gray-500 mb-4">
            {searchQuery ? 'Try adjusting your search criteria.' : 'Get started by adding your first tenant.'}
          </p>
          <button 
            onClick={onAddTenant}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Tenant
          </button>
        </div>
      )}
    </div>
  );
};

export default TenantsView;