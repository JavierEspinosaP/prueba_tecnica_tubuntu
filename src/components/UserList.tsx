import React, { useState } from 'react';
import { User, UserListProps } from '../interfaces/interfaces';

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 justify-items-center">
      {/* Render each user card */}
      {users.map((user: User, index: number) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
};

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center w-full max-w-xs">
      <div className="relative h-32 w-32 mb-6">
        {/* Lazy loading for user avatar with transition effect */}
        <img
          src={user.avatar}
          alt={user.name}
          className={`rounded-full object-cover h-full w-full transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {/* Show placeholder until the image loads */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-full"></div>
        )}
      </div>
      {/* Display user details */}
      <h2 className="text-xl font-bold">{`${user.name}`}</h2>
      <p className="text-sm text-gray-500">{user.username}</p>
      <p className="text-sm text-gray-600 mb-4">{user.email}</p>

      <div className="w-32 border-b border-gray-300 my-4 mx-auto"></div>

      {/* User contact information */}
      <div className="text-left w-full">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <p className="text-sm text-gray-600"><strong>Phone:</strong> {user.phone_number}</p>
        <p className="text-sm text-gray-600"><strong>Gender:</strong> {user.gender}</p>
        <p className="text-sm text-gray-600"><strong>Date of Birth:</strong> {new Date(user.date_of_birth).toLocaleDateString()}</p>
      </div>

      <div className="w-32 border-b border-gray-300 my-4 mx-auto"></div>

      {/* User subscription information */}
      <div className="text-left w-full">
        <h3 className="text-lg font-semibold">Subscription</h3>
        <p className="text-sm text-gray-600"><strong>Plan:</strong> {user.subscription.plan}</p>
        <p className="text-sm text-gray-600"><strong>Status:</strong> {user.subscription.status}</p>
        <p className="text-sm text-gray-600"><strong>Payment Method:</strong> {user.subscription.payment_method}</p>
        <p className="text-sm text-gray-600"><strong>Term:</strong> {user.subscription.term}</p>
      </div>

      <div className="w-32 border-b border-gray-300 my-4 mx-auto"></div>

      {/* User address information */}
      <div className="text-left w-full">
        <h3 className="text-lg font-semibold">Address</h3>
        <p className="text-sm text-gray-600"><strong>Street:</strong> {user.address.street_address}, {user.address.street_name}</p>
        <p className="text-sm text-gray-600"><strong>City:</strong> {user.address.city}, {user.address.state}</p>
        <p className="text-sm text-gray-600"><strong>Zip Code:</strong> {user.address.zip_code}</p>
        <p className="text-sm text-gray-600"><strong>Country:</strong> {user.address.country}</p>
      </div>
    </div>
  );
};

export default UserList;
