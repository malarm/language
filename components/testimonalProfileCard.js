import React from 'react';

const defaultAvatarUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';
const TestimonalProfileCard = (props) => {
  const { user, role, avatarUrl } = props;
  
  return (
    <div className="mt-2 flex justify-center space-x-10 items-center">
      <img className="inline-block h-20 w-20 rounded-full ring-2 ring-white" src={avatarUrl ? avatarUrl : defaultAvatarUrl} alt=""></img>        
      <div className="grid grid-rows-2">
        <h2 className="text-xl font-bold">{user}</h2>
        <h2 className="text-l font-bold text-gray-500">{role}</h2>
      </div>
    </div>
  )
}

export default TestimonalProfileCard;