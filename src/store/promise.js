function warn(error) {
  throw error;
}

export default () => {
  return dispatch => {
    return action => {
      if (typeof action.then === "function") {
        return action.then(dispatch, warn).catch(warn);
      }
      return dispatch(action);
    };
  };
};
