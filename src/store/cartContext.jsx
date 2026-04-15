import { createContext, useReducer } from "react";

export const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    increaseQuantity: (id) => {},
    decreaseQuantity: (id) => {},
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
       const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
       const updatedItems = [...state.items];
       
       if (existingItemIndex > -1) {
          const existingItem = state.items[existingItemIndex];
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + 1
          };
          updatedItems[existingItemIndex] = updatedItem;
       } else {
          updatedItems.push({...action.item, quantity: 1});
       }
       
       const totalAmount = updatedItems.reduce(
         (total, item) => total + item.price * item.quantity,
         0
       );
       
       return {...state, items: updatedItems, totalAmount};
    }
    
    if (action.type === 'REMOVE_ITEM') {
       const updatedItems = state.items.filter(item => item.id !== action.id);
       const totalAmount = updatedItems.reduce(
         (total, item) => total + item.price * item.quantity,
         0
       );
       return {...state, items: updatedItems, totalAmount};
    }
    
    if (action.type === 'INCREASE_QUANTITY') {
       const existingItemIndex = state.items.findIndex(item => item.id === action.id);
       const updatedItems = [...state.items];
       
       if (existingItemIndex > -1) {
          const existingItem = state.items[existingItemIndex];
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + 1
          };
          updatedItems[existingItemIndex] = updatedItem;
          
          const totalAmount = updatedItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          
          return {...state, items: updatedItems, totalAmount};
       }
    }
    
    if (action.type === 'DECREASE_QUANTITY') {
       const existingItemIndex = state.items.findIndex(item => item.id === action.id);
       const updatedItems = [...state.items];
       
       if (existingItemIndex > -1) {
          const existingItem = state.items[existingItemIndex];
          
          if (existingItem.quantity > 1) {
             const updatedItem = {
               ...existingItem,
               quantity: existingItem.quantity - 1
             };
             updatedItems[existingItemIndex] = updatedItem;
             
             const totalAmount = updatedItems.reduce(
               (total, item) => total + item.price * item.quantity,
               0
             );
             
             return {...state, items: updatedItems, totalAmount};
          }
       }
    }
    
    return state;
}

function CartContextProvider({children}) {
    const [cartState, dispatch] = useReducer(cartReducer, {items: [], totalAmount: 0});
    
    function addItem(item) {
        dispatch({ type: 'ADD_ITEM', item });
    }
    
    function removeItem(id) {
        dispatch({ type: 'REMOVE_ITEM', id });
    }
    
    function increaseQuantity(id) {
        dispatch({ type: 'INCREASE_QUANTITY', id });
    }
    
    function decreaseQuantity(id) {
        dispatch({ type: 'DECREASE_QUANTITY', id });
    }
    
    const contextValue = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity
    };
    console.log(contextValue);
    
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}
export default CartContextProvider;