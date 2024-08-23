import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '../interfaces/interfaces';

export const useFetchUsers = () => {
  // State to hold the list of users
  const [users, setUsers] = useState<User[]>([]);
  // State to track loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State to track any errors during the fetch
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false); // New state

  // Function to fetch user data from the API
  const fetchData = async () => {
    if (isFetching) return; // If we are already making a request, do not make another
    setIsFetching(true); // Set isFetching to true when the request starts
    setLoading(true);
    
    try {
      const response = await axios.get('https://random-data-api.com/api/v2/users?size=96');
      // Transform the data to match the expected User interface
      const transformedData = response.data.map((user: any) => ({
        id: user.id,
        uid: user.uid,
        name: `${user.first_name} ${user.last_name}`,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        gender: user.gender,
        phone_number: user.phone_number,
        social_insurance_number: user.social_insurance_number,
        date_of_birth: user.date_of_birth,
        employment: {
          title: user.employment.title,
          key_skill: user.employment.key_skill,
        },
        address: {
          city: user.address.city,
          street_name: user.address.street_name,
          street_address: user.address.street_address,
          zip_code: user.address.zip_code,
          state: user.address.state,
          country: user.address.country,
          coordinates: {
            lat: user.address.coordinates.lat,
            lng: user.address.coordinates.lng,
          },
        },
        credit_card: {
          cc_number: user.credit_card.cc_number,
        },
        subscription: {
          plan: user.subscription.plan,
          status: user.subscription.status,
          payment_method: user.subscription.payment_method,
          term: user.subscription.term,
        },
      }));
      // Append new users to the existing list
      setUsers((prevUsers) => [...prevUsers, ...transformedData]);
      setLoading(false);
    } catch (err) {
      setError('Error fetching data');
      setLoading(false);
    } finally {
      setIsFetching(false); // Reset isFetching to false after the request completes
    }
  };

  // Effect to fetch users on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to reload the users (e.g., after a pagination request)
  const reloadUsers = () => {
    fetchData();
  };

  return { users, loading, error, reloadUsers, isFetching }; // Return isFetching
};
