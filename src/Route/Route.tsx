/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import Loading from "../Loading/Loading";

const Home =Loading(lazy(async () => await import ('../Home/Home')));

const SignUp =Loading(lazy(async () => await import ('../UserRegistration/SignUp')));
const SignIn =Loading(lazy(async () => await import ('../UserRegistration/SignIn')));

const ForArtists =Loading(lazy(async () => await import ('../ForArtist/ForArtists')));
const ForListeners =Loading(lazy(async () => await import ('../ForListeners/ForListeners')));

const routes=[
    {   path:'/',
        element:<Home/>
    },
    {   path:'/ForArtists',
        element:<ForArtists/>
    },
    {   path:'/ForListeners',
        element:<ForListeners/>
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