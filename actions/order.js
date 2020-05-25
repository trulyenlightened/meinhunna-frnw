import PlatformStorage from '../storage';
import { createApi } from './api';
import Navigation from "../navigation/NavigationService";
export const SELECTED_MURCHANT = "order/SELECTED_MURCHANT";
export const GET_NEARBY_SUCCESS = "order/GET_NEARBY_SUCCESS";
export const ON_ADD_ITEMS = "order/ON_ADD_ITEMS";
export const ON_SELECTED_ITEM = "order/ON_SELECTED_ITEM";
export const ON_CHANGE_TEXT_ITEM_SELECT = "order/ON_CHANGE_TEXT_ITEM_SELECT";
export const UPDATE_QTY = "order/UPDATE_QTY";
export const UPDATE_ORDER_ADDRESS = "order/UPDATE_ORDER_ADDRESS";
export const ON_PLACE_ORDER = "order/ON_PLACE_ORDER";
export const GET_ORDER_SUCCESS = "order/GET_ORDER_SUCCESS";
export const ON_SELECTED_ITEM_REMOVE = "Order/ON_SELECTED_ITEM_REMOVE";
export const ON_CHANGE_SUB_ITEM_SELECT = "Order/ON_CHANGE_SUB_ITEM_SELECT"
export const UPDATE_ORDER_DESCRIPTION="Order/UPDATE_ORDER_DESCRIPTION";

export const getNearby = (location) => async (dispatch, getState) => {
  const state = getState();

  const LocationData = {
    latitude: location.coords.latitude?`${location.coords.latitude}`:null,
    longitude: location.coords.longitude?`${location.coords.longitude}`:null,
  };
  try {
    var response = await createApi(state)
      .post("/users/nearby", LocationData)
      .then((res) => res)

      .catch((err) => {
        throw new Error(err.response ? err.response.data.message : err.message);
      });


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

export const onSelectedMurchant = (index) => (dispatch, getState) => {
  const { murchantList } = getState().order;
  dispatch({
    type: SELECTED_MURCHANT,
    payload: murchantList[index],
  });
};

export const onAddItems = () => async(dispatch, getState) => {
  const{selectedMurchant} = getState().order
  if(selectedMurchant === ""){
    await dispatch(onSelectedMurchant(0))
  }
  dispatch({
    type: ON_ADD_ITEMS,
  });
};

export const onSelectedItem = () => (dispatch, getState) => {
  const { finalItem, finalQty,finalUnit,orderDescription } = getState().order;

  dispatch({
    type: ON_SELECTED_ITEM,
    payload: { finalItem, finalQty,finalUnit,orderDescription },
  });
};

export const onChangeTextItemSelect = (index) => async(dispatch, getState) => {
  const { selectedMurchant } = getState().order;


  dispatch({
    type: ON_CHANGE_TEXT_ITEM_SELECT,
    payload: {item:selectedMurchant.items[index],index},
  });
};

export const onChangeSubItemSelect = (index) => (dispatch,getState) =>{
  const { selectedMurchant,mI } = getState().order;


  dispatch({
    type:ON_CHANGE_SUB_ITEM_SELECT,
    payload: selectedMurchant.items[mI].sub_items[index]
  })


}

export const updateQTY = (val) => (dispatch) => {
  dispatch({
    type: UPDATE_QTY,
    payload: val,
  });
};

export const updateOrderAddress = val => (dispatch) =>{
  dispatch({
    type:UPDATE_ORDER_ADDRESS,
    payload:val
  })
}

export const onSelectedItemRemove = index => (dispatch) =>{

  dispatch({
    type:ON_SELECTED_ITEM_REMOVE,
    payload:index
  })
}
export const updateDescription = index => (dispatch) =>{

  dispatch({
    type:UPDATE_ORDER_DESCRIPTION,
    payload:index
  })
}

export const onFinalizeOrder = () => async(dispatch,getState) =>{
  const state = getState();
  const {orderItem,orderQty,orderAddress,selectedMurchant,orderDescriptionArr} = state.order

  var items = []

  orderItem.map((d)=>{
    items.push(d.item_name)
  })


  const OrderData = {
    merchant_id: `${selectedMurchant.merchant.merchant_id}`,
	  items: items,
	  quantity: orderQty,
    order_address: orderAddress,
    description:orderDescriptionArr
  };
  try {
    var response = await createApi(state)
      .post("/users/order", OrderData)
      .then((res) => res)

      .catch((err) => {
        throw new Error(err.response ? err.response.data.message : err.message);
      });

    if (response.status === 200) {
      alert('ऑर्डर सफलतापूर्वक हो गया')
      dispatch({
        type: GET_ORDER_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {

  }
}

export const onPlaceOrder = () => (dispatch) =>{
  dispatch({
    type:ON_PLACE_ORDER,

  })
}
