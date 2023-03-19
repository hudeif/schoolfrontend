import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Table } from "react-bootstrap";
import axios from "axios";

const url = "http://localhost:5000/exam-type/";

const ExamType = (props) => {
  const [examTypes, setExamTypes] = useState([]);

  async function getExamTypes() {
    const { data } = await axios.get(url + "list");
    setExamTypes(data);
  }

  const handleDelete = async (examtype) => {
    const res = await axios.delete(url + `delete/${examtype.exam_type_id}`);
    if (res.status === 200) {
      props.setNoti({ place: "tr", message: "deleted successfully" });
      getExamTypes();
    }
  };

  useEffect(() => {
    getExamTypes();
  }, []);

  return (
    <Card className="strpied-tabled-with-hover">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title as="h3">Exam types</Card.Title>
        <Link
          to="/admin/exam-type/new"
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
              <th className="border-0">Exam type</th>
              <th className="border-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {examTypes.map((examtype) => (
              <tr>
                <td>{examtype.exam_type_id}</td>
                <td>{examtype.exam_type}</td>
                <td>
                  <Link
                    to={{
                      pathname: "/admin/exam-type/update",
                      state: examtype,
                    }}
                    className="btn-sm btn-fill btn-success mr-2"
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn-sm btn-fill btn-danger"
                    onClick={() => handleDelete(examtype)}
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

export default ExamType;
