import { lazy } from "react";
import Loading from "../Loading/Loading";


const Home =Loading(lazy(async () => await import ('../Home/Home')));

const SignUp =Loading(lazy(async () => await import ('../UserRegistration/SignUp')));
const SignIn =Loading(lazy(async () => await import ('../UserRegistration/SignIn')));


const routes=[
    {   path:'/',
        element:<Home/>
    },
    {
        path:'/SignUp',
        element:<SignUp/>
    },
    {
        path:'/SignIn',
        element:<SignIn/>
    }
];

export default routes;