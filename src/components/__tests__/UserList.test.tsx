import { render, screen } from '@testing-library/react';
import UserList from '../UserList';
import { User } from '../../interfaces/interfaces';
import '@testing-library/jest-dom';

// Mock data for users
const mockUsers: User[] = [
  {
    id: 1,
    uid: 'unique-id-1',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    avatar: 'https://example.com/avatar.jpg',
    gender: 'Male',
    phone_number: '+123456789',
    social_insurance_number: '123-45-6789',
    date_of_birth: '1980-01-01',
    employment: {
      title: 'Software Engineer',
      key_skill: 'React',
    },
    address: {
      city: 'Sample City',
      street_name: 'Main Street',
      street_address: '123 Main St',
      zip_code: '12345',
      state: 'NY',
      country: 'USA',
      coordinates: {
        lat: 40.7128,
        lng: -74.0060,
      },
    },
    credit_card: {
      cc_number: '1234-5678-1234-5678',
    },
    subscription: {
      plan: 'Premium',
      status: 'Active',
      payment_method: 'Credit Card',
      term: 'Monthly',
    },
  },
  {
    id: 2,
    uid: 'unique-id-2',
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane.smith@example.com',
    avatar: 'https://example.com/avatar2.jpg',
    gender: 'Female',
    phone_number: '+987654321',
    social_insurance_number: '987-65-4321',
    date_of_birth: '1990-02-02',
    employment: {
      title: 'Project Manager',
      key_skill: 'Leadership',
    },
    address: {
      city: 'Another City',
      street_name: 'Second Street',
      street_address: '456 Another St',
      zip_code: '54321',
      state: 'CA',
      country: 'USA',
      coordinates: {
        lat: 34.0522,
        lng: -118.2437,
      },
    },
    credit_card: {
      cc_number: '5678-1234-5678-1234',
    },
    subscription: {
      plan: 'Basic',
      status: 'Inactive',
      payment_method: 'PayPal',
      term: 'Yearly',
    },
  },
];

describe('UserList component', () => {
  it('should correctly render a list of users', () => {
    render(<UserList users={mockUsers} />);

    // Verify that the user names are displayed in the list
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should handle the case of an empty list', () => {
    render(<UserList users={[]} />);

    // Verify that no users are displayed
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });
});
