import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate} from "react-router";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const navigate =useNavigate();
    useEffect(()=>{
        const auth= localStorage.getItem('user')
          if(auth)
          {
            navigate('/')
          }
    })

  // Handle input changes
  const collectData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const dataHandle = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post("http://localhost:3000/register", formData);
      console.log("Response:", response.data);
      alert("User signed up successfully!");
      localStorage.setItem("user", JSON.stringify(response.data)); 
      navigate('/')

    } catch (error) {
        console.log(error,"error");
      console.error("Error:", error);
      alert("Something went wrong. Please try again!");
    }
  };

  return (
    <div>
      <form onSubmit={dataHandle}>
        <h1>Register</h1>

        <input
          onChange={collectData}
          value={formData.name}
          name="name"
          className="input-box"
          type="text"
          placeholder="Enter Name"
        />

        <input
          onChange={collectData}
          value={formData.email}
          name="email"
          className="input-box"
          type="email" // Corrected type from "password" to "email"
          placeholder="Enter Email"
        />

        <input
          onChange={collectData}
          value={formData.password}
          name="password"
          className="input-box"
          type="password" // Corrected type from "text" to "password"
          placeholder="Enter Password"
        />

        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
