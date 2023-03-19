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

const url = "http://localhost:5000/shift/";

const ShiftForm = (props) => {
  const [shift, setShift] = useState("");

  const { shift_id: id, shift: shiftName } = props.location.state || {};

  useEffect(() => {
    if (id) {
      setShift(shiftName);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      const res = await axios.put(url + `update/${id}`, { shift });
      if (res.status === 200) {
        props.setNoti({
          place: "tr",
          message: "successfully updated",
        });
        props.history.push("/admin/shifts");
      }
    } else {
      const res = await axios.post(url + "new", { shift });
      if (res.status === 200) {
        props.setNoti({
          place: "tr",
          message: "successfully created",
        });
        props.history.push("/admin/shifts");
      }
    }
  };

  return (
    <>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">{id ? "Update" : "Add new"} shift</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="align-items-end">
                <Col className="pr-1" md="5">
                  <Form.Group>
                    <label>Shift</label>
                    <Form.Control
                      placeholder="new shift"
                      type="text"
                      value={shift}
                      onChange={(e) => setShift(e.target.value)}
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

export default ShiftForm;
