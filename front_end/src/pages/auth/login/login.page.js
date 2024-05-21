import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  async function getUser(info) {
    const response = await axios.post("http://127.0.0.1:8000/api/login", info);

    localStorage.setItem("data", JSON.stringify(response.data));

    if (response.data.role == "collaborateur") {
      navigate("/coll");
    }

    if (response.data.role == "manager") {
      navigate("/manager");
    }

    if (response.data.role == "rh") {
      navigate("/rh");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const info = {
      email: email,
      password: password,
      role: role,
    };

    getUser(info);
  };

  return (
    <section className='login-page'>
      <h1 className='login__title'>Enter Your Credentials</h1>
      <span className='title__line'>
        <span></span>
      </span>
      <div className='login-component'>
        <form className='login__form' onSubmit={handleSubmit}>
          <div className='form__input'>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form__input'>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='form__select'>
            <select name='role' onChange={(e) => setRole(e.target.value)}>
              <option>User role</option>
              <option value='rh'>RH</option>
              <option value='manager'>Manager</option>
              <option value='collaborateur'>Collaborateur</option>
            </select>
          </div>
          <div className='form__button'>
            <input type='submit' value='LOGIN' />
          </div>
        </form>
      </div>

      <div className='login-footer'>
        <div className='footer__content'>
          <div className='footer__logo'>
            <img src={require("@/common/images/CgateLogoLight.png")} alt='_' />
          </div>
          <p className='footer__description'>
            Driven by innovation and expertise in its businesses, Cegedim's
            offerings are aimed at the life sciences industries, healthcare
            professionals, health insurance companies and all companies
            interested in outsourcing issues and of dematerialized exchanges.
          </p>
          <p className='footer__copyright'>
            Copyright &copy; 2022 All right reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
