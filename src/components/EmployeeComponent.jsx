import { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then((response) => {
          const { firstName, lastName, email, department } = response.data;
          setFirstName(firstName);
          setLastName(lastName);
          setEmail(email);
          setDepartment(department);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  //Save and update function
  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const employee = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        department: department,
      };

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            setFirstName("");
            setLastName("");
            setEmail("");
            setDepartment("");
            navigator("/employees");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            setFirstName("");
            setLastName("");
            setEmail("");
            setDepartment("");
            navigator("/employees");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  //Adding this function to check validation before user submit form to avoid null data
  const validateForm = () => {
    let valid = true;

    let errorCopy = { ...errors };

    if (firstName.trim()) {
      errorCopy.firstName = "";
    } else {
      errorCopy.firstName = "First Name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorCopy.lastName = "";
    } else {
      errorCopy.lastName = "Last Name is required";
      valid = false;
    }

    if (email.trim()) {
      errorCopy.email = "";
    } else {
      errorCopy.email = "Email is required";
      valid = false;
    }

    if (department.trim()) {
      errorCopy.department = "";
    } else {
      errorCopy.department = "Department is required";
      valid = false;
    }

    setErrors(errorCopy);

    return valid;
  };

  const pageHeader = () => {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  };

  return (
    <div className="container">
      <br></br> <br></br>
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageHeader()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label>First Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee First name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label>Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Enter Employee Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label>Department:</label>
                <input
                  type="text"
                  placeholder="Enter Department"
                  name="department"
                  value={department}
                  className={`form-control ${errors.department ? "is-invalid" : ""}`}
                  onChange={(e) => setDepartment(e.target.value)}
                ></input>
                {errors.department && (
                  <div className="invalid-feedback">{errors.department}</div>
                )}
              </div>
              <button
                className="btn btn-success"
                onClick={saveOrUpdateEmployee}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
