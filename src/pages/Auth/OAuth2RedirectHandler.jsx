import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');


        if (token) {
            try {
                document.cookie = 'access_token=; Path=/; Max-Age=-99999999;';
                document.cookie = `access_token=${token}; Path=/; Secure; SameSite=Strict;`;

                window.location.href = '/';
            } catch (error) {
                console.error('Token decoding failed:', error);
                setErrorMessage('Invalid token received. Please try again.');
                navigate('/login');
            }
        } else {
            const error = params.get('error');
            if (error) {
                setErrorMessage(error);
            } else {
                navigate('/login');
            }
        }
    }, [location, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center text-yellow-400 font-pixelify">
            {errorMessage ? (
                <>
                    <h1 className="text-6xl md:text-8xl">Error</h1>
                    <p className="text-2xl md:text-3xl mt-4">{errorMessage}</p>
                    <Link to="/" className="mt-6 px-6 py-2 text-2xl bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg">
                        Go Home
                    </Link>
                </>
            ) : (
                <>
                    <h1 className="text-6xl md:text-8xl">Redirecting...</h1>
                    <Link to="/" className="mt-6 px-6 py-2 text-2xl bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg">
                        Go Home
                    </Link>
                </>
            )}
        </div>
    );
};

export default OAuth2RedirectHandler;
