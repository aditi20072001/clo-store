import React, { useState } from "react";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="header">
        <picture>
          <source media="(max-width: 1023px)" srcSet="/clo_mobile.png" />

          <img src="/clo_logo.png" alt="CLO Store" className="logo" />
        </picture>

        <nav className="nav">
          <span className="menu-item active">STORE</span>
          <span className="menu-item">GALLERY</span>
          <span className="menu-item">CONTEST</span>
          <span className="menu-item">COMMUNITY</span>
          <span className="menu-item apps-item">
            APPS
            <img
              src="https://img.icons8.com/?size=100&id=37319&format=png&color=96969f"
              alt=""
              className="menu-icon"
              aria-hidden="true"
            />
          </span>

          <span className="menu-item apps-item2">
            GAMESWEAR
            <img
              src="https://img.icons8.com/?size=100&id=blk2PNUlJAYt&format=png&color=96969f"
              alt=""
              className="menu-icon"
              aria-hidden="true"
            />
          </span>
        </nav>

        <div className="auth-actions">
          <a className="btn-link sign-in" href="/signin">
            SIGN IN
          </a>
          <a className="btn-outline sign-up" href="/signup">
            SIGN UP
          </a>
          <button className="apps-btn" type="button" aria-label="More apps">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              aria-hidden="true"
              focusable="false"
            >
              <g fill="#9CA3AF">
                <rect x="2" y="2" width="4" height="4" rx="1" />
                <rect x="12" y="2" width="4" height="4" rx="1" />
                <rect x="22" y="2" width="4" height="4" rx="1" />
                <rect x="2" y="12" width="4" height="4" rx="1" />
                <rect x="12" y="12" width="4" height="4" rx="1" />
                <rect x="22" y="12" width="4" height="4" rx="1" />
                <rect x="2" y="22" width="4" height="4" rx="1" />
                <rect x="12" y="22" width="4" height="4" rx="1" />
                <rect x="22" y="22" width="4" height="4" rx="1" />
              </g>
            </svg>
          </button>
        </div>

        <div className="mobile-actions">
          <button className="icon-btn" aria-label="Notifications">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="#fff"
              aria-hidden="true"
            >
              <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6v-5a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z" />
            </svg>
          </button>

          <button
            className="icon-btn"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="#fff"
              aria-hidden="true"
            >
              <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
            </svg>
          </button>
        </div>
      </header>

      <aside className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        {open && (
          <button
            className="drawer-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
              <path d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3 10.6 10.6 16.9 4.3l1.4 1.4z" />
            </svg>
          </button>
        )}

        <div className="drawer-body">
          <a className="btn-outline pill" href="#">
            SIGN IN
          </a>

          <ul className="drawer-menu">
            <li className="active">STORE</li>
            <li>GALLERY</li>
            <li>CREATOR</li>
            <li>CONTEST</li>
            <li>COMMUNITY</li>
            <li className="apps-row">
              <span>APPS</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#fff"
                aria-hidden="true"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </li>
          </ul>
        </div>
      </aside>

      {open && (
        <div
          className="backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;
