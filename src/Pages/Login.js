import React, { useState } from 'react'
import { Link,useNavigate} from "react-router-dom";
function Login() {

  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate= useNavigate();
  const handleSumbit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    });

    if (!response.ok) {
      console.error('Fetch request failed:', response.status, response.statusText);
    } else {
      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert('Enter valid Credentials');
      }
      if (json.success) {
        localStorage.setItem("userEmail",credentials.email)
        localStorage.setItem("authToken",json.authToken)
        console.log(localStorage.getItem("authToken"));
        navigate('/');
      }
    }

  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div className="container">
      <form onSubmit={handleSumbit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
        <Link to="/createuser" className='m-3 btn btn-danger'>Create new account</Link>
      </form>
    </div>

  )
}

export default Login
