import axios from "axios"

const baseUrl = `https://identitytoolkit.googleapis.com/v1/`;
const apiKey = `AIzaSyCyUo859e-kKU0NkpuXKa8zuIHxsWR67Vc`;
export const signupWithEmailAndPassword = (details, callback) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${baseUrl}accounts:signUp?key=${apiKey}`,
                {
                    email: details.email,
                    password: details.password,
                    returnSecureToken: true
                })
            dispatch({
                type: "SIGNUP",
                payload: response.data
            })
            localStorage.setItem('token', response.data.idToken)
            return callback(response.data)

        } catch (error) {
            console.log(error)
            return callback({
                error: true,
                response: error.response
            })
        }
    }
}

export const LoginWithEmailAndPassword = (details, callback) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${baseUrl}accounts:signInWithPassword?key=${apiKey}`,
                {
                    email: details.email,
                    password: details.password,
                    returnSecureToken: true
                })
            dispatch({
                type: "LOGIN",
                payload: response.data
            })
            console.log(response.data)
            localStorage.setItem('token', response.data.idToken)
            return callback(response.data)

        } catch (error) {
            console.log(error)
            return callback({
                error: true,
                response: error.response
            })
        }
    }
}
export const isLoggedIn = (callback) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('token')
            if (!token) {
                return;
            }
            const response = await axios.post(`${baseUrl}accounts:lookup?key=${apiKey}`,
                {
                    idToken: token
                })
            dispatch({
                type: "LOGIN",
                payload:{
                    idToken:token,
                    localId:response.data.users[0].localId,
                    ...response.data
                } 
            })
            // localStorage.setItem('token', response.data.users[0].idToken)
            return callback(response.data)

        } catch (error) {
            console.log(error)
            return callback({
                error: true,
                response: error.response
            })
        }
    }
}

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem("token")
        dispatch({
            type:"LOGOUT"
        })
    }
}