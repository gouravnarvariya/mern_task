import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ValidateLogin, ValidateSignUp } from "../utils/Validate";
import { addAccessToken } from "../api/Api";
import { UserLogin, UserSignup } from "../store/slices/userSlice";

const SignUp = () => {
  const [inp, setInp] = useState({
    name:"",
    email: "",
    password: "",
    role:""
  });

  const [error, setError] = useState({ isValid: false });

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(p => {
        const obj = { ...p }
        obj && delete obj[name]
        return obj
      })
    setInp((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleClick = () => {
    const check = ValidateSignUp(inp)
    setError(check)
    if(!check.isValid) {
        dispatch(UserSignup(inp))
    }
  }

  const userData = useSelector((store)=>store.user.signUpData)
  
  useEffect(() => {
    console.log(userData.data)
    if (userData.data) {
        toast.success("signup successful")
      addAccessToken(userData.data.token)
      navigate('/')
    }
  }, [userData.data])

  useEffect(() => {
    console.log(userData.data)
    if (userData.error) {
      toast.error(userData.error)
      setInp({
        name:"",
        email: "",
        password: "",
        role:""
      })
    }
  }, [userData.error])

  console.log(error)

  return (
    <div className="flex-box">
      <input
        onChange={(e) => {
          handleChange(e);
        }}
        value={inp.name}
        name="name"
        type="text"
        placeholder="enter name"
      ></input>
      {error ? <h1 className="red">{error?.name }</h1> : ""}
      
      <input
        onChange={(e) => {
          handleChange(e);
        }}
        value={inp.email}
        name="email"
        type="text"
        placeholder="enter email"
      ></input>
      {error ? <h1 className="red">{error?.email }</h1> : ""}
      <input
        onChange={(e) => {
          handleChange(e);
        }}
        value={inp.password}
        name="password"
        type="text"
        placeholder="enter password"
      ></input>
      {error ? <h1 className="red">{error?.password }</h1>: ""}

      <input
        onChange={(e) => {
          handleChange(e);
        }}
        value={inp.role}
        name="role"
        type="text"
        placeholder="enter role"
      ></input>
      {error ? <h1 className="red">{error?.role }</h1> : ""}

      <button onClick={handleClick} >SinpUp</button>
    </div>
  );
};

export default SignUp;
