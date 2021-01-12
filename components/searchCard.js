import React from 'react';
import Link from 'next/link';

const defaultAvatarUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';
const SearchCard = (props) => {
  const {
    user, role, native, profileImage, id,
  } = props;
  return (
    <div className="py-5 my-2 grid grid-cols-5 h-24 w-full">
      <img className="inline-block h-12 w-12 md:h-20 md:w-20 rounded-full ring-2 ring-white" src={profileImage || defaultAvatarUrl} alt="" />
      <div className="col-span-3 flex flex-col justify-center">
        <label className="text-l font-bold">{user}</label>
        <span className="text-base">{`${role}, ${native}`}</span>
      </div>
      <div>
        <Link href={`/profile/${id}`}>
          <a className="text-sm text-indigo-500 font-bold">View Profile</a>
        </Link>
      </div>
    </div>
  );
};

export default SearchCard;
