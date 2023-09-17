import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import API from "./API";

const AddContacts = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [relationship, setRelationship] = useState("");
  const [contactId, setContactId] = useState();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    refreshContacts();
  }, []);

  const refreshContacts = () => {
    API.get("/")
      .then((res) => {
        setContacts(res.data);
       
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { name, number, relationship };
    API.post("/", item).then(() => refreshContacts());
  };

  const onUpdate = (id) => {
    console.log(id)
    let item = { name };
    API.patch(`/${id}/`, item).then((res) => refreshContacts());
  };

  const onDelete = (id) => {
    API.delete(`/${id}/`).then((res) => refreshContacts());
  };

  function selectContact(id) {
    let item = contacts.filter((contact) => contact.id === id);
    console.log(item)
    setName(item.name);
    setNumber(item.number);
    setRelationship(item.relationship);
    setContactId(item.id);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Create a new contact</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{contactId}Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGenre">
              <Form.Label>number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStarring">
              <Form.Label>Relationship</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Relationship"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
              />
            </Form.Group>

            <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="mx-2"
              >
                Save
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => onUpdate(contactId)}
                className="mx-2"
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-md-8 m">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Number</th>
                <th scope="col">Relationship</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => {
                return (
                  <tr key="">
                    <th scope="row">{contact.id}</th>
                    <td> {contact.name}</td>
                    <td>{contact.number}</td>
                    <td>{contact.relationship}</td>
                    <td>
                      <i
                        className=""
                        aria-hidden="true"
                        onClick={() => selectContact(contacts.id)}
                      >edit</i>
                      <i
                        className=""
                        aria-hidden="true"
                        onClick={() => onDelete(contacts.id)}
                      >delete</i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddContacts;
