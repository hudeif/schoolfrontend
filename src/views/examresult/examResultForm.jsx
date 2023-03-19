import axios from "axios";
import { useState, useRef, useEffect } from "react";
import NotificationAlert from "react-notification-alert";

import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const url = "http://localhost:5000/exam-result/";

const ExamResultForm = (props) => {
  const [result, setResult] = useState({
    examTypeId: "",
    academicYearId: "",
    studentId: "",
    classId: "",
    mark: "",
    resultDate: "",
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
    console.log(data);
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

  const updateResult = props.location.state || {};
  const { result_id: id } = updateResult || {};
  let initialRender = useRef(true);

  useEffect(() => {
    if (id) {
      const obj = {
        examTypeId: updateResult.exam_type_id,
        academicYearId: updateResult.academic_year_id,
        studentId: updateResult.std_id,
        classId: updateResult.class_id,
        mark: updateResult.mark,
        resultDate: updateResult.rs_date,
      };
      setResult(obj);
    }

    getClasses();
    getExamTypes();
    getAcademicYears();
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      getStudentsOfAclass(result.classId);
    }
  }, [result.classId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      const res = await axios.put(url + `update/${id}`, result);
      if (res.status === 200) {
        props.setNoti({
          place: "tr",
          message: "successfully updated",
        });
        props.history.push("/admin/exam-result");
      }
    } else {
      const res = await axios.post(url + "new", result);
      if (res.status === 200) {
        props.setNoti({
          place: "tr",
          message: "successfully created",
        });
        props.history.push("/admin/exam-result");
      }
    }
  };

  return (
    <>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">{id ? "Update" : "Add new"} result</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="align-items-end">
                <Col className="pr-1" md="5">
                  <Form.Group>
                    <label>Exam type</label>
                    <Form.Select
                      aria-label="select exam type"
                      className="form-control"
                      value={result.examTypeId}
                      onChange={(e) =>
                        setResult({ ...result, examTypeId: e.target.value })
                      }
                    >
                      <option value="">select exam type</option>
                      {examTypes.map((type) => (
                        <option value={type.exam_type_id}>
                          {type.exam_type}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col className="pr-1" md="5">
                  <Form.Group>
                    <label>Academic Year</label>
                    <Form.Select
                      aria-label="select exam type"
                      className="form-control"
                      value={result.academicYearId}
                      onChange={(e) =>
                        setResult({ ...result, academicYearId: e.target.value })
                      }
                    >
                      <option value="">select exam type</option>
                      {academicYears.map((academic) => (
                        <option value={academic.academic_year_id}>
                          {academic.academic_year}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col className="pr-1" md="5">
                  <Form.Group>
                    <label>Class</label>
                    <Form.Select
                      aria-label="select class"
                      className="form-control"
                      value={result.classId}
                      onChange={(e) =>
                        setResult({ ...result, classId: e.target.value })
                      }
                    >
                      <option value="">select class</option>
                      {classes.map((klass) => (
                        <option value={klass.class_id}>
                          {klass.class_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col className="pr-1" md="5">
                  <Form.Group>
                    <label>Student</label>
                    <Form.Select
                      aria-label="select student"
                      className="form-control"
                      value={result.studentId}
                      onChange={(e) =>
                        setResult({ ...result, studentId: e.target.value })
                      }
                    >
                      <option value="">select student</option>
                      {students.map((std) => (
                        <option value={std.std_id}>{std.std_name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col className="pr-1" md="5">
                  <Form.Group>
                    <label>Mark</label>
                    <Form.Control
                      placeholder="mark"
                      type="number"
                      value={result.mark}
                      onChange={(e) =>
                        setResult({
                          ...result,
                          mark: e.target.value,
                        })
                      }
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="pr-1" md="5">
                  <Form.Group>
                    <label>date</label>
                    <Form.Control
                      type="date"
                      value={result.resultDate}
                      onChange={(e) =>
                        setResult({
                          ...result,
                          resultDate: e.target.value,
                        })
                      }
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col className="pr-1" md="4">
                  <Button
                    className="btn-fill pull-right border-0"
                    type="submit"
                    variant={id ? "info" : "success"}
                  >
                    {id ? "update" : "save"}
                  </Button>
                </Col>
              </Row>

              <div className="clearfix"></div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ExamResultForm;
