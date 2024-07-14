import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface HeaderProps {
  activePage: number;
  onPageChange: (page: number) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, onPageChange }) => {
  return (
    <div style={{marginLeft:'auto', marginRight:'auto', justifyContent:'center', width:'fit-content', marginTop:'1%'}}>
        <header className="header" style={{width:'fit-content'}}>
        <nav>
          <ul>
            <li className={activePage === 0 ? 'active' : ''}>
                <button onClick={() => onPageChange(0)}>
                <i className="bi bi-house-door"></i>
                <span>Home</span>
                </button>
            </li>
            <li className={activePage === 1 ? 'active' : ''}>
                <button onClick={() => onPageChange(1)}>
                <i className="bi bi-compass"></i>
                <span>Explore</span>
                </button>
            </li>
            <li className={activePage === 2 ? 'active' : ''}>
                <button onClick={() => onPageChange(2)}>
                <i className="bi bi-geo-alt"></i>
                <span>Local News</span>
                </button>
            </li>
          </ul>
        </nav>
        <style>{`
            .header {
            background: rgb(128, 198, 255);
            padding: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 15px;
            }
            nav {
            display: flex;
            justify-content: center;
            }
            ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
            display: flex;
            }
            li {
            margin: 0 1rem;
            }
            button {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: transform 0.3s ease;
            }
            button:hover {
            transform: translateY(-3px);
            }
            i {
            font-size: 1.5rem;
            margin-bottom: 0.25rem;
            }
            span {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            }
            .active button {
            color: yellow;
            font-weight: bold;
            }
        `}</style>
        </header>
    </div>

  );
};

export default Header;