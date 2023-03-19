import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import axios from "axios";

const url = "http://localhost:5000/exam-result/";

const ExamResult = (props) => {
  const [results, setResults] = useState([]);
  const [filterResult, setFilterResult] = useState({
    academicYearId: "",
    examTypeId: "",
    classId: "",
    studentId: "",
  });

  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [examTypes, setExamTypes] = useState([]);

  async function getClasses() {
    const { data } = await axios.get("http://localhost:5000/class/list");
    setClasses(data);
  }

  async function getStudentsOfAclass(classId) {
    const { data } = await axios.get(
      "http://localhost:5000/student/student-of-class/" + classId
    );
    setStudents(data);
  }

  async function getExamTypes() {
    const { data } = await axios.get("http://localhost:5000/exam-type/list");
    setExamTypes(data);
  }

  async function getAcademicYears() {
    const { data } = await axios.get(
      "http://localhost:5000/academic-year/list"
    );
    setAcademicYears(data);
  }

  async function getResults() {
    const { data } = await axios.get(url + "list");
    setResults(data);
  }

  const handleDelete = async (result) => {
    const res = await axios.delete(url + `delete/${result.result_id}`);
    if (res.status === 200) {
      props.setNoti({ place: "tr", message: "deleted successfully" });
      getResults();
    }
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    console.log(filterResult);
    const { data } = await axios.post(url + "filter", filterResult);
    setResults(data);
  };

  useEffect(() => {
    getResults();
    getAcademicYears();
    getExamTypes();
    getClasses();
  }, []);

  let initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      getStudentsOfAclass(filterResult.classId);
    }
  }, [filterResult.classId]);

  return (
    <Card className="strpied-tabled-with-hover">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title as="h3">Exam Results</Card.Title>
        <Link
          to="/admin/exam-result/new"
          className="btn btn-primary  btn-sm btn-fill"
        >
          add new
        </Link>
      </Card.Header>

      <Row className="m-3 align-items-end">
        <Col md="2">
          <Form.Group>
            <label>academic year</label>
            <Form.Select
              className="form-control"
              value={filterResult.academicYearId}
              onChange={(e) =>
                setFilterResult({
                  ...filterResult,
                  academicYearId: e.target.value,
                })
              }
            >
              <option value="">select</option>
              {academicYears.map((a) => (
                <option value={a.academic_year_id}>{a.academic_year}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md="2">
          <Form.Group>
            <label>class</label>
            <Form.Select
              className="form-control"
              value={filterResult.classId}
              onChange={(e) =>
                setFilterResult({
                  ...filterResult,
                  classId: e.target.value,
                })
              }
            >
              <option value="">select</option>
              {classes.map((c) => (
                <option value={c.class_id}>{c.class_name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>exam type</label>
            <Form.Select
              className="form-control"
              value={filterResult.examTypeId}
              onChange={(e) =>
                setFilterResult({
                  ...filterResult,
                  examTypeId: e.target.value,
                })
              }
            >
              <option value="">select</option>
              {examTypes.map((e) => (
                <option value={e.exam_type_id}>{e.exam_type}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>student</label>
            <Form.Select
              className="form-control"
              value={filterResult.studentId}
              onChange={(e) =>
                setFilterResult({
                  ...filterResult,
                  studentId: e.target.value,
                })
              }
            >
              <option value="">select</option>
              {students.map((s) => (
                <option value={s.std_id}>{s.std_name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md="2">
          <Form.Group>
            <Button onClick={handleFilter}>Filter</Button>
          </Form.Group>
        </Col>
      </Row>

      <Card.Body className="table-full-width table-responsive px-0 pt-0">
        <Table className="table-hover table-striped">
          <thead>
            <tr>
              <th className="border-0">ID</th>
              <th className="border-0">academic year</th>
              <th className="border-0">class</th>
              <th className="border-0">exam type</th>
              <th className="border-0">student</th>
              <th className="border-0">mark</th>
              <th className="border-0">result date</th>
              <th className="border-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr>
                <td>{result.result_id}</td>
                <td>{result.academic_year}</td>
                <td>{result.class_name}</td>
                <td>{result.exam_type}</td>
                <td>{result.std_name}</td>
                <td>{result.mark}</td>
                <td>{result.rs_date}</td>
                <td>
                  <Link
                    to={{
                      pathname: "/admin/exam-result/update",
                      state: result,
                    }}
                    className="btn-sm btn-fill btn-success mr-2"
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn-sm btn-fill btn-danger"
                    onClick={() => handleDelete(result)}
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

export default ExamResult;
