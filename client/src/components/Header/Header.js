
import { Link } from 'react-router-dom';

import './Header.scss';

export default function Header () {

    return (

        <header>
            <nav>
                <Link to = './'>Home</Link>
                <Link to = './gallery'>Galleries</Link>
                <Link to = './sign-in'>Sign in</Link>
                <Link to = './sign-up'>Sign up</Link>
                {/* {
                    isAuthorized ?
                    <>
                        <Link to = './gallery'>Galleries</Link>
                        <Link to = './sign-out'>Sign out</Link>
                    </>
                    :
                    <>
                        <Link to = './sign-in'>Sign in</Link>
                        <Link to = './sign-up'>Sign up</Link>
                    </>
                } */}
            </nav>
        </header>
    );
};
