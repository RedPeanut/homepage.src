
/* types */

// tools
export const SET_SEARCH_VAL = "SET_SEARCH_VAL";
export const GET_SEARCH_VAL = "GET_SEARCH_VAL";
export const SET_CATEGORY = "SET_CATEGORY";
export const GET_CATEGORY = "GET_CATEGORY";
export const SET_MODULE = "SET_MODULE";
export const GET_MODULE = "GET_MODULE";

// others
export const SET_SOME_VAL = "SET_SOME_VAL";
export const GET_SOME_VAL = "GET_SOME_VAL";

/* action creator */
export function setSearchVal(v) {
  return {
    type: SET_SEARCH_VAL,
    v: v
  }
}

export function setCategory(v) {
  return {
    type: SET_CATEGORY,
    v: v
  }
}

export function setModule(v) {
  return {
    type: SET_MODULE,
    v: v
  }
}

/* initial state */
export const initialState = {
  searchVal: "",
  category: "",
  module: ""
}

/* reducers */

// tools
export const tools = (state = initialState, action) => {
  switch(action.type) {
    case SET_SEARCH_VAL:
      return Object.assign({}, state, {
          searchVal: action.v
      });
    case GET_SEARCH_VAL:
      return state.searchVal;
    case SET_CATEGORY:
      return Object.assign({}, state, {
          category: action.v
      });
    case GET_CATEGORY:
      return state.category;
    case SET_MODULE:
      return Object.assign({}, state, {
        module: action.v
      });
    case GET_MODULE:
      return state.module;
    default:
      return state;
  }
}

// others
export const others = (state = {}, action) => {
  switch(action.type) {
    case SET_SOME_VAL:
      return Object.assign({}, state, {
        someVal: action.payload
      });
    case GET_SOME_VAL:
      return state.someVal;
    default:
      return state;
  }
}
