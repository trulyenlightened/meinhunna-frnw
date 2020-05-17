

import PlatformStorage from '../storage';
import { createApi } from './api';
import Navigation from "../navigation/NavigationService";


export const SELECTED_MURCHANT = "order/SELECTED_MURCHANT";
export const GET_NEARBY_SUCCESS = "order/GET_NEARBY_SUCCESS";
export const ON_ADD_ITEMS = "order/ON_ADD_ITEMS";
export const ON_SELECTED_ITEM = "order/ON_SELECTED_ITEM";
export const ON_CHANGE_TEXT_ITEM_SELECT = "order/ON_CHANGE_TEXT_ITEM_SELECT";
export const UPDATE_QTY = "order/UPDATE_QTY";

export const getNearby = (location) => async (dispatch, getState) => {
  // console.error(location.coords.latitude);
  const state = getState();

  const LocationData = {
    latitude: `${location.coords.latitude}`,
    longitude: `${location.coords.longitude}`,
  };
  try {
    var response = await createApi(state)
      .post("/users/nearby", LocationData)
      .then((res) => res)

      .catch((err) => {
        throw new Error(err.response ? err.response.data.message : err.message);
      });
      console.error(response);

    if (response.status === 200) {
      dispatch({
        type: GET_NEARBY_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const selectedMurchant = (index) => (dispatch, getState) => {
  const { murchantList } = getState().order;
  //console.log(murchantList[index]);
  dispatch({
    type: SELECTED_MURCHANT,
    payload: murchantList[index],
  });
};

export const onAddItems = () => (dispatch, getState) => {
  dispatch({
    type: ON_ADD_ITEMS,
  });
};

export const onSelectedItem = () => (dispatch, getState) => {
  const { finalItem, finalQty } = getState().order;

  dispatch({
    type: ON_SELECTED_ITEM,
    payload: { finalItem, finalQty },
  });
};

export const onChangeTextItemSelect = (index) => (dispatch, getState) => {
  const { selectedMurchant } = getState().order;
  dispatch({
    type: ON_CHANGE_TEXT_ITEM_SELECT,
    payload: selectedMurchant.items[index],
  });
};

export const updateQTY = (val) => (dispatch) => {
  dispatch({
    type: UPDATE_QTY,
    payload: val,
  });
};