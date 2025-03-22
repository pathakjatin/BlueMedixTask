import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  // ✅ Function to add a new user
  const addUser = (user) => setUsers(prevUsers => [...prevUsers, user]);

  // ✅ Function to update an existing user
  const updateUser = (updatedUser) => {
    setUsers(prevUsers =>
      prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  // ✅ Function to delete a user
  const deleteUser = (id) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  };

  return (
    <UsersContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
}
