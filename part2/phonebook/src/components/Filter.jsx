const Filter = ({ handleSearch, search }) => (
    <>
      <div>
        filter shown with <input value={search} onChange={handleSearch} />
      </div>
    </>
  );

export default Filter;