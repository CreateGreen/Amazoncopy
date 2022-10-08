import './Login.css';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import { authservice } from '../firebase';
import axios from '../axios';

function Login() {
  const [email,setemail]=useState("");
  const [pw,setpw]=useState("");
  const navigate = useNavigate()
  const signin =(e:any)=>{
    e.preventDefault();
    axios.post("/login",{email:email,pw:pw}).then((res)=>{
      console.log(res.data)
      if(res.data=="success login!"){
        navigate("/");
      }else{
        alert(res.data);
      }
    })
    // authservice.signInWithEmailAndPassword(email,pw).then(path=>{
    //   navigate('/');
    // }).catch(err=>alert(err.message))
    
  };
  const register=(e:any)=>{
    e.preventDefault();
    authservice.createUserWithEmailAndPassword(email,pw).then((path:any)=>{
      if(authservice){
        navigate("/")
      }
    }).catch((err:any)=>alert(err.message))




  };
  return (
    <div className="login_page">
      <Link to="/">
      <img src="images.png" alt="" className="login_logo" />
      </Link>
      <div className="login_container">
      <h1>Login</h1>
      <form>
        <h5>Email</h5>
        <input type="text" value={email} onChange={e=>setemail(e.target.value)}/>
        <h5>Password</h5>
        <input type="password" value={pw} onChange={e=>setpw(e.target.value)}/>
        <button className="login_submit" onClick={signin}>Login</button>
      </form>
      <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
      <button className="login_signbutton" onClick={register}>Sign up</button>


      </div>



    </div>
  );
}

export default Login;
