import React, { useState, useEffect, useRef} from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useNavigate } from 'react-router-dom';
import OpenModalMenuItem from './OpenModalMenuItem';
import Login from '../Login';
import Signup from '../Signup';
import { useModal } from "../../context/Modal";
function ProfileButton({ user }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    const credential = 'Demo-lition';
    const password = 'password'
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
        }
      );


  }



  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout()).then((data) =>  navigate("/"));
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className='menuButton' onClick={openMenu}>
      <i className="fa-solid fa-bars fa-xl"></i>
        <i className="fas fa-user-circle fa-2xl" style={{borderColor: '1px solid blue'}} />

      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className='menuButtonOpen'>
            {/* <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li> */}
            <li className='logoutButton'>
              <button  onClick={logout}>Log Out</button>
            </li>
          </div>
        ) : (
          <div className='menuButtonOpen'>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<Login />}
            />
            <OpenModalMenuItem

              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<Signup />}
            />
                        <OpenModalMenuItem

              itemText="Demo User"
              onItemClick={handleSubmit}

              modalComponent={<Signup />}
/>
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
