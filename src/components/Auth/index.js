
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { signupWithEmailAndPassword, LoginWithEmailAndPassword } from "../../actions/auth";
import Loader from "../UI/Loader";
const AuthIndex = () => {
    const [params, setParams] = useState('');
    const location = useLocation()
    useEffect(() => {
        setParams(location.pathname.replace('/', ''))
    }, [location])

    const [showLoader, setShowLoader] = useState(false)
    const [details, setDetails] = useState({
        email: '',
        password: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleInput = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        return ()=> {setShowLoader(false)
        setDetails(false)
    }
    },[])
    const handleSubmission = (e) => {
        e.preventDefault();
        setShowLoader(true)
        if (params === "signup") {
            // signupWithEmailAndPassword()
            setShowLoader(true)
            dispatch(signupWithEmailAndPassword(details, (data) => {
                if (data.error) {
                    alert("Some error")
                } else {
                    console.log("sucessfully signed up")
                    navigate('/')
                }
                setShowLoader(false)
            }))
        } else if (params === "login") {
            setShowLoader(true)
            dispatch(LoginWithEmailAndPassword(details, (data) => {
                if (data.error) {
                    alert("Some error")
                } else {
                    console.log("sucessfully Logged in")
                    navigate('/')
                }
                setShowLoader(false)
            }))
        }
    }



    return (
        <>
            <div className="auth-container">
                <div className="auth-container--box">
                    <div className="tab-selector">
                        <NavLink to={"/login"}><h3>Login</h3></NavLink>
                        <NavLink to={"/signup"}><h3>Signup</h3></NavLink>
                    </div>
                    <form autoComplete={"off"} onSubmit={handleSubmission}>
                        <div className="input-wrap">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Enter Email"
                                value={details.email}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="input-wrap">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={details.password}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="button-wrap">
                            <button className="login-btn">
                                {params === "login" ? "Login" : "Signup"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {showLoader && <Loader />}
        </>
    )
}
export default AuthIndex;