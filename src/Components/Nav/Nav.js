import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Logo from './Components/Logo/Logo';
import NavList from './Components/NavList/NavList';
import Profile from './Components/Profile/Profile';
import SearchContainer from './Components/SearchContainer/SearchContainer';
import './Nav.scss';
import Modal from '../../../src/Pages/Modal/Modal';

const Nav = props => {
  const [scrollTop, setScrollTop] = useState(0);
  const [isShowing, setIsShowing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentTab, setCurrentTab] = useState('');

  useEffect(() => {
    props.location.pathname === '/' &&
      window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  });

  const scrollHandler = (evt, prevState) => {
    const scrollTop = ('scroll', evt.srcElement.scrollingElement.scrollTop);
    setScrollTop(scrollTop);

    if (prevState?.scrollTop !== scrollTop) {
      setIsShowing(false);
    }
  };

  const showSearchContainer = () => {
    setIsShowing(prev => !prev);
  };

  const showLoginModal = str => {
    setShowModal(true);
    setCurrentTab(str);
  };

  const closeLoginModal = e => {
    setShowModal(false);
  };

  const currentUrl = props.location.pathname;

  return (
    <>
      <div className="NavContainer">
        {currentUrl === '/' ? (
          <>
            {' '}
            <nav
              className={scrollTop > 10 ? 'Nav scrolled' : 'Nav'}
              onScroll={scrollHandler}
            >
              <Logo scrollTop={scrollTop} />
              <div className="navList">
                {scrollTop > 10 ? (
                  <div
                    onClick={showSearchContainer}
                    className={
                      isShowing ? 'SearchBar hide' : 'SearchBar scrolled'
                    }
                  >
                    검색 시작하기
                    <div className="searchItem">
                      <button type="button">
                        <img alt="searchBtn" src="/images/Nav/search.png" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <NavList />
                )}
              </div>
              <Profile showLoginModal={showLoginModal} />
            </nav>
            <div
              className={
                isShowing
                  ? 'searchContainer show'
                  : scrollTop > 10
                  ? 'searchContainer hide'
                  : 'searchContainer'
              }
            >
              <SearchContainer />
            </div>
          </>
        ) : (
          <nav className="Nav fixed">
            <Logo />
            <SearchContainer />
            <Profile />
          </nav>
        )}
      </div>
      {showModal && (
        <div>
          <Modal
            currentTab={currentTab}
            showModal={showModal}
            closeLoginModal={closeLoginModal}
          />
          <div className="modalsWrapper" onClick={closeLoginModal}></div>
        </div>
      )}
    </>
  );
};

export default withRouter(Nav);
