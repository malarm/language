import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../../components/layout';
import EmailDialog from '../../components/emailDialog';
import db from '../../db';

const ViewProfile = ({ userProfile }) => {
  const avatarUrl = userProfile.profileImage ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  return (
    <Layout>
      {
        openEmailDialog && (
          <EmailDialog handleClose={() => setOpenEmailDialog(false)} userProfile={userProfile} />
        )
      }
      <div className="p-10 mt-5 shadow rounded bg-white min-h-70v max-w-3xl mx-auto">
        <div className="text-gray-700 space-y-5 ">
          <div className="grid grid-rows gap-10">
            <div className="grid grid-cols-6 gap-4">
              <img className="inline-block h-12 w-12 md:h-20 md:w-20 rounded-full ring-2 ring-white" src={avatarUrl} alt="" />
              <div className="col-span-5">
                <div className="flex flex-row space-x-2">
                  <span className="text-xl font-bold">
                    {userProfile.fullName}
                  </span>
                </div>
                <div>
                  <span className="text-md font-semibold">
                    {`${userProfile.gender}, ${userProfile.email}`}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-semibold">
                    {`${userProfile.residant} - ${userProfile.native}`}
                  </span>
                </div>
              </div>

            </div>

            <div className="grid grid-cols-6 ">
              <label className="text-l font-bold col-span-2">Address</label>
              <div className="text-base font-semibold text-gray-500  break-words col-span-4">
                {userProfile.address}
              </div>
            </div>
            <div className="grid grid-cols-6 ">
              <label className="text-l font-bold col-span-2">About Me</label>
              <div className="text-base font-semibold  text-gray-500 break-words col-span-4">
                {userProfile.about}
              </div>
            </div>
            <div className="grid grid-cols-6 gap-none">
              <label className="text-l font-bold col-span-2">I want to meet</label>
              <div className="text-base font-semibold text-gray-500 break-words col-span-4">
                {userProfile.interest}
              </div>
            </div>
            <div className="grid grid-cols-6 gap-none">
              <label className="text-l font-bold col-span-2">Mode of Contact</label>
              <div className="text-base font-semibold text-gray-500  break-words col-span-4">
                {userProfile.contactMode}
              </div>
            </div>
            <div className="grid grid-cols-6 gap-none pt-10">
              <div className="flex flex-row space-x-2 col-start-5 cursor-pointer" onClick={() => setOpenEmailDialog(true)}>
                <label className="text-md font-bold text-indigo-500">
                  Write to me
                </label>
                <FontAwesomeIcon icon={faEnvelope} size="1x" className="text-indigo-500 mt-1 mx-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  const userProfile = await db.instance.one('select id,full_name,email,gender,residant,native,profile_image,address,about,interest,contact_mode from user_profile where id=$1', [query.id]);
  return {
    props: {
      userProfile,
    },
  };
};

export default ViewProfile;
