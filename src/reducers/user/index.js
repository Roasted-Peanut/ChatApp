import * as Types from '../../actionTypes';

const initialState  = {
  isLoggedIn: false,
  isIntroScreenWatched: false,
  authData: null,
  status: null,
};

export default user = (state = initialState, action) => {
  switch (action.type) {
    case Types.APPINTRO:
      return {...state, isIntroScreenWatched: true};
    case Types.LOGIN:
      return {...state, isLoggedIn: true, authData: action.myid, status:action.status};
    case Types.LOGOUT:
      return {...state, isLoggedIn: false, authData: null};
    default:
      return state;
  }
};
