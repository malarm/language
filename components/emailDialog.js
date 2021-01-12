import React from 'react';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import PageHeader from './pageHeader';

const EmailDialog = (props) => {
  const { handleClose, userProfile } = props;
  const {
    register, handleSubmit, errors, formState, reset,
  } = useForm({
    reValidateMode: 'onBlur',
  });

  const { addToast } = useToasts();

  const onSubmit = async (data) => {
    const reqBody = {};
    reqBody.recepientEmail = userProfile.email;
    reqBody.senderEmail = data.email;
    reqBody.recepientName = userProfile.fullName;
    reqBody.senderName = data.name;
    reqBody.message = data.message;

    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      body: JSON.stringify(reqBody),
    });
    const resJson = await response.json();
    // console.log(resJson);
    if (response.status == 200) {
      addToast(resJson.message, { appearance: 'success' });
      handleClose();
    } else {
      addToast(resJson.message, { appearance: 'error' });
    }
  };
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-400 bg-opacity-50 flex">
      <div className="relative p-8 bg-white w-full max-w-2xl m-auto flex-col flex rounded-lg">
        <PageHeader title="Write To Me" className="text-center" />

        <span className="absolute top-0 right-0 p-4">
          <FontAwesomeIcon icon={faWindowClose} onClick={handleClose} size="1x" className="text-indigo-500" />
        </span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-rows gap-6">
            <div className="grid grid-cols justify-center font-semibold text-gray-600">
              I love to get e-mails. Send me your regards and tell me what can i do for you!!
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <label className="font-semibold text-gray-500">Name*</label>
              <div className="grid grid-rows gap-3 col-span-3 align-self-end">
                <input className=" rounded-md border-2 border-gray-300 py-2 px-3 text-gray-darkest" type="text" name="name" ref={register({ required: true })} />
                { errors.name && <span className="text-sm text-red-600"> Name is Required </span> }
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <label className="font-semibold text-gray-500">Email*</label>
              <div className="grid grid-rows gap-3 col-span-3 align-self-end">
                <input className="col-span-3 rounded-md border-2 border-gray-300 focus:border-indigo-300 py-2 px-3 text-gray-darkest" type="text" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
                { errors.email && <span className="text-sm text-red-600"> Email is Required </span> }
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <label className="font-semibold text-gray-500">Message*</label>
              <div className="grid grid-rows gap-3 col-span-3 align-self-end">
                <textarea className="col-span-3 rounded-md border-2 border-gray-300 focus:border-indigo-300 py-2 px-3 h-52 text-gray-darkest" name="message" ref={register({ required: true, maxLength: 1000 })} />
                { errors.message && <span className="text-sm text-red-600"> Message is Required </span> }
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">

              <button type="submit" className="col-start-4 text-sm font-semibold rounded py-2 px-5 bg-indigo-600 text-white inline-flex items-center justify-center">
                { formState.isSubmitting

            && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            )}

                <span>Send</span>
              </button>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default EmailDialog;
