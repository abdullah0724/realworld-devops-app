import { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "MALE",
    phone: "",
  });

  const navigate = useNavigate();

  // Fetch all users
  const fetchUsers = () => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/users/all`)
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data.users);
      })
      .catch((err) => {
        console.log(err);
        setUsers([]);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add new user
  const handleAddUser = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_SERVER_URL}/users/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setNewUser({
            first_name: "",
            last_name: "",
            email: "",
            gender: "MALE",
            phone: "",
          });
          fetchUsers(); // refresh list
        } else {
          alert("Failed to add user");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error occurred");
      });
  };

  return (
    <div className="home">
      <span className="header">User List ({users.length})</span>

      <form className="add-user-form" onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="First Name"
          value={newUser.first_name}
          onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newUser.last_name}
          onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <select
          value={newUser.gender}
          onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
        <input
          type="text"
          placeholder="Phone"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          required
        />
        <button type="submit">Add User</button>
      </form>

      {users.length === 0 ? (
        <p className="no-users">No users found.</p>
      ) : (
        <table className="table">
          <thead className="thead">
            <tr>
              <th>id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {users.map(({ id, first_name, last_name, email, gender, phone }) => {
              return (
                <tr
                  key={id}
                  onClick={() => {
                    navigate(`/user/${id}`);
                  }}
                >
                  <td>{id}</td>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                  <td>{email}</td>
                  <td>{gender}</td>
                  <td>{phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;

