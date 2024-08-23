import { renderHook, act } from '@testing-library/react-hooks';
import { useFetchUsers } from '../useFetchUsers';
import axios from 'axios';
import { vi } from 'vitest';

// Mock axios
vi.mock('axios');

// Manually create a mock for axios.get
const mockedAxiosGet = axios.get as jest.Mock;

describe('useFetchUsers', () => {
  it('should initialize with the correct state', () => {
    const { result } = renderHook(() => useFetchUsers());

    expect(result.current.users).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should fetch and transform data correctly', async () => {
    const mockData = [
      {
        id: 4561,
        uid: '6899bd91-ef0c-4256-aefe-a55b4f0105ee',
        first_name: 'Felipa',
        last_name: 'Weimann',
        username: 'felipa.weimann',
        email: 'felipa.weimann@email.com',
        avatar: 'https://robohash.org/inciduntoccaecatilaboriosam.png?size=300x300&set=set1',
        gender: 'Non-binary',
        phone_number: '+268 (192) 738-3561 x141',
        social_insurance_number: '151708476',
        date_of_birth: '1981-11-05',
        employment: {
          title: 'Customer Government Developer',
          key_skill: 'Organisation',
        },
        address: {
          city: 'Luettgenview',
          street_name: 'Parker Flats',
          street_address: '4736 Yesenia Union',
          zip_code: '14160',
          state: 'Ohio',
          country: 'United States',
          coordinates: {
            lat: 82.93841146036135,
            lng: -13.384464112771724,
          },
        },
        credit_card: {
          cc_number: '4997881177284',
        },
        subscription: {
          plan: 'Essential',
          status: 'Pending',
          payment_method: 'Google Pay',
          term: 'Full subscription',
        },
      },
    ];

    // Setup the mock for axios.get
    mockedAxiosGet.mockResolvedValueOnce({ data: mockData });

    const { result, waitForNextUpdate } = renderHook(() => useFetchUsers());

    await waitForNextUpdate();

    expect(result.current.users).toEqual([
      {
        id: 4561,
        uid: '6899bd91-ef0c-4256-aefe-a55b4f0105ee',
        name: 'Felipa Weimann',
        username: 'felipa.weimann',
        email: 'felipa.weimann@email.com',
        avatar: 'https://robohash.org/inciduntoccaecatilaboriosam.png?size=300x300&set=set1',
        gender: 'Non-binary',
        phone_number: '+268 (192) 738-3561 x141',
        social_insurance_number: '151708476',
        date_of_birth: '1981-11-05',
        employment: {
          title: 'Customer Government Developer',
          key_skill: 'Organisation',
        },
        address: {
          city: 'Luettgenview',
          street_name: 'Parker Flats',
          street_address: '4736 Yesenia Union',
          zip_code: '14160',
          state: 'Ohio',
          country: 'United States',
          coordinates: {
            lat: 82.93841146036135,
            lng: -13.384464112771724,
          },
        },
        credit_card: {
          cc_number: '4997881177284',
        },
        subscription: {
          plan: 'Essential',
          status: 'Pending',
          payment_method: 'Google Pay',
          term: 'Full subscription',
        },
      },
    ]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle errors during fetching', async () => {
    // Setup the mock to simulate an error
    mockedAxiosGet.mockRejectedValueOnce(new Error('Error fetching data'));

    const { result, waitForNextUpdate } = renderHook(() => useFetchUsers());

    await waitForNextUpdate();

    expect(result.current.users).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Error fetching data');
  });
});
