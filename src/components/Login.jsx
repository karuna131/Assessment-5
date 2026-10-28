import { useState } from "react";

function Login(){
    const userData = {
        email: 'test@gmail.com',
        password: 'Test@123'
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin(e){
        e.preventDefault();
        if(email == userData.email && password == userData.password){
            localStorage.setItem('isAuthenticated', true);
        }else{
            localStorage.setItem('isAuthenticated', false);
            alert('Please check your email and password again.')
        }
    }
    return (
        <>
        <form onSubmit={handleLogin}>
            <label>Email: </label>
            <input type="email" name="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label>Password: </label>
            <input type="password" name="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button>Login</button>
        </form>
        </>
    )
}

export default Login;