import React, { useState, useEffect } from 'react';
import { useFetchUsers } from './hooks/useFetchUsers';
import UserList from './components/UserList';
import PhantomCards from './components/PhantomCards';

const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const usersPerPage = 12;

  const { users, loading, error, reloadUsers, isFetching } = useFetchUsers(); // Se obtiene isFetching del hook

  const displayedUsers = users.slice(0, page * usersPerPage);

  useEffect(() => {
    if (page > 1 && !loading && users.length > 0) {
      setPage(page);
    }
  }, [users, page, loading]);

  const handleScroll = () => {
    if (loading || isFetching) return; // Evitar que se dispare el scroll si ya estamos cargando datos

    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
      if (page * usersPerPage < users.length) {
        setPage(prevPage => prevPage + 1);
      } else {
        reloadUsers(); // Solo recarga si no está en medio de un fetch
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
