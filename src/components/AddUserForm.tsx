import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../lib/redux/userSlice";
import { generateUniqueId } from "../utils/generateRandomId";

interface FormData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
  profilePhoto: string;
}

const AddUserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    id: generateUniqueId(),
    name: "",
    email: "",
    role: "User",
    status: true,
    profilePhoto: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      convertToBase64(file);
    }
  };

  // Helper function to convert file to base64
  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevState) => ({
        ...prevState,
        profilePhoto: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleStatusToggle = () => {
    setFormData((prevState) => ({
      ...prevState,
      status: !prevState.status,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.profilePhoto) {
      newErrors.profilePhoto = "Profile photo is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);

      // Handle the form submission, e.g., sending the data to the state manager.

      setIsSubmitting(false);
      dispatch(addUser(formData));
      alert("User added successfully!");
      setFormData({
        id: generateUniqueId(),
        name: "",
        email: "",
        role: "User",
        status: true,
        profilePhoto: "",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="role" className="block text-gray-700">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-gray-700">
            Status
          </label>
          <div className="flex items-center">
            <span className="mr-2">
              {formData.status ? "Active" : "Inactive"}
            </span>
            <button
              type="button"
              onClick={handleStatusToggle}
              className={`px-4 py-2 rounded-lg ${
                formData.status ? "bg-green-500" : "bg-gray-400"
              } text-white`}
            >
              Toggle Status
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="profilePhoto" className="block text-gray-700">
            Profile Photo
          </label>
          <input
            type="file"
            id="profilePhoto"
            name="profilePhoto"
            accept="image/jpeg, image/png, image/gif"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          {errors.profilePhoto && (
            <p className="text-red-500 text-sm">{errors.profilePhoto}</p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
