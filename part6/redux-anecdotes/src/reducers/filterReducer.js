// todo
const initialState = "";

const filterReducer = (state = initialState, action) => {
  // todo
  console.log(action);
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
};

// todo, action creator
export const filterChange = (filter) => {
    return {
      type: 'SET_FILTER',
      filter,
    }
}

export default filterReducer;
