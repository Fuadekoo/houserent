import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import Footer from './Footer';
import contactImage from '../../images/contact.png'; // Adjust the path as necessary
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const {t} = useTranslation();
  const form = useRef();
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!form.current.name.value.trim()) {
      newErrors.name =t('guest.contact.Nameisrequired');
      isValid = false;
    }

    if (!form.current.email.value.trim()) {
      newErrors.email = t('guest.contact.Emailisrequired');
      isValid = false;
    }

    if (!form.current.project.value.trim()) {
      newErrors.project =  t('guest.contact.Projectdescriptionisrequired');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // If the form is not valid, return early
    }

    emailjs.sendForm('service_36g3kls', 'template_sj4fw1ou', form.current, 'IsbUd4NMxkf57mu8p')
      .then((result) => {
        setSuccessMessage('Message sent successfully!');
        toast.success("Message sent successfully!");
        e.target.reset();
      }, (error) => {
        toast.error("Failed to send the message");
        console.log(error.text);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <section className="flex-grow py-16" id="contact">
        <h2 className="text-4xl font-bold text-center mb-4">{t('guest.contact.GetInTouch')}</h2>
        <span className="text-xl text-center block mb-8">{t('guest.contact.ContactMe')}</span>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">{t('guest.contact.TalkToMe')}</h3>

            <div className="space-y-4">
              

              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <div className="container mx-auto mt-8">
          <img src={contactImage} alt="Contact" className="w-full h-auto rounded-lg shadow-md" />
        </div>
                <i className="bx bx-phone text-2xl text-blue-500"></i>
                <h3 className="text-xl font-semibold mt-2">{t('guest.contact.PhoneNumber')}</h3>
                <span className="text-gray-600">+251-911223344</span>
                <a href="tel:+251910737199" className="text-blue-500 hover:underline mt-2 block">
                  {t('guest.contact.CallToOrganization')}
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">{t('guest.contact.WriteMeYouridea')}</h3>

            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                  {t('guest.contact.Name')}
                </label>
                <input
                  type="text"
                  name="from_name"
                  id="name"
                  className={`mt-1 block w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder={t('guest.contact.InsertyourName')}
                />
                {errors.name && <span className="text-red-500">{errors.name}</span>}
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                  {t('guest.contact.Email')}
                </label>
                <input
                  type="email"
                  name="from_email"
                  id="email"
                  className={`mt-1 block w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder={t('guest.contact.Insertyouremail')}
                />
                {errors.email && <span className="text-red-500">{errors.email}</span>}
              </div>
              <div>
                <label htmlFor="project" className="block text-lg font-medium text-gray-700">
                  {t('guest.contact.Project')}
                </label>
                <textarea
                   name="message" 
                  id="project"
                  className={`mt-1 block w-full p-2 border rounded-md ${errors.project ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder={t('guest.contact.Writeyourproject')}
                ></textarea>
                {errors.project && <span className="text-red-500">{errors.project}</span>}
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                {t('guest.contact.SendMessage')}
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
        
      </section>
      <Footer />
    </div>
  );
};

export default Contact;