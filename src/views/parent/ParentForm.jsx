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

const url = "http://localhost:5000/parent/";

const ParentForm = (props) => {
  const [parent, setParent] = useState("");

  const { parent_id: id, parent_name } = props.location.state || {};

  useEffect(() => {
    if (id) {
      setParent(parent_name);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      const res = await axios.put(url + `update/${id}`, {
        parentName: parent,
      });
      if (res.status === 200) {
        props.setNoti({
          place: "tr",
          message: "successfully updated",
        });
        props.history.push("/admin/parent");
      }
    } else {
      const res = await axios.post(url + "new", {
        parentName: parent,
      });
      if (res.status === 200) {
        props.setNoti({
          place: "tr",
          message: "successfully created",
        });
        props.history.push("/admin/parent");
      }
    }
  };

  return (
    <>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">{id ? "Update" : "Add new"} parent</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="align-items-end">
                <Col className="pr-1" md="5">
                  <Form.Group>
                    <label>Parent Name</label>
                    <Form.Control
                      placeholder="Parent name"
                      type="text"
                      value={parent}
                      onChange={(e) => setParent(e.target.value)}
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

export default ParentForm;
