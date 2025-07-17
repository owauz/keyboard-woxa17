import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import MainLogo from '../../assets/icons/main-logo.svg';
import bottomBtn from '../../assets/icons/bottom-btn.svg';
import './Header.scss';

export default function Header() {
    const [isActive, setIsActive] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("accessToken");
        navigate("/login");
    };
    const handleModeToggle = () => {
        setIsActive(!isActive);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const defaultPath = "M1 10.449C0.998458 12.8283 1.80169 15.1383 3.27914 17.0033C4.75659 18.8683 6.82139 20.1788 9.13799 20.7218C11.4545 21.2647 13.8866 21.0082 16.039 19.994C18.1912 18.9797 19.9373 17.2673 20.9931 15.1352C11.5442 15.1352 6.85799 10.4479 6.85799 1C5.09842 1.87311 3.61767 3.22033 2.58266 4.88981C1.54765 6.5593 0.999502 8.48469 1 10.449Z";
    const activePath = "M1 10.449C0.998458 12.8283 1.80169 15.1383 3.27914 17.0033C4.75659 18.8683 6.82139 20.1788 9.13799 20.7218C11.4545 21.2647 13.8866 21.0082 16.039 19.994C18.1912 18.9797 19.9373 17.2673 20.9931 15.1352C11.5442 15.1352 6.85799 10.4479 6.85799 1C5.09842 1.87311 3.61767 3.22033 2.58266 4.88981C1.54765 6.5593 0.999502 8.48469 1 10.449Z";

    return <header>
        <img src={MainLogo} alt="Main Logo" />
        <div className="navbar">
            <div className="wrap">
                <button onClick={handleDropdownToggle}>
                    Sans Serif
                    <img src={bottomBtn} alt="Dropdown Arrow" className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} />
                </button>
                {isDropdownOpen && (
                    <div className="dropdown">
                        <button>Sans Serif</button>
                        <button>Serif</button>
                        <button>Mono</button>
                    </div>
                )}
            </div>
            <div className='mode-wrapper'>
                <button
                    className={`mode ${isActive ? 'active-mode' : ''}`}
                    onClick={handleModeToggle}
                >
                    <div></div>
                </button>
                <button>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                            fillRule="evenodd" 
                            clipRule="evenodd" 
                            d={isActive ? activePath : defaultPath} 
                            stroke={isActive ? '#a445ed' : '#757575'} 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                        />
                    </svg>
                </button>
            </div>
        </div>
        <button className='js-btn' onClick={handleLogout}>log out</button>
    </header>
}