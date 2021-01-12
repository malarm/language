import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import PageHeader from '../../components/pageHeader';
import SearchCard from '../../components/searchCard';
import SearchList from '../../components/searchList';
import db from '../../db';

export default ({ userData }) => {
  const { users } = userData;
  const [searchText, setSearchText] = useState('');
  return (
    <Layout>
      <div className="mt-10 flex justify-end">
        <input
          className="col-span-2 rounded-md w-1/3 border-2 border-gray-300 py-2 px-3 text-gray-darkest"
          type="text"
          name="search"
          placeholder="Search"
          value={searchText}
          onChange={(evt) => setSearchText(evt.target.value)}
        />
      </div>

      <SearchList userData={userData} searchText={searchText} />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  const currPage = query.page || 1;
  const itemsPerPage = 8;
  const totalCount = await db.instance.one('select count(1) from user_profile where residant=$1', [query.type]);
  const users = await db.instance.any('select id,full_name,email,gender,residant,native,profile_image,address,about,interest,contact_mode from user_profile where residant=$1 order by created_date desc limit $2 offset $3', [query.type, itemsPerPage, (currPage - 1) * itemsPerPage]);
  const userData = {
    users,
    currPage,
    maxPage: Math.ceil(totalCount?.count / itemsPerPage),
  };
  return {
    props: { userData },
  };
};
