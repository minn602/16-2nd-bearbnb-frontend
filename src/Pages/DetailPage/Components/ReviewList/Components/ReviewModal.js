import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export const ReviewModal = ({ closeModal }) => {
  const [reviewData, setReviewData] = useState([]);
  const [currentPostId, setCurrentPostId] = useState(1);
  const [searchVal, setSearchVal] = useState('');

  //fetch data function
  const fetchData = async currentPostId => {
    try {
      const res = await axios(
        `https://jsonplaceholder.typicode.com/comments?postId=${currentPostId}`
      );
      const data = await res.data;
      setReviewData([...reviewData, ...data]);
    } catch (error) {
      alert(error);
    }
  };

  //componentDidUpdate fetch init data
  useEffect(() => {
    fetchData(currentPostId);
  }, [currentPostId]);

  //get scrolling values -> update states
  const scrollHandler = evt => {
    const scrollHeight = evt.nativeEvent.srcElement.scrollHeight;
    const scrollTop = evt.nativeEvent.srcElement.scrollTop;
    const clientHeight = evt.nativeEvent.srcElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setCurrentPostId(prev => prev + 1);
      fetchData(currentPostId);
    }
  };

  const updateSearchVal = evt => {
    setSearchVal(evt.target.value);
  };

  return (
    <>
      <Wrapper onClick={closeModal} />
      <Modal onScroll={scrollHandler}>
        <Header>
          <CloseButton>X</CloseButton>
          <Nav>
            <Rating>
              <img alt="rating" src="/images/Detail/star.png" />
              <div>4.86점(후기 20개)</div>
            </Rating>
            <Searchbar>
              <input
                onChange={updateSearchVal}
                type="text"
                value={searchVal}
                placeholder="후기 검색"
              />
            </Searchbar>
          </Nav>
        </Header>

        <ReviewContent>
          {reviewData.map((review, idx) => {
            return (
              <ReviewItem key={idx}>
                <div>
                  <img
                    alt={review.name}
                    src="https://a0.muscache.com/im/pictures/user/8eee053e-72c4-49a7-b12c-ca234c64ac9a.jpg?im_w=240"
                  />
                  <div>
                    <span>{review.name}</span>
                    <span>2021년 03월</span>
                  </div>
                </div>
                {review.body}
              </ReviewItem>
            );
          })}
        </ReviewContent>
      </Modal>
    </>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 15;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  background-color: #fff;
`;

const Modal = styled.div`
  width: 1032px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 12px;
  overflow: auto;
  z-index: 20;

  &:-webkit-scrollbar {
    height: 80%;
  }
`;

const CloseButton = styled.button`
  margin-bottom: 30px;
  text-align: left;
  position: absolute;
  top: 24px;
  left: 24px;

  &:hover {
    cursor: pointer;
  }
`;

const Nav = styled.nav`
  margin-top: 24px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Rating = styled.div`
  width: 30%;
  display: flex;
  align-items: center;

  img {
    display: block;
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  div {
    font-size: 24px;
    font-weight: 800;
  }
`;

const Searchbar = styled.div`
  width: 60%;

  input {
    width: 100%;
    padding: 12px;
    color: rgb(34, 34, 34);
    background-color: rgb(247, 247, 247);
    border: 0.5px solid rgba(34, 34, 34, 0.3);
    border-radius: 100px;
    box-shadow: rgb(176 176 176) 0px 0px 0px 1px inset !important;
  }
`;

const ReviewContent = styled.section`
  width: 60%;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 16px;
`;

const ReviewItem = styled.div`
  /* width: 45%; */
  height: 184px;

  div {
    display: flex;
    align-items: center;
    padding-bottom: 12px;

    img {
      display: block;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      margin-right: 12px;
    }

    div {
      display: flex;
      flex-direction: column;

      span {
        &:first-child {
          font-size: 16px;
          color: #222222;
          font-weight: 600;
        }

        &:last-child {
          font-size: 14px;
          color: #717171;
        }
      }
    }
  }
`;
