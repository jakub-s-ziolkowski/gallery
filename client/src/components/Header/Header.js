
import { Link } from 'react-router-dom';

import './Header.scss';

export default function Header ({ isAuthorized, setToken }) {

    const signOutHandler = () => {

        localStorage.clear();
        setToken();
    };

    return (

        <header>
            <nav>
                <Link to = './'>Home</Link>
                {
                    isAuthorized ?
                    <>
                        <Link to = './gallery'>Galleries</Link>
                        <Link onClick = { signOutHandler }>Sign out</Link>
                    </>
                    :
                    <>
                        <Link to = './sign-in'>Sign in</Link>
                        <Link to = './sign-up'>Sign up</Link>
                    </>
                }
            </nav>
        </header>
    );
};
