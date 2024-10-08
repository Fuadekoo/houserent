import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

function AddRoom() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    image: [],
    address: '',
    floorLevel: '',
    houseNumber: '',
    housecategory: '',
    description: '',
    rentPerMonth: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
  });

  const [image, setImage] = useState([]);

   const [position, setPosition] = useState({ latitude: null, longitude: null });
  const zoom = 16; // 15 is ideal

// useEffect for the location of the current user to add the room
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  const latitudeValue = position.latitude;
  const longitudeValue = position.longitude;

  const [step, setStep] = useState(1);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
        setImage(base64Images);
        setFormData({
          ...formData,
          image: base64Images ,// Add base64 images to formData
          RoomLocation:{latitudeValue ,longitudeValue}
        });
      })
      .catch((error) => {
        console.error('Error converting images:', error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/property/addRoom', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      swal.fire({
        icon: 'success',
        title: 'Room added successfully!',
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Failed to add room.',
        text: error.response?.data?.message || 'An error occurred',
        timer: 3000,
      });
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen mb-2 bg-gray-100 flex items-center justify-center">
      <div className="bg-white mt-1 p-3 rounded-lg shadow-lg w-full max-w-md" style={{ width: '80%', height: 'fit-content', marginTop: '0' }}>
        <h2 className="text-2xl font-bold mb-2 text-center">{t('landloard.addroom.add')}</h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="mb-2">
                <label className="block text-gray-700">{t('landloard.addroom.image')}</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={convertToBase64}
                  className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="mt-1">
                  {image.map((img, index) => (
                    <img key={index} src={img} alt={`preview-${index}`} width={100} />
                  ))}
                </div>
              </div>
              <div className="mb-1">
                <label className="block text-gray-700">{t('landloard.addroom.address')}</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123 Main St, Cityville"
                  maxLength="50"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {t('landloard.addroom.next')}
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="mb-1">
                <label className="block text-gray-700">{t('landloard.addroom.floor')}</label>
                <input
                  type="text"
                  name="floorLevel"
                  value={formData.floorLevel}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="2nd Floor"
                  maxLength="50"
                  required
                />
              </div>
              <div className="mb-1">
                <label className="block text-gray-700">{t('landloard.addroom.house')}</label>
                <input
                  type="text"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="A-101"
                  maxLength="50"
                  required
                />
              </div>
              <div className="mb-1">
                <label className="block text-gray-700">{t('landloard.addroom.housecatagory')}</label>
                <select
                  name="housecategory"
                  value={formData.housecategory}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">{t('landloard.addroom.Select')}</option>
                  <option value="Apartama">{t('landloard.addroom.apartama')}</option>
                  <option value="Villa">{t('landloard.addroom.villa')}</option>
                  <option value="Condominium">{t('landloard.addroom.condo')}</option>
                  <option value="compound_house">{t('landloard.addroom.compound')}</option>
                  <option value="single_house">{t('landloard.addroom.single')}</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  {t('landloard.addroom.prev')}
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {t('landloard.addroom.next')}
                </button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="mb-1">
                <label className="block text-gray-700">{t('landloard.addroom.Description')}</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('landloard.addroom.Description')}
                  maxLength="100"
                  required
                />
              </div>
              <div className="mb-1">
                <label className="block text-gray-700">{t('landloard.addroom.rent')}</label>
                <input
                  type="number"
                  name="rentPerMonth"
                  value={formData.rentPerMonth}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1500"
                  required
                />
              </div>
              <div className="mb-1">
                <label className="block text-gray-700">{t('landloard.addroom.Bedrooms')}</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1"
                  min="1"
                  required
                />
              </div>
              <div className="mb-1">
                <label className="block text-gray-700">{t('landloard.addroom.Bathrooms')}</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1"
                  min="1"
                  required
                />
              </div>
              <div className="mb-1">
                <label className="block text-gray-700">{t('landloard.addroom.Parking')}</label>
                <input
                  type="checkbox"
                  name="parking"
                  checked={formData.parking}
                  onChange={(e) => setFormData({ ...formData, parking: e.target.checked })}
                  className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-500 text-white py-1 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  {t('landloard.addroom.prev')}
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {t('landloard.addroom.add')}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddRoom;
