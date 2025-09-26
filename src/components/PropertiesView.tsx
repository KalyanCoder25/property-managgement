import React, { useState } from 'react';
import { MapPin, Bed, Bath, Square, DollarSign, CreditCard as Edit, Eye, MoreVertical, Camera } from 'lucide-react';

interface Property {
  id: string;
  name: string;
  address: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  rent: number;
  status: 'available' | 'occupied' | 'maintenance';
  tenant?: string;
  image: string;
}

interface PropertiesViewProps {
  searchQuery: string;
  onAddProperty: () => void;
}

const PropertiesView: React.FC<PropertiesViewProps> = ({ searchQuery, onAddProperty }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const properties: Property[] = [
    {
      id: '1',
      name: 'Sunset Apartments Unit 2A',
      address: '123 Oak Street, Downtown',
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 1,
      sqft: 850,
      rent: 1800,
      status: 'occupied',
      tenant: 'Sarah Johnson',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '2',
      name: 'Garden View Townhouse',
      address: '456 Maple Drive, Suburbs',
      type: 'Townhouse',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1200,
      rent: 2400,
      status: 'available',
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '3',
      name: 'Downtown Loft 5B',
      address: '789 Pine Avenue, City Center',
      type: 'Loft',
      bedrooms: 1,
      bathrooms: 1,
      sqft: 650,
      rent: 2200,
      status: 'maintenance',
      image: 'https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '4',
      name: 'Riverside House',
      address: '321 River Road, Waterfront',
      type: 'House',
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2000,
      rent: 3200,
      status: 'occupied',
      tenant: 'Michael Chen',
      image: 'https://images.pexels.com/photos/1396125/pexels-photo-1396125.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'occupied':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'maintenance':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const PropertyCard = ({ property }: { property: Property }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img 
          src={property.image} 
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(property.status)}`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <button className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{property.name}</h3>
          <span className="text-lg font-bold text-green-600">${property.rent}</span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="line-clamp-1">{property.address}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span>{property.sqft} sq ft</span>
            </div>
          </div>
        </div>

        {property.tenant && (
          <div className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Tenant: </span>
            <span>{property.tenant}</span>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <Eye className="w-4 h-4" />
            <span>View</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              List
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Properties</option>
            <option>Available</option>
            <option>Occupied</option>
            <option>Maintenance</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Types</option>
            <option>Apartment</option>
            <option>House</option>
            <option>Townhouse</option>
            <option>Loft</option>
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
        : 'space-y-4'
      }>
        {filteredProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-500 mb-4">
            {searchQuery ? 'Try adjusting your search criteria.' : 'Get started by adding your first property.'}
          </p>
          <button 
            onClick={onAddProperty}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Property
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertiesView;