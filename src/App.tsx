import React, { useState, useEffect } from 'react';
import { useFetchUsers } from './hooks/useFetchUsers';
import UserList from './components/UserList';
import PhantomCards from './components/PhantomCards';

const App: React.FC = () => {
  // State to manage the current page for pagination
  const [page, setPage] = useState<number>(1);
  
  // Number of users to display per page
  const usersPerPage = 12;

  // Fetch users data, loading status, and error handling from the custom hook
  const { users, loading, error, reloadUsers } = useFetchUsers();

  // Calculate the users to display based on the current page
  const displayedUsers = users.slice(0, page * usersPerPage);

  // Effect to set the page when users are updated
  useEffect(() => {
    if (page > 1 && !loading && users.length > 0) {
      setPage(page);
    }
  }, [users, page, loading]);

  // Handle scroll event to implement infinite scrolling
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
      // Load more users if available or trigger a reload if all users are loaded
      if (page * usersPerPage < users.length) {
        setPage(prevPage => prevPage + 1);
      } else if (!loading) {
        reloadUsers();
        setPage(prevPage => prevPage + 1);
      }
    }
  };

  // Add scroll event listener on component mount and clean up on unmount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Display error message if there's an issue fetching users
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center bg-gray-200 min-h-screen">
      {/* Page title */}
      <h1 className="text-4xl font-bold text-gray-600 my-8">Users List</h1>

      {/* Display phantom cards during loading, else show the user list */}
      {loading ? (
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
