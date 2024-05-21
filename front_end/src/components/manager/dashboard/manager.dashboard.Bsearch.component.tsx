export default function ManagerDashboardBsearchComponent() {
  const mystyle = {
    width: "800px",
    height: "800px",
  };
  return (
    <div className=' w-full flex justify-left items-center h-14 bg-gray-100 '>
      <div className='bg-white rounded flex items-center w-full max-w-xl mr-40 p-2  shadow-sm border border-gray-200'>
        <input
          type='search'
          name=''
          id=''
          placeholder='Search'
          className='w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent'
        />
        <button className='outline-none focus:outline-none'>
          <i className='fas fa-search'></i>
        </button>
      </div>
    </div>
  );
}
