import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Table } from "react-bootstrap";
import axios from "axios";

const url = "http://localhost:5000/shift/";

const Shifts = (props) => {
  const [shifts, setShifts] = useState([]);

  async function getShifts() {
    const { data } = await axios.get(url + "list");
    console.log(data);
    setShifts(data);
  }

  const handleDelete = async (shift) => {
    const res = await axios.delete(url + `delete/${shift.shift_id}`);
    if (res.status === 200) {
      props.setNoti({ place: "tr", message: "deleted successfully" });
      getShifts();
    }
  };

  useEffect(() => {
    getShifts();
  }, []);

  return (
    <Card className="strpied-tabled-with-hover">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title as="h3">Shifts</Card.Title>
        <Link
          to="/admin/shifts/new"
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
              <th className="border-0">SHIFT</th>
              <th className="border-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr>
                <td>{shift.shift_id}</td>
                <td>{shift.shift}</td>
                <td>
                  <Link
                    to={{
                      pathname: "/admin/shifts/update",
                      state: shift,
                    }}
                    className="btn-sm btn-fill btn-success mr-2"
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn-sm btn-fill btn-danger"
                    onClick={() => handleDelete(shift)}
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

export default Shifts;
