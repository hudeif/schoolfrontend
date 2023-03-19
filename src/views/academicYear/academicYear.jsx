import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Table } from "react-bootstrap";
import axios from "axios";

const url = "http://localhost:5000/academic-year/";

const AcademicYear = (props) => {
  const [academicYear, setAcademicYear] = useState([]);

  async function getAcademicYear() {
    const { data } = await axios.get(url + "list");
    console.log(data);
    setAcademicYear(data);
  }

  const handleDelete = async (academicYear) => {
    const res = await axios.delete(
      url + `delete/${academicYear.academic_year_id}`
    );
    if (res.status === 200) {
      props.setNoti({ place: "tr", message: "deleted successfully" });
      getAcademicYear();
    }
  };

  useEffect(() => {
    getAcademicYear();
  }, []);

  return (
    <Card className="strpied-tabled-with-hover">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title as="h3">Academic Year</Card.Title>
        <Link
          to="/admin/academic-year/new"
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
              <th className="border-0">Academic year</th>
              <th className="border-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {academicYear.map((academic) => (
              <tr>
                <td>{academic.academic_year_id}</td>
                <td>{academic.academic_year}</td>
                <td>
                  <Link
                    to={{
                      pathname: "/admin/academic-year/update",
                      state: academic,
                    }}
                    className="btn-sm btn-fill btn-success mr-2"
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn-sm btn-fill btn-danger"
                    onClick={() => handleDelete(academic)}
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

export default AcademicYear;
