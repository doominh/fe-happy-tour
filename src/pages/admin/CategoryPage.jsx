import React, { useEffect, useState } from 'react';
import { apiGetCategories, apiAddCategory, apiUpdateCategory, apiDeleteCategory } from '../../apis/app';
import InputField from '../../components/InputField';
import useDebounce from '../../hooks/useDebounce';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';

const CategoryPage = () => {
  const [user, setUser] = useState({});
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [categories, setCategories] = useState([]);
  const [queries, setQueries] = useState({ q: '' });
  const [editCategory, setEditCategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState(''); // State mới để lưu tên danh mục mới

  const fetchCategories = async (params) => {
    const response = await apiGetCategories(params);
    if (response.success) setCategories(response.tourCategories);
  };

  const queriesDebounce = useDebounce(queries.q, 800);

  useEffect(() => {
    const params = {};
    if (queriesDebounce) params.q = queriesDebounce;
    fetchCategories(params);
  }, [queriesDebounce]);

  useEffect(() => {
    let userTemp = JSON.parse(localStorage.getItem('persist:tour/user'));
    setUser(userTemp);
  }, [])

  // Handle editing a category
  const handleEdit = (category) => {
    setEditCategory(category);
    setEditName(category.name);
  };

  // Handle saving an edited category
  const handleSaveEdit = async () => {
    await apiUpdateCategory(editCategory._id, { name: editName }, user.token);
    const updatedCategories = categories.map(cat =>
      cat._id === editCategory._id ? { ...cat, name: editName } : cat
    );
    setCategories(updatedCategories);
    setEditCategory(null);
  };

  // Handle deleting a category
  const handleDelete = async (categoryId) => {
    await apiDeleteCategory(categoryId, user.token);
    setCategories(categories.filter(cat => cat._id !== categoryId));
  };

  // Handle adding a new category
  const handleAddCategory = async () => {
    const response = await apiAddCategory({ name: newCategoryName }, user.token);
    console.log(response);
    console.log(categories);
    // if (response.success) {
    setCategories([...categories, {
      "_id": Math.random(),
      "name": newCategoryName
    }]); // Thêm danh mục mới vào danh sách
    setNewCategoryName(''); // Xóa tên danh mục sau khi thêm
    // }
  };

  const handleUpdate = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex justify-between m-5">
        <h1 className="text-2xl font-bold">Category List</h1>
        <div className="flex">
          <InputField
            nameKey="q"
            value={queries.q}
            setValue={setQueries}
            placeholder="Search category..."
            isHideLabel
          />
        </div>
      </div>
      <div>
        <div className="overflow-x-auto bg-white mx-2">
          <div className="flex justify-between py-4">
            {/* Add button or other actions */}
            <div className="flex items-center">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="New category name"
                className="border p-1 mr-2"
              />
              <Button
                name="Add Category"
                handleOnClick={handleAddCategory}
                style="px-4 py-2 bg-blue-500 text-white rounded"
              />
            </div>
          </div>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, idx) => (
                  <tr key={category._id}>
                    <td>{idx + 1}</td>
                    <td>
                      {editCategory && editCategory._id === category._id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="border p-1"
                        />
                      ) : (
                        category.name
                      )}
                    </td>
                    <td>
                      {editCategory && editCategory._id === category._id ? (
                        <>
                          <span
                            onClick={handleSaveEdit}
                            className="px-2 text-green-600 hover:underline cursor-pointer"
                          >
                            Save
                          </span>
                          <span
                            onClick={() => setEditCategory(null)}
                            className="px-2 text-red-600 hover:underline cursor-pointer"
                          >
                            Cancel
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            onClick={() => handleEdit(category)}
                            className="px-2 text-orange-600 hover:underline cursor-pointer"
                          >
                            Edit
                          </span>
                          <span
                            onClick={() => handleDelete(category._id)}
                            className="px-2 text-orange-600 hover:underline cursor-pointer"
                          >
                            Delete
                          </span>
                        </>
                      )}
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

export default CategoryPage;
