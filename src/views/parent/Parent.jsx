import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Table } from "react-bootstrap";
import axios from "axios";

const url = "http://localhost:5000/parent/";

const Parent = (props) => {
  const [parents, setParents] = useState([]);

  async function getParents() {
    const { data } = await axios.get(url + "list");
    setParents(data);
  }

  const handleDelete = async (parent) => {
    const res = await axios.delete(url + `delete/${parent.parent_id}`);
    if (res.status === 200) {
      props.setNoti({ place: "tr", message: "deleted successfully" });
      getParents();
    }
  };

  useEffect(() => {
    getParents();
  }, []);

  return (
    <Card className="strpied-tabled-with-hover">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title as="h3">Parents</Card.Title>
        <Link
          to="/admin/parent/new"
          className="btn btn-primary  btn-sm btn-fill"
        >
          add new
        </Link>
      </Card.Header>
      <Card.Body className="table-full-width table-responsive px-0 pt-0">
        <Table className="table-hover table-striped">
          <thead>
            <tr>
              <th className="border-0">ID</th>
              <th className="border-0">Parent</th>
              <th className="border-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {parents.map((parent) => (
              <tr>
                <td>{parent.parent_id}</td>
                <td>{parent.parent_name}</td>
                <td>
                  <Link
                    to={{
                      pathname: "/admin/parent/update",
                      state: parent,
                    }}
                    className="btn-sm btn-fill btn-success mr-2"
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn-sm btn-fill btn-danger"
                    onClick={() => handleDelete(parent)}
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

export default Parent;
