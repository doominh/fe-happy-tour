import React from 'react'

const CommentPage = () => {
  return (
    <>
    <div className="flex justify-between m-5">
        <h1 className="text-2xl font-bold">Manage comments</h1>
        
        <div className="flex">
          <label className="input input-bordered flex items-center gap-2 rounded-full w-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <input type="text" className="grow" placeholder="Search" />
          </label>
          <button
            className="btn btn-success text-white ml-10"
          >
            <span className="text-3xl leading-[47px]">+</span> Create
          </button>
        </div>
      </div>
    <div>
      <div className="overflow-x-auto bg-white mx-2">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>People</th>
              <th>Total price</th>
              <th>Payment</th>
              <th>Day create</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>id</th>
              <td>5</td>
              <td>5000</td>
              <td>payment</td>
              <td>10/10/239</td>
              <td>active</td>
              <td>
                <button className="btn btn-xs">
                  xóa
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </>
  )
}

export default CommentPage
