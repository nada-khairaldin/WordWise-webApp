import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const URL = "http://localhost:9000";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/app" , {replace : true});   // here if we go back in the browser it will redirect us to the app page directly not login, cause isAuthenticated = true , so we navigate directly to app! we solve this by using replace , which let us replace the stack history with the previous page
      }
    },
    [isAuthenticated , navigate]
  );

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
