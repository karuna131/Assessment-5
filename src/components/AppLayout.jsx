import { Routes, Route, Outlet, Link } from "react-router";
import {AuthGuard, AddData} from './AuthGuard';
import Login from './Login';


function Sidbar(){
    return (
        <>
        <Link to='/login'>Login</Link>
        <Link to='/settings'>Settings</Link>
        </>
    )
}

function MainLayout(){
    return(
        <>
        <Sidbar />
        <Outlet />
        </>
    )
}
    
function AppLayout(){
    return (
        <>
        <Routes>
            <Route path="/" element={<MainLayout />} />
                <Route path="/login" element={<Login />}/>
                <Route path="/profile/:userId" element={<></>}/>
                <Route path="/settings" element={<></>} />
        </Routes>
        </>
    )
}

export default AppLayout;