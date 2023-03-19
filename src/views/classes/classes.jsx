import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Table } from "react-bootstrap";
import axios from "axios";

const url = "http://localhost:5000/class/";

const Classes = (props) => {
  const [classes, setClasses] = useState([]);

  async function getClasses() {
    const { data } = await axios.get(url + "list");
    setClasses(data);
  }

  const handleDelete = async (clas) => {
    const res = await axios.delete(url + `delete/${clas.class_id}`);
    if (res.status === 200) {
      props.setNoti({ place: "tr", message: "deleted successfully" });
      getClasses();
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <Card className="strpied-tabled-with-hover">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title as="h3">Classes</Card.Title>
        <Link
          to="/admin/class/new"
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
              <th className="border-0">Class name</th>
              <th className="border-0">shift</th>
              <th className="border-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((klass) => (
              <tr>
                <td>{klass.class_id}</td>
                <td>{klass.class_name}</td>
                <td>{klass.shift}</td>
                <td>
                  <Link
                    to={{
                      pathname: "/admin/class/update",
                      state: klass,
                    }}
                    className="btn-sm btn-fill btn-success mr-2"
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn-sm btn-fill btn-danger"
                    onClick={() => handleDelete(klass)}
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

export default Classes;
