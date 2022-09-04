import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { authActions } from "../../store/auth-slice";
import BigButton from "../UI/BigButton";
import classes from './LoginPage.module.css';

const LoginPage = () => {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleChangeUsernameInput = (event: ChangeEvent<HTMLInputElement>) => {
        setUsernameInput(event.target.value);
    }
    const handleChangePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordInput(event.target.value);
    }
    const handleLogin = () => {
        fetch(`/login`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ username: usernameInput, password: passwordInput })
            }).then((res) => res.json()).then((res) => {
                dispatch(authActions.setJwtUponLogin(res.authToken));
                dispatch(authActions.setFrontEndPrivilegeUponLogin(res.frontEndPrivilege));
            }).catch((err) => console.log(`Error logging in: ${err}`));
        navigate('/');
    }

    return (
        <div className={classes.loginForm}>
            <h1>כניסה</h1>
            <input type="text" value={usernameInput} placeholder="שם משתמש" onChange={handleChangeUsernameInput} />
            <input type="password" value={passwordInput} placeholder="סיסמה" onChange={handleChangePasswordInput} />
            <BigButton text="כניסה" action={handleLogin} />
        </div>
    )
};

export default LoginPage;