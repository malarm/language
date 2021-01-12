import React from 'react';
import Router, { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function ProfileForm() {
  const {
    register, handleSubmit, errors, formState, reset,
  } = useForm({
    reValidateMode: 'onBlur',
  });

  const router = useRouter();
  const { addToast } = useToasts();

  const onSubmit = async (data) => {
    const reqBody = { ...data };
    if (data.profileImage?.length > 0) {
      reqBody.avatarImage = await getBase64(data.profileImage[0]);
    }
    // console.log(reqBody);
    const response = await fetch('/api/profiles', {
      method: 'POST',
      body: JSON.stringify(reqBody),
    });
    const resJson = await response.json();
    if (response.status == 201) {
      addToast(resJson.message, { appearance: 'success' });
      reset({});
      router.push(`/search/${reqBody.residant}`);
    } else {
      addToast(resJson.message, { appearance: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-rows gap-6">
        <div className="grid grid-cols-3 gap-4 items-center">
          <label className="font-semibold">Full Name*</label>
          <div className="grid grid-rows gap-3 col-span-2 align-self-end">
            <input className=" rounded-md border-2 border-gray-300 py-2 px-3 text-gray-darkest" type="text" name="name" ref={register({ required: true })} />
            { errors.name && <span className="text-sm text-red-600"> Name is Required </span> }
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 items-center">
          <label className="font-semibold">Email*</label>
          <div className="grid grid-rows gap-3 col-span-2 align-self-end">
            <input className="col-span-2 rounded-md border-2 border-gray-300 focus:border-indigo-300 py-2 px-3 text-gray-darkest" type="text" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
            { errors.email && <span className="text-sm text-red-600"> Email is Required </span> }
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 items-center">
          <label className="font-semibold">Gender*</label>
          <div className="grid grid-rows gap-3 col-span-2 align-self-end">
            <div className="flex gap-4">
              <div className="space-x-2">
                <input name="gender" type="radio" value="Male" ref={register({ required: true })} />
                <label className="font-semibold">Male</label>
              </div>
              <div className="space-x-2">
                <input name="gender" type="radio" value="Female" ref={register({ required: true })} />
                <label className="font-semibold">Female</label>
              </div>
            </div>
            { errors.gender && <span className="text-sm text-red-600"> Gender is Required </span> }
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 items-center">
          <label className="font-semibold">I am*</label>
          <div className="grid grid-rows gap-3 col-span-2 align-self-end">
            <div className="flex gap-4">
              <div className="space-x-2">
                <input name="residant" type="radio" value="Immigrant" ref={register({ required: true })} />
                <label className="font-semibold">Immigrant</label>
              </div>
              <div className="space-x-2">
                <input name="residant" type="radio" value="Danish" ref={register({ required: true })} />
                <label className="font-semibold">Danish</label>
              </div>
            </div>
            { errors.residant && <span className="text-sm text-red-600"> Residant Type is Required </span> }
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 items-center">
          <label className="font-semibold">Photo</label>
          <div className="grid grid-rows gap-3 col-span-2 align-self-end">
            <input className="col-span-2 py-2 px-3" type="file" name="profileImage" ref={register} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 items-center">
          <label className="font-semibold">Home Country*</label>
          <div className="grid grid-rows gap-3 col-span-2 align-self-end">
            <input className="col-span-2 rounded-md border-2 border-gray-300 focus:border-indigo-300 py-2 px-3 text-gray-darkest" type="text" name="native" ref={register({ required: true, maxLength: 80 })} />
            { errors.native && <span className="text-sm text-red-600"> Home Country is Required </span> }
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 items-center">
          <label className="font-semibold">Address</label>
          <textarea className="col-span-2 rounded-md border-2 border-gray-300 focus:border-indigo-300 py-2 px-3 text-gray-darkest" name="address" ref={register({ maxLength: 250 })} />
        </div>
        <div className="grid grid-cols-3 gap-4 items-center">
          <label className="font-semibold">About Me</label>
          <textarea className="col-span-2 rounded-md border-2 border-gray-300 focus:border-indigo-300 py-2 px-3 text-gray-darkest" name="about" ref={register({ maxLength: 250 })} />
        </div>
        <div className="grid grid-cols-3 gap-4 items-center">
          <label className="font-semibold">I Want to Meet</label>
          <textarea className="col-span-2 rounded-md border-2 border-gray-300 focus:border-indigo-300 py-2 px-3 text-gray-darkest" name="interest" ref={register({ maxLength: 250 })} />
        </div>
        <div className="grid grid-cols-3 gap-4 items-center">
          <label className="font-semibold">Mode of Contact</label>
          <textarea className="col-span-2 rounded-md border-2 border-gray-300 focus:border-indigo-300 py-2 px-3 text-gray-darkest" name="contactMode" ref={register({ maxLength: 250 })} />
        </div>
        <div className="grid grid-cols-3 gap-4 items-center">
          <button type="submit" className="col-start-2 text-base font-semibold rounded py-2 px-5 bg-indigo-600 text-white inline-flex items-center justify-center">
            { formState.isSubmitting

            && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            )}

            <span>Submit</span>
          </button>
        </div>
      </div>

    </form>
  );
}
