import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Table } from "react-bootstrap";
import axios from "axios";

const url = "http://localhost:5000/student/";

const Students = (props) => {
  const [students, setStudents] = useState([]);

  async function getStudents() {
    const { data } = await axios.get(url + "list");
    setStudents(data);
  }

  const handleDelete = async (student) => {
    const res = await axios.delete(url + `delete/${student.std_id}`);
    if (res.status === 200) {
      props.setNoti({ place: "tr", message: "deleted successfully" });
      getStudents();
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <Card className="strpied-tabled-with-hover">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title as="h3">Students</Card.Title>
        <Link
          to="/admin/student/new"
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
              <th className="border-0">student name</th>
              <th className="border-0">phone</th>
              <th className="border-0">gender</th>
              <th className="border-0">class</th>
              <th className="border-0">parent</th>
              <th className="border-0">register date</th>
              <th className="border-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr>
                <td>{student.std_id}</td>
                <td>{student.std_name}</td>
                <td>{student.phone}</td>
                <td>{student.gender}</td>
                <td>{student.class_name}</td>
                <td>{student.parent_name}</td>
                <td>{student.reg_date}</td>
                <td>
                  <Link
                    to={{
                      pathname: "/admin/student/update",
                      state: student,
                    }}
                    className="btn-sm btn-fill btn-success mr-2"
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn-sm btn-fill btn-danger"
                    onClick={() => handleDelete(student)}
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

export default Students;
