export interface Employment {
  title: string;
  key_skill: string;
}

export interface Address {
  city: string;
  street_name: string;
  street_address: string;
  zip_code: string;
  state: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface CreditCard {
  cc_number: string;
}

export interface Subscription {
  plan: string;
  status: string;
  payment_method: string;
  term: string;
}

export interface User {
  id: number;
  uid: string;
  name: string;
  username: string;
  email: string;
  avatar: string; 
  gender: string;
  phone_number: string;
  social_insurance_number: string;
  date_of_birth: string;
  employment: Employment;
  address: Address;
  credit_card: CreditCard;
  subscription: Subscription;
}

export interface UserListProps {
  users: User[];
}
