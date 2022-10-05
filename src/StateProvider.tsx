import React, { createContext, useContext, useReducer, Dispatch } from "react";
/**
 * ContextAPI with TS
 * https://react.vlpt.us/using-typescript/04-ts-context.html
 */

export type State = {
  basket: any[];
  user:any;
};
export type Action = 
{ type: "ADD_TO_BASKET"; item: any }|
{type:"REMOVE_FROM_BASKET"; id:number}|
{type:"SET_USER";user:any}|
{type:"CLEAN_BASKET";}

type BDispatch = Dispatch<Action>;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REMOVE_FROM_BASKET":
      
        const index =state.basket.findIndex((basketitem ? )=>
            basketitem.id ===action.id
        );
        let newbasket =[...state.basket];
        if(index>=0){
            newbasket.splice(index,1);
        }else{
            console.warn(
                'id'+action.id + 'not exist'
            )
        }
        
        return{
            ...state,
            basket :newbasket
        };
    case "SET_USER":

      return{
        ...state,
        user: action.user
      };

    case "CLEAN_BASKET":
      return{
        ...state,
        basket:[]
      }
      

    default:
      return state;
  }
};

export const DispatchContext = createContext<BDispatch | null>(null);
export const StateContext = createContext<State | null>(null);
export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    basket: [],
    user:"",
  });
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const getTotalprice = (basket: any) => {
  const Pricevalue = basket?.reduce(
    (amount: any, item: any) => amount + item.price,
    0
  );
  return Pricevalue;
};

export const useStateValue = () => {
  const state = useContext(StateContext);
  if (!state) throw new Error("Cannot find ");
  return state;
};

/**
 * custom hook dispatcher - state 값 setter
 * null check 필요
 */
export const useDispatchValue = () => {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) throw new Error("Cannot find ");
  return dispatch;
};
