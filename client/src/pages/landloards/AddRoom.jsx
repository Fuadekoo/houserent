import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';

function AddRoom() {
  const [formData, setFormData] = useState({
    image: [], // Change to an array to handle multiple images
    address: '',
    floorLevel: '',
    houseNumber: '',
    housecategory: '',
    description: '',
    rentPerMonth: ''
  });

  const [image, setImage] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle file input for multiple images and convert to base64
  const convertToBase64 = (e) => {
    const files = e.target.files;
    const promises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      const promise = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);
      promises.push(promise);
    }

    Promise.all(promises)
      .then((base64Images) => {
        setImage(base64Images); // Set preview image state
        setFormData({
          ...formData,
          image: base64Images // Add base64 images to formData
        });
      })
      .catch((error) => {
        console.error('Error converting images:', error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form Data:', formData); // Log the form data
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const response = await axios.post('http://localhost:5000/api/property/addRoom', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(response.data);
      swal.fire({
        icon: 'success',
        title: 'Room added successfully!',
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error) {
      // console.error(error);
      swal.fire({
        icon: 'error',
        title: 'Failed to add room.',
        text: error.response?.data?.message || 'An error occurred',
        timer: 3000,
      });

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Room</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Images</label>
            <input
              type="file" 
              multiple 
              accept="image/*" 
              onChange={convertToBase64}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {/* Preview selected images */}
            <div className="mt-2">
              {image.map((img, index) => (
                <img key={index} src={img} alt={`preview-${index}`} width={100} />
              ))}
            </div>
          </div>


          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123 Main St, Cityville"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Floor Level</label>
            <input
              type="text"
              name="floorLevel"
              value={formData.floorLevel}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="2nd Floor"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">House Number</label>
            <input
              type="text"
              name="houseNumber"
              value={formData.houseNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="A-101"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">House Category</label>
            <select
              name="housecategory"
              value={formData.housecategory}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              <option value="Apartama">Apartama</option>
              <option value="Villa">Villa</option>
              <option value="Condominium">Condominium</option>
              <option value="compound_house">Compound House</option>
              <option value="single_house">Single House</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Rent Per Month</label>
            <input
              type="number"
              name="rentPerMonth"
              value={formData.rentPerMonth}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Room
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRoom;
