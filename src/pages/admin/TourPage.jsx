import React, { useCallback, useEffect, useState } from 'react';
import { apiGetTours } from '../../apis/tour'; // Assuming there's an API function to fetch tours
import moment from 'moment';
import InputField from '../../components/InputField';
import useDebounce from '../../hooks/useDebounce';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';

const ToursPage = () => {
  const { handleSubmit, register, formState: { errors } } = useForm({
    status: ''
  });
  const [tours, setTours] = useState(null);
  const [queries, setQueries] = useState({
    q: ''
  });
  const [editTour, setEditTour] = useState(null);

  const fetchTours = async (params) => {
    const response = await apiGetTours(params);
    if (response.success) setTours(response.toursData);
  };

  // Fetch tours when the debounce time for the search query is reached
  const queriesDebounce = useDebounce(queries.q, 800);
  useEffect(() => {
    const params = {};
    if (queriesDebounce) params.q = queriesDebounce;
    fetchTours(params);
  }, [queriesDebounce]);

  const handleUpdate = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex justify-between m-5">
        <h1 className="text-2xl font-bold">Tour List</h1>
        <div className="flex">
          <InputField
            nameKey="q"
            value={queries.q}
            setValue={setQueries}
            placeholder="Search tour..."
            isHideLabel
          />
        </div>
      </div>
      <div>
        <div className="overflow-x-auto bg-white mx-2">
          <div className="flex justify-end py-4">
            {/* Add button or other actions */}
          </div>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tours?.map((tour, idx) => (
                  <tr key={tour._id}>
                    <td>{idx + 1}</td>
                    <td>{tour.name}</td>
                    <td>{tour.categoty}</td>
                    <td>{tour.price}</td>
                    <td>{tour.description}</td>
                    <td>{tour.thumb}</td>
                    <td>{moment(tour.createdAt).format('DD/MM/YYYY')}</td>

                    <td>
                      <span
                        onClick={() => setEditTour(tour)}
                        className="px-2 text-orange-600 hover:underline cursor-pointer"
                      >
                        Edit
                      </span>
                      <span className="px-2 text-orange-600 hover:underline cursor-pointer">
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
};

export default ToursPage;