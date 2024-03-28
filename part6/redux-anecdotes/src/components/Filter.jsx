// Filter.jsx
import { useDispatch } from "react-redux";
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch(); 

    const handleChange = (event) => {
      // input-field value is in variable event.target.value
      const content = event.target.value;
      console.log(content);
      dispatch(filterChange(content));
    }

  
    return (
      <div>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter