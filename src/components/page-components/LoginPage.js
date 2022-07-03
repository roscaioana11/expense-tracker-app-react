import React, {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import "./LoginPageStyle.css";
import UserContext from "../../Context";
import userSerivce from "../../service/userSerivce";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoggedIn, setIsLoggedIn] = useContext(UserContext);

    if (userSerivce.hasUser()) {
        setIsLoggedIn(true);
    }

    function handleSubmit() {
        setIsLoggedIn(true);
        userSerivce.saveUser({email: email, password: password});
    }

    if (isLoggedIn) {
        return <Navigate to="/dashboard"/>;
    }

    return (
        <>
            <div className="login-page flex flex-center-content w-100 vh-100">
                <div className="login-container w-25">
                    <div className="text-center mb-5 f-size25">
                        <h2 className="m-0">LOGIN</h2>
                    </div>

                    <div>
                        <div className="login-input-tab">
                            <label htmlFor="email" className="m-l-10 f-size20">
                                Email
                            </label>
                            <input id="email" type="email" className="w-100 round-input-text" value={email}
                                   onChange={(event) => setEmail(event.target.value)}/>
                        </div>
                        <div className="login-input-tab">
                            <label htmlFor="password" className="m-l-10 f-size20">
                                Password
                            </label>
                            <input id="password" type="password" className="w-100 round-input-text" value={password}
                                   onChange={(event) => setPassword(event.target.value)}/>
                        </div>
                        <div className="flex flex-center-content pad-t-20">
                            <input type="button" value="Sign In" onClick={handleSubmit}
                                   className="w-100 round-input-button"/>
                        </div>
                    </div>
                </div>
                <div className="login-container-mask"></div>
            </div>
        </>
    );
}

export default LoginPage;
