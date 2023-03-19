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

const url = "http://localhost:5000/exam-type/";

const ExamTypeForm = (props) => {
  const [examType, setExamType] = useState("");

  const { exam_type_id: id, exam_type } = props.location.state || {};

  useEffect(() => {
    if (id) {
      setExamType(exam_type);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      const res = await axios.put(url + `update/${id}`, {
        examType,
      });
      if (res.status === 200) {
        props.setNoti({
          place: "tr",
          message: "successfully updated",
        });
        props.history.push("/admin/exam-type");
      }
    } else {
      const res = await axios.post(url + "new", {
        examType,
      });
      if (res.status === 200) {
        props.setNoti({
          place: "tr",
          message: "successfully created",
        });
        props.history.push("/admin/exam-type");
      }
    }
  };

  return (
    <>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">
              {id ? "Update" : "Add new"} exam type
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="align-items-end">
                <Col className="pr-1" md="5">
                  <Form.Group>
                    <label>Exam type</label>
                    <Form.Control
                      placeholder="academic year"
                      type="text"
                      value={examType}
                      onChange={(e) => setExamType(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
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

export default ExamTypeForm;
