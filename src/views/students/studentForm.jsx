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

const url = "http://localhost:5000/student/";

const StudentForm = (props) => {
  const [student, setStudent] = useState({
    studentName: "",
    gender: "",
    phone: "",
    address: "",
    classId: "",
    parentId: "",
    regDate: "",
  });

  const [classes, setClasses] = useState([]);
  const [parents, setParents] = useState([]);

  async function getClasses() {
    const { data } = await axios.get("http://localhost:5000/class/list");
    setClasses(data);
  }

  async function getParents() {
    const { data } = await axios.get("http://localhost:5000/parent/list");
    setParents(data);
  }

  const updateStudent = props.location.state || {};
  const { std_id: id } = updateStudent || {};

  useEffect(() => {
    if (id) {
      const obj = {
        studentName: updateStudent.std_name,
        gender: updateStudent.gender,
        phone: updateStudent.phone,
        address: updateStudent.address,
        classId: updateStudent.class_id,
        parentId: updateStudent.parent_id,
        regDate: updateStudent.reg_date,
      };
      setStudent(obj);
    }

    getClasses();
    getParents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(student);
    if (id) {
      const res = await axios.put(url + `update/${id}`, student);
      if (res.status === 200) {
        props.setNoti({
          place: "tr",
          message: "successfully updated",
        });
        props.history.push("/admin/student");
      }
    } else {
      const res = await axios.post(url + "new", student);
      if (res.status === 200) {
        props.setNoti({
          place: "tr",
          message: "successfully created",
        });
        props.history.push("/admin/student");
      }
    }
  };

  return (
    <>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">{id ? "Update" : "Add new"} student</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="align-items-end">
                <Col className="pr-1" md="6">
                  <Form.Group>
                    <label>student Name</label>
                    <Form.Control
                      placeholder="student name"
                      type="text"
                      value={student.studentName}
                      onChange={(e) =>
                        setStudent({ ...student, studentName: e.target.value })
                      }
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="pr-1" md="6">
                  <Form.Group>
                    <label>phone</label>
                    <Form.Control
                      placeholder="student name"
                      type="text"
                      value={student.phone}
                      onChange={(e) =>
                        setStudent({ ...student, phone: e.target.value })
                      }
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="align-items-end">
                <Col className="pr-1" md="5">
                  <Form.Group>
                    <label>gender</label>
                    <Form.Select
                      aria-label="select gender"
                      className="form-control"
                      value={student.gender}
                      onChange={(e) =>
                        setStudent({ ...student, gender: e.target.value })
                      }
                    >
                      <option value="">select gender</option>
                      <option value="male">male</option>
                      <option value="female">female</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col className="pr-1" md="5">
                  <Form.Group>
                    <label>address</label>
                    <Form.Control
                      placeholder="password"
                      type="text"
                      value={student.address}
                      onChange={(e) =>
                        setStudent({ ...student, address: e.target.value })
                      }
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="align-items-end">
                <Col className="pr-1" md="5">
                  <Form.Group>
                    <label>Class</label>
                    <Form.Select
                      aria-label="select user type"
                      className="form-control"
                      value={student.classId}
                      onChange={(e) =>
                        setStudent({ ...student, classId: e.target.value })
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
                    <label>Parent</label>
                    <Form.Select
                      aria-label="select user type"
                      className="form-control"
                      value={student.parentId}
                      onChange={(e) =>
                        setStudent({ ...student, parentId: e.target.value })
                      }
                    >
                      <option value="">select parent</option>
                      {parents.map((parent) => (
                        <option value={parent.parent_id}>
                          {parent.parent_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="pr-1" md="5">
                  <Form.Group>
                    <label>date</label>
                    <Form.Control
                      type="date"
                      value={student.regDate}
                      onChange={(e) =>
                        setStudent({ ...student, regDate: e.target.value })
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

export default StudentForm;
