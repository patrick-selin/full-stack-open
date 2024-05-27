const SearchBar = ({ value, onChange }) => (
  <div>
    <p>find countries</p>
    <input
      value={value}
      onChange={onChange}
    />
  </div>
);

export default SearchBar;