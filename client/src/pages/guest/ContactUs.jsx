import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contactus.css';

export const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_36g3kls', 'template_sj4fw1ou', form.current, 'IsbUd4NMxkf57mu8p')
            .then((result) => {
                toast.success("The message is sent successfully");
                console.log(result.text);
            }, (error) => {
                toast.error("Failed to send the message");
                console.log(error.text);
            });
    };

    return (
            <div className="w-screen h-screen flex">
                <form className="m-auto flex flex-col text-left border-2 border-black shadow-[10px_10px_0_rgba(0,0,0,0.3)] rounded-2xl p-8 transition-all duration-200 ease-in" ref={form} onSubmit={sendEmail}>
                    <ToastContainer autoClose={4000} />
                    <div className="flex flex-col gap-1 mb-2">
                        <label>Name</label>
                        <input type="text" name="from_name" className="p-2 rounded-lg border-2 border-black" />
                    </div>
                    <div className="flex flex-col gap-1 mb-2">
                        <label>Email</label>
                        <input type="email" name="from_email" className="p-2 rounded-lg border-2 border-black" />
                    </div>
                    <div className="flex flex-col gap-1 mb-2">
                        <label>Message</label>
                        <textarea rows="8" cols="30" name="message" className="p-2 rounded-lg border-2 border-black resize-none" />
                    </div>
                    <input type="submit" value="Send" className="w-24 p-2 ml-auto rounded-lg font-semibold border-2 border-black shadow-[5px_5px_0_rgba(0,0,0,0.3)] transition-all duration-200 ease-in hover:cursor-pointer hover:shadow-[5px_5px_0_rgba(0,0,0,0.3)] hover:translate-x-[-5px] hover:translate-y-[-5px]" />
                </form>
            </div>
        
    );
};
