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

const url = "http://localhost:5000/user/";

const UserForm = (props) => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
    userType: "",
  });

  const updateUser = props.location.state || {};
  const { user_id: id } = updateUser || {};

  console.log(id);

  useEffect(() => {
    if (id) {
      const obj = {
        userName: updateUser.user_name,
        password: updateUser.password,
        userType: updateUser.user_type,
      };
      setUser(obj);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      const res = await axios.put(url + `update/${id}`, user);
      if (res.status === 200) {
        props.setNoti({
          place: "tr",
          message: "successfully updated",
        });
        props.history.push("/admin/user");
      }
    } else {
      const res = await axios.post(url + "new", user);
      if (res.status === 200) {
        props.setNoti({
          place: "tr",
          message: "successfully created",
        });
        props.history.push("/admin/user");
      }
    }
  };

  return (
    <>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">{id ? "Update" : "Add new"} user</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="align-items-end">
                <Col className="pr-1" md="5">
                  <Form.Group>
                    <label>user Name</label>
                    <Form.Control
                      placeholder="user name"
                      type="text"
                      value={user.userName}
                      onChange={(e) =>
                        setUser({ ...user, userName: e.target.value })
                      }
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="align-items-end">
                <Col className="pr-1" md="5">
                  <Form.Group>
                    <label>Password</label>
                    <Form.Control
                      placeholder="password"
                      type="text"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="align-items-end">
                <Col className="pr-1" md="5">
                  <Form.Group>
                    <label>User type</label>
                    <Form.Select
                      aria-label="select user type"
                      className="form-control"
                      value={user.userType}
                      onChange={(e) =>
                        setUser({ ...user, userType: e.target.value })
                      }
                    >
                      <option value="">select user type</option>
                      <option value="admin">admin</option>
                      <option value="teacher">teacher</option>
                      <option value="parent">parent</option>
                      <option value="student">student</option>
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

export default UserForm;
