// Filter.jsx
import { useDispatch } from "react-redux";
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch(); 

    const handleChange = (event) => {
      const content = event.target.value;
    //   console.log(content);
      dispatch(filterChange(content));
    }

  
    return (
      <div id="anecdote-filter-component">
        FILTER: <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter