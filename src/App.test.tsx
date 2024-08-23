import { render, screen, fireEvent } from '@testing-library/react';
import App from './App'; 
import { useFetchUsers } from './hooks/useFetchUsers';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock the useFetchUsers hook
vi.mock('./hooks/useFetchUsers');

// Manually mock the useFetchUsers hook
const mockedUseFetchUsers = useFetchUsers as jest.MockedFunction<typeof useFetchUsers>;

describe('App component', () => {
  it('should render without errors', () => {
    // Mock the hook so it doesn't return errors or users initially
    mockedUseFetchUsers.mockReturnValue({
      users: [],
      loading: false,
      error: null,
      reloadUsers: vi.fn(),
      isFetching: false, // Añadir isFetching al mock

    });

    render(<App />);

    // Verify that the title is rendered correctly
    expect(screen.getByText('Users List')).toBeInTheDocument();
  });

  it('should display an error message if there is an error fetching users', () => {
    mockedUseFetchUsers.mockReturnValue({
      users: [],
      loading: false,
      error: 'Error fetching data',
      reloadUsers: vi.fn(),
      isFetching: false, // Añadir isFetching al mock

    });

    render(<App />);

    // Verify that the error message is displayed
    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });

  it('should display phantom cards while loading', () => {
    mockedUseFetchUsers.mockReturnValue({
      users: [],
      loading: true,
      error: null,
      reloadUsers: vi.fn(),
      isFetching: false, // Añadir isFetching al mock

    });

    render(<App />);  

    // Verify that the phantom cards are rendered during loading
    expect(screen.getAllByTestId('phantom-card')).toHaveLength(6);
  });

  it('should render the user list when data is loaded', () => {
    const mockUsers = [
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
    ];

    mockedUseFetchUsers.mockReturnValue({
      users: mockUsers,
      loading: false,
      error: null,
      reloadUsers: vi.fn(),
      isFetching: false, // Añadir isFetching al mock

    });

    render(<App />);  

    // Verify that the user is rendered in the list
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should load more users when scrolling', () => {
    const mockUsers = Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      uid: `unique-id-${i + 1}`,
      name: `User ${i + 1}`,
      username: `user${i + 1}`,
      email: `user${i + 1}@example.com`,
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
    }));

    const reloadUsersMock = vi.fn();

    mockedUseFetchUsers.mockReturnValue({
      users: mockUsers,
      loading: false,
      error: null,
      reloadUsers: reloadUsersMock,
      isFetching: false, // Añadir isFetching al mock

    });

    render(<App />); 

    // Simulate scroll event
    fireEvent.scroll(window, { target: { scrollY: document.documentElement.scrollHeight } });

    // Verify that the next page of users is loaded
    expect(screen.getByText('User 12')).toBeInTheDocument();
    expect(screen.getByText('User 24')).toBeInTheDocument();

    // Verify that reloadUsers is called when the scroll reaches the bottom and all users are loaded
    fireEvent.scroll(window, { target: { scrollY: document.documentElement.scrollHeight } });
    expect(reloadUsersMock).toHaveBeenCalled();
  });
});
