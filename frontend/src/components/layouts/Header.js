import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../../utils/logo.png'

const Header = () => {
    const [loginUser, setLoginUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        if (user) {
            setLoginUser(user);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01"
                        aria-controls="navbarTogglerDemo01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo01">
                        <Link className="navbar-brand text-primary fs-3 fw-bold" to="/home">
                            <img src={logoImage} style={{ width: "70px", height: "50px" ,margin:"5px"}} />
                            BUDGET BOSS
                        </Link>

                        <ul className="navbar-nav d-flex align-items-center mb-2 mb-lg-0">
                            <li className="nav-item">
                                <p className="nav-link active mb-0 fw-semibold text-primary fs-5">
                                    {loginUser && loginUser.name.toUpperCase()}
                                </p>
                            </li>
                            <li className="nav-item ms-3">
                                <button
                                    className="btn btn-primary fw-semibold"
                                    aria-current="page"
                                    onClick={handleLogout}
                                >
                                    LOGOUT
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header