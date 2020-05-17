
import {
  SELECTED_MURCHANT,
  GET_NEARBY_SUCCESS,
  ON_ADD_ITEMS,
  ON_SELECTED_ITEM,
  ON_CHANGE_TEXT_ITEM_SELECT,
  UPDATE_QTY,
  UPDATE_ORDER_ADDRESS,
  ON_PLACE_ORDER,
  GET_ORDER_SUCCESS,
  ON_SELECTED_ITEM_REMOVE
} from '../actions/order';



const initialState = {
  murchantList:[],
  selectedMurchant:"",
  isModalItem:false,
  finalItem:"",
  finalQty:"",
  orderItem:[],
  orderQty:[],
  orderAddress:"",
  isModalAddres:false
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
            isModalItem:true,
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
            orderQty:[...qty],
            finalQty:""
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

        case UPDATE_ORDER_ADDRESS:
        {
          return {
            ...state,
            orderAddress:action.payload
          }
        }

        case ON_PLACE_ORDER:
        {
          return {
            ...state,
            isModalAddres:true
          }
        }

        case GET_ORDER_SUCCESS:
        {
          return {
            ...state,
            murchantList:[],
            selectedMurchant:"",
            isModalItem:false,
            finalItem:"",
            finalQty:"",
            orderItem:[],
            orderQty:[],
            orderAddress:"",
            isModalAddres:false
          }
        }
        
        case ON_SELECTED_ITEM_REMOVE:
        {
          var itemsOr = state.orderItem
            itemsOr.splice(action.payload, 1)

          var QtyOr = state.orderQty
          QtyOr.splice(action.payload,1)
          return {
            ...state,
            orderItem:[...itemsOr],
            orderQty:[...QtyOr]

          }
        }

    default:
      return state;
  }
};
