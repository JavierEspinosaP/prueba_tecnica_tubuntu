import React, { useState, useEffect } from 'react';
import { useFetchUsers } from './hooks/useFetchUsers';
import UserList from './components/UserList';
import PhantomCards from './components/PhantomCards';
import {User} from './interfaces/interfaces'

const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const usersPerPage = 12;

  const [allUsers, setAllUsers] = useState<User[]>([]);

  const { users, loading, error, reloadUsers, isFetching } = useFetchUsers();

  useEffect(() => {
    // When the users change, add the new users to the local state
    if (users.length > 0) {
      setAllUsers((prevUsers) => [...prevUsers, ...users]);
    }
  }, [users]);

  // Users to display on the current page
  const displayedUsers = allUsers.slice(0, page * usersPerPage);

  const handleScroll = () => {
    if (loading || isFetching) return; // Prevent the scroll event from triggering if we're already loading data

    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
      if (page * usersPerPage < allUsers.length) {
        setPage(prevPage => prevPage + 1);
      } else if (!isFetching) {
        // Fetch more users if we are on the last page
        reloadUsers();
        setPage(prevPage => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center bg-gray-200 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-600 my-8">Users List</h1>
      {loading && allUsers.length === 0 ? (
        <PhantomCards count={users.length || 6} />
      ) : (
        <div className="max-w-5xl w-full mb-20">
          <UserList users={displayedUsers} />
        </div>
      )}
    </div>
  );
};

export default App;
