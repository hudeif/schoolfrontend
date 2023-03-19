import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Table } from "react-bootstrap";
import axios from "axios";

const url = "http://localhost:5000/user/";

const User = (props) => {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const { data } = await axios.get(url + "list");
    setUsers(data);
  }

  const handleDelete = async (user) => {
    const res = await axios.delete(url + `delete/${user.user_id}`);
    if (res.status === 200) {
      props.setNoti({ place: "tr", message: "deleted successfully" });
      getUsers();
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Card className="strpied-tabled-with-hover">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title as="h3">Users</Card.Title>
        <Link to="/admin/user/new" className="btn btn-primary  btn-sm btn-fill">
          add new
        </Link>
      </Card.Header>
      <Card.Body className="table-full-width table-responsive px-0 pt-0">
        <Table className="table-hover table-striped">
          <thead>
            <tr>
              <th className="border-0">ID</th>
              <th className="border-0">user name</th>
              <th className="border-0">user type</th>
              <th className="border-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user.user_id}</td>
                <td>{user.user_name}</td>
                <td>{user.user_type}</td>
                <td>
                  <Link
                    to={{
                      pathname: "/admin/user/update",
                      state: user,
                    }}
                    className="btn-sm btn-fill btn-success mr-2"
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn-sm btn-fill btn-danger"
                    onClick={() => handleDelete(user)}
                  >
                    delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default User;
