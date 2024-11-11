// UserManagement.tsx
"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

interface User {
  id: number;
  name: string;
  weight: number;
  height: number;
  calories: number;
  score: number;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    weight: "",
    height: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/add-user");
      const data = await response.json();
      setUsers(data.userInformation.rows.slice(0, 5));
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newUser.name,
          weight: parseInt(newUser.weight),
          height: parseInt(newUser.height),
        }),
      });

      if (response.ok) {
        fetchUsers();
        setNewUser({ name: "", weight: "", height: "" });
      }
    } catch (err) {
      setError("Failed to add user");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Past Players</h1>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Weight (kg)</th>
              <th>Height (cm)</th>
              <th>Calories</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.weight}</td>
                <td>{user.height}</td>
                <td>{user.calories}</td>
                <td>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
