
import {
  SELECTED_MURCHANT,
  GET_NEARBY_SUCCESS,
  ON_ADD_ITEMS,
  ON_SELECTED_ITEM,
  ON_CHANGE_TEXT_ITEM_SELECT,
  UPDATE_QTY
} from '../actions/order';



const initialState = {
  murchantList:[],
  selectedMurchant:"",
  isModalItem:false,
  finalItem:"",
  finalQty:"",
  orderItem:[],
  orderQty:[]
};

export default (state = initialState, action) => {
  switch (action.type) {


        case SELECTED_MURCHANT:
        {
          return {
            ...state,
            selectedMurchant:action.payload
          }
        }

        case GET_NEARBY_SUCCESS:
        {
          return {
            ...state,
            murchantList:action.payload
          }
        }

        case ON_ADD_ITEMS:
        {
          return {
            ...state,
            isModalItem:true
          }
        }

        case ON_SELECTED_ITEM:
        {
          var items = state.orderItem
          items.push(action.payload.finalItem)
          var qty = state.orderQty
          qty.push(action.payload.finalQty)
          console.log(qty);

          return {
            ...state,
            isModalItem:false,
            orderItem:[...items],
            orderQty:[...qty]
          }
        }

        case ON_CHANGE_TEXT_ITEM_SELECT:
        {
          return {
            ...state,
            finalItem:action.payload
          }
        }

        case UPDATE_QTY:
        {
          return {
            ...state,
            finalQty:action.payload
          }
        }

    default:
      return state;
  }
};
