//UsEffect Hooks Practice
//Managing State with API Integration and Cleanup - Let's create a component that fetches user data and handles component cleanup.

import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true; // To prevent state update if component is unmounted

    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: User[] = await response.json();
        if (isMounted) {
          setUsers(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      isMounted = false; // Cleanup flag on unmount
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;


/*
Explanation -
let isMounted = true;: A flag to track whether the component is still mounted.
if (isMounted) { ... }: Ensures state updates only happen if the component is still mounted.
return () => { isMounted = false; }: Cleanup function to set the flag to false when the component unmounts.

*/