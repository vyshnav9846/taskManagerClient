import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Navbar,
  Table,
} from "react-bootstrap";
import { deleteTaskApi, gettaskAPI, posttaskAPI, updateTaskApi } from "../services/allApi";


const Dashboard = () => {
  const [getTodo, setGetTodo] = useState([]);
  const [show, setShow] = useState(false);
  const [todoDetails, setTodoDetails] = useState({
    title: "",
    description: "",
    status: "",
  });

  // Fetch todos when component mounts
  useEffect(() => {
    getTodoList();

  }, []);

  // Watch state changes
  useEffect(() => {
    console.log("todo updated:", getTodo);
    console.log("todo length:", getTodo.tasks?.length);
  }, [getTodo]);
  const updateTask = async (id, updatedDetails) => {
    const token = sessionStorage.getItem("token");
    const reqHeader = token ? { Authorization: `Bearer ${token}` } : {};
    await updateTaskApi(id, updatedDetails, reqHeader);
    getTodoList()
  };

  // Get todo list
  const getTodoList = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const result = await gettaskAPI(reqHeader);
      if (result.status >= 200 && result.status < 300) {
        setGetTodo(result.data);
      }
    } catch (error) {

      console.error("Error fetching todos:", error);
    }
  };

  // Modal handlers
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Add new todo
  const handleUpload = async () => {
    handleClose();
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await posttaskAPI(todoDetails, reqHeader);
      if (res.status >= 200 && res.status < 300) {
        alert("Saved successfully");
        getTodoList();
      }
    } catch (error) {
      console.error("Error uploading todo:", error);
    }
  };

  // Delete task
  const deleteTask = async (id, reqHeader) => {
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = token ? { Authorization: `Bearer ${token}` } : {};
      await deleteTaskApi(id, reqHeader);
      getTodoList();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar style={{ zIndex: 1 }} className="bg-info position-fixed w-100">
        <Container>
          <Navbar.Brand style={{ color: "white" }} className="fw-bolder fs-5">
            <i className="fa-solid fa-list"></i> TO DO LIST
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Main Content */}
      <div style={{ paddingTop: "100px" }} className="container">
        <i
          onClick={handleShow}
          style={{ fontSize: "20px", marginLeft: "40%", cursor: "pointer" }}
          className="fa-brands fa-creative-commons-sampling-plus"
        >
          {" "}
          Add To Do List
        </i>

        {/* Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
              <Form.Control
                onChange={(e) =>
                  setTodoDetails({ ...todoDetails, title: e.target.value })
                }
                type="text"
                placeholder="title"
              />
            </FloatingLabel>
            <FloatingLabel
              className="my-2"
              controlId="floatingDescription"
              label="Description"
            >
              <Form.Control
                onChange={(e) =>
                  setTodoDetails({ ...todoDetails, description: e.target.value })
                }
                type="text"
                placeholder="description"
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpload}>
              Upload
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Todo Table */}
        <Table striped bordered hover size="sm" className="mt-4">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            {

              getTodo.tasks?.length > 0 ? (
                getTodo.tasks.map((task) => (
                  <tr key={task._id}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.status}</td>
                    <td>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          updateTask(task._id, {
                            title: task.title,
                            description: task.description,
                            status: "complete",
                            userid: task.userid,
                          })
                        }
                        className="btn btn-success mx-2"
                        disabled={task.status === "complete"} 
                      >
                        Complete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No task added
                  </td>
                </tr>
              )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Dashboard;
