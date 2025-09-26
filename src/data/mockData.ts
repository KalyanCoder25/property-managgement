import { faker } from '@faker-js/faker';
import { Property, Tenant, Payment } from '../types';

// Property images from Pexels
const propertyImages = [
  'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396125/pexels-photo-1396125.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396119/pexels-photo-1396119.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396126/pexels-photo-1396126.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396127/pexels-photo-1396127.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396128/pexels-photo-1396128.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396129/pexels-photo-1396129.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396130/pexels-photo-1396130.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396131/pexels-photo-1396131.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396133/pexels-photo-1396133.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396134/pexels-photo-1396134.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396135/pexels-photo-1396135.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396136/pexels-photo-1396136.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396137/pexels-photo-1396137.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396138/pexels-photo-1396138.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2121122/pexels-photo-2121122.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2121123/pexels-photo-2121123.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2121124/pexels-photo-2121124.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2121125/pexels-photo-2121125.jpeg?auto=compress&cs=tinysrgb&w=800',
];

// Tenant profile pictures from Pexels
const tenantAvatars = [
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239289/pexels-photo-1239289.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239290/pexels-photo-1239290.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239292/pexels-photo-1239292.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239293/pexels-photo-1239293.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239294/pexels-photo-1239294.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239295/pexels-photo-1239295.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239296/pexels-photo-1239296.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239297/pexels-photo-1239297.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239298/pexels-photo-1239298.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239299/pexels-photo-1239299.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239300/pexels-photo-1239300.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239301/pexels-photo-1239301.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239302/pexels-photo-1239302.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239303/pexels-photo-1239303.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239304/pexels-photo-1239304.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239305/pexels-photo-1239305.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1239306/pexels-photo-1239306.jpeg?auto=compress&cs=tinysrgb&w=200',
];

const propertyTypes = ['apartment', 'house', 'townhouse', 'condo', 'loft'] as const;
const statuses = ['available', 'occupied', 'maintenance'] as const;
const tenantStatuses = ['active', 'pending', 'expired'] as const;
const paymentStatuses = ['paid', 'pending', 'overdue'] as const;
const paymentMethods = ['Bank Transfer', 'Check', 'Credit Card', 'Cash', 'Online Payment'];

const amenities = [
  'Parking', 'Laundry', 'Air Conditioning', 'Heating', 'Dishwasher',
  'Balcony', 'Gym Access', 'Pool Access', 'Pet Friendly', 'Furnished',
  'Utilities Included', 'Elevator', 'Security System', 'Garden',
  'Fireplace', 'Walk-in Closet', 'Hardwood Floors', 'Updated Kitchen'
];

// Generate 500+ properties
export const generateProperties = (count: number = 500): Property[] => {
  const properties: Property[] = [];
  
  for (let i = 0; i < count; i++) {
    const bedrooms = faker.number.int({ min: 1, max: 5 });
    const bathrooms = faker.number.float({ min: 1, max: 4, fractionDigits: 1 });
    const sqft = faker.number.int({ min: 500, max: 3000 });
    const rent = faker.number.int({ min: 800, max: 5000 });
    
    properties.push({
      id: faker.string.uuid(),
      name: `${faker.location.streetAddress()} ${faker.helpers.arrayElement(['Apt', 'Unit', 'Suite'])} ${faker.number.int({ min: 1, max: 50 })}${faker.helpers.arrayElement(['A', 'B', 'C', ''])}`,
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      zipCode: faker.location.zipCode(),
      type: faker.helpers.arrayElement(propertyTypes),
      bedrooms,
      bathrooms,
      sqft,
      rent,
      deposit: rent,
      status: faker.helpers.arrayElement(statuses),
      description: faker.lorem.paragraph(),
      amenities: faker.helpers.arrayElements(amenities, { min: 2, max: 8 }),
      images: [
        propertyImages[i % propertyImages.length],
        propertyImages[(i + 1) % propertyImages.length],
        propertyImages[(i + 2) % propertyImages.length],
      ],
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    });
  }
  
  return properties;
};

// Generate 100+ tenants
export const generateTenants = (count: number = 150): Tenant[] => {
  const tenants: Tenant[] = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const leaseStart = faker.date.past();
    const leaseEnd = new Date(leaseStart);
    leaseEnd.setFullYear(leaseEnd.getFullYear() + 1);
    
    tenants.push({
      id: faker.string.uuid(),
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }),
      phone: faker.phone.number(),
      emergencyContact: faker.person.fullName(),
      emergencyPhone: faker.phone.number(),
      unit: `${faker.number.int({ min: 1, max: 50 })}${faker.helpers.arrayElement(['A', 'B', 'C', ''])}`,
      leaseStart: leaseStart.toISOString().split('T')[0],
      leaseEnd: leaseEnd.toISOString().split('T')[0],
      rent: faker.number.int({ min: 800, max: 5000 }),
      deposit: faker.number.int({ min: 800, max: 5000 }),
      status: faker.helpers.arrayElement(tenantStatuses),
      notes: faker.lorem.sentence(),
      avatar: tenantAvatars[i % tenantAvatars.length],
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    });
  }
  
  return tenants;
};

// Generate payments
export const generatePayments = (tenants: Tenant[], properties: Property[], count: number = 300): Payment[] => {
  const payments: Payment[] = [];
  
  for (let i = 0; i < count; i++) {
    const tenant = faker.helpers.arrayElement(tenants);
    const property = faker.helpers.arrayElement(properties);
    const dueDate = faker.date.recent();
    const status = faker.helpers.arrayElement(paymentStatuses);
    
    payments.push({
      id: faker.string.uuid(),
      tenantId: tenant.id,
      propertyId: property.id,
      amount: faker.number.int({ min: 800, max: 5000 }),
      dueDate: dueDate.toISOString().split('T')[0],
      paidDate: status === 'paid' ? faker.date.recent().toISOString().split('T')[0] : undefined,
      status,
      method: status === 'paid' ? faker.helpers.arrayElement(paymentMethods) : undefined,
      createdAt: faker.date.past().toISOString(),
    });
  }
  
  return payments;
};

// Initialize mock data
export const mockProperties = generateProperties(500);
export const mockTenants = generateTenants(150);
export const mockPayments = generatePayments(mockTenants, mockProperties, 300);