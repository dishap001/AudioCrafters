/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import Loading from "../Loading/Loading";

// const Home =Loading(lazy(async () => await import ('../Home/Home')));
const Home1 =Loading(lazy(async () => await import ('../Home/Home1')));


const SignUp =Loading(lazy(async () => await import ('../UserRegistration/SignUp')));
const SignIn =Loading(lazy(async () => await import ('../UserRegistration/SignIn')));

const ForArtists =Loading(lazy(async () => await import ('../ForArtist/ForArtists')));
const AudioRecorder =Loading(lazy(async () => await import ('../ForArtist/AudioRecorder')));
const AudioUpload =Loading(lazy(async () => await import ('../ForArtist/AudioUpload')));
const ForListeners =Loading(lazy(async () => await import ('../ForListeners/ForListeners')));

const routes=[
    {   path:'/',
        element:<Home1/>
    },
    {   path:'/ForArtists',
        element:<ForArtists />
    },
    {   path:'/AudioRecorder',
        element:<AudioRecorder />
    },
    {   path:'/AudioUpload',
        element:<AudioUpload />
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
    },
    {   path:'/Home1',
    element:<Home1/>
},
];

export default routes;