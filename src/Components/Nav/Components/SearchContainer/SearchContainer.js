import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  locationSearchValAction,
  setKidQtyAction,
  plusGuestQtyAction,
  minusGuestQtyAction,
} from '../../../../actions';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import SearchBar from './Components/SearchBar/SearchBar';
import Location from './Components/Location/Location';
import Guests from './Components/Guests/Guests';
import './SearchContainer.scss';

const SearchContainer = props => {
  const [currentTab, setCurrentTab] = useState(0);
  const [startDate, setStartDate] = useState(
    props.location.pathname === '/list'
      ? moment(props.location.state.startDate)
      : null
  );
  const [endDate, setEndDate] = useState(
    props.location.pathname === '/list'
      ? moment(props.location.state.endDate)
      : null
  );
  const [focusedInput, setFocusedInput] = useState(null);
  const [searchList, setSearchList] = useState([]);

  //redux 적용 부분
  const searchInputValue = useSelector(state => state.locationValReducer);
  const guestQty = useSelector(state => state.guestQtyReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/data/search.json')
      .then(res => res.json())
      .then(data => {
        setSearchList(data.SEARCH_DATA);
      });
  }, []);

  const clickTab = id => {
    setCurrentTab(id);
  };

  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const onFocusChange = focusedInput => {
    setFocusedInput(focusedInput);
  };

  const controllQuantity = (evt, selectedId) => {
    if (evt.target.name === 'plus') {
      if (selectedId === 'kid' && guestQty.kid === 0 && guestQty.adult === 0) {
        dispatch(setKidQtyAction());
      } else {
        dispatch(plusGuestQtyAction(selectedId));
      }
    } else {
      dispatch(minusGuestQtyAction(selectedId));
    }
  };

  const inputValHandler = evt => {
    dispatch(locationSearchValAction(evt.target.value));
  };

  const selectLocation = selected => {
    dispatch(locationSearchValAction(selected));
    setCurrentTab(0);
  };

  const goToList = () => {
    if (startDate && endDate) {
      props.history.push({
        pathname: '/list',
        state: {
          startDate: startDate._d,
          endDate: endDate._d,
          longitude: searchList.filter(list => list.gu === searchInputValue)[0]
            .longitude,
          latitude: searchList.filter(list => list.gu === searchInputValue)[0]
            .latitude,
        },
      });
    } else {
      this.props.history.push({
        pathname: '/list',
        state: {
          startDate: new Date('14 / 02 / 2021'),
          endDate: new Date('06 / 02 / 2021'),
          longitude: searchList.filter(list => list.gu === searchInputValue)[0]
            .longitude,
          latitude: searchList.filter(list => list.gu === searchInputValue)[0]
            .latitude,
        },
      });
    }
  };

  const SEARCH_TABS = {
    1: (
      <Location
        searchList={searchList.length > 0 && searchList}
        searchInputValue={searchInputValue}
        selectLocation={selectLocation}
      />
    ),
    4: <Guests controllQuantity={controllQuantity} guestQty={guestQty} />,
  };

  return (
    <section>
      <SearchBar
        clickTab={clickTab}
        startDate={startDate}
        endDate={endDate}
        guestQty={guestQty}
        onDatesChange={onDatesChange}
        focusedInput={focusedInput}
        onFocusChange={onFocusChange}
        searchInputValue={searchInputValue}
        inputValHandler={inputValHandler}
        goToList={goToList}
      />
      <div>{SEARCH_TABS[currentTab]}</div>
    </section>
  );
};

export default withRouter(SearchContainer);
