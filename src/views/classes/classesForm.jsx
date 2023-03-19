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

const url = "http://localhost:5000/class/";

const ClassForm = (props) => {
  const [klass, setKlass] = useState({
    className: "",
    shiftId: "",
  });

  const [shifts, setShifts] = useState([]);

  const updatedClass = props.location.state || {};
  const { class_id: id } = updatedClass || {};

  const getShifts = async () => {
    const { data } = await axios.get("http://localhost:5000/shift/list");
    setShifts(data);
  };

  useEffect(() => {
    if (id) {
      const obj = {
        className: updatedClass.class_name,
        shiftId: updatedClass.shift_id,
      };
      setKlass(obj);
    }
    getShifts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      const res = await axios.put(url + `update/${id}`, klass);
      if (res.status === 200) {
        props.setNoti({
          place: "tr",
          message: "successfully updated",
        });
        props.history.push("/admin/class");
      }
    } else {
      const res = await axios.post(url + "new", klass);
      if (res.status === 200) {
        props.setNoti({
          place: "tr",
          message: "successfully created",
        });
        props.history.push("/admin/class");
      }
    }
  };

  return (
    <>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">{id ? "Update" : "Add new"} class</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="align-items-end">
                <Col className="pr-1" md="5">
                  <Form.Group>
                    <label>class Name</label>
                    <Form.Control
                      placeholder="user name"
                      type="text"
                      value={klass.className}
                      onChange={(e) =>
                        setKlass({ ...klass, className: e.target.value })
                      }
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="align-items-end">
                <Col className="pr-1" md="5">
                  <Form.Group>
                    <label>Shift</label>
                    <Form.Select
                      aria-label="select shift"
                      className="form-control"
                      value={klass.shiftId}
                      onChange={(e) =>
                        setKlass({ ...klass, shiftId: e.target.value })
                      }
                    >
                      <option value="">select shift</option>
                      {shifts.map((shift) => (
                        <option value={shift.shift_id}>{shift.shift}</option>
                      ))}
                    </Form.Select>
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

export default ClassForm;
