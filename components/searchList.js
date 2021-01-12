import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import SearchCard from './searchCard';
import userPrevious from '../utils/usePrevious';
import usePrevious from '../utils/usePrevious';

const SearchList = ({ userData, searchText }) => {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  const prevUsers = usePrevious({ users: userData.users });

  // Set users from userData
  useEffect(() => {
    if (userData) {
      if (userData.error) {
        // Handle error
      } else if (userData.currPage == 1) {
        setUsers(userData.users);
      } else if (prevUsers?.users) {
        setUsers([...prevUsers.users, ...userData.users]);
      } else {
        setUsers(userData.users);
      }
    }
  }, [userData]);

  // Router event handler
  useEffect(() => {
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);
    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', stopLoading);
    };
  }, []);

  const handleScroll = (e) => {
    // To get page offset of last user
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      if (userData.currPage < userData.maxPage && !loading) {
        // Trigger fetch
        const { query } = router;
        query.page = parseInt(userData.currPage) + 1;
        router.push({
          pathname: router.pathname,
          query,
        });
      }
    }
  };

  const tmpUsers = users?.filter((user) => user?.fullName?.toLowerCase().includes(searchText.toLowerCase()) || user?.residant?.toLowerCase().includes(searchText.toLowerCase())
  || user?.native?.toLowerCase().includes(searchText.toLowerCase()) || user?.email?.toLowerCase().includes(searchText.toLowerCase()) || user?.gender?.toLowerCase().includes(searchText.toLowerCase())
  || user?.residant?.toLowerCase().includes(searchText.toLowerCase()) || user?.address?.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <>
      <div className="p-10 mt-5 shadow rounded bg-white h-70v max-w-2xl mx-auto overflow-auto" onScroll={handleScroll}>
        <div className="grid grid-cols divide-y-2 divide-gray-200 gap-2 px-15 mx-auto justify-items-center ">

          {tmpUsers.length > 0
          && tmpUsers.map((user, i) => (
            <SearchCard key={user.id} user={user.fullName} role={user.residant} native={user.native} id={user.id} profileImage={user.profileImage} />
          ))}

          {/* {loading && <h1>Loading ...</h1>} */}

        </div>
      </div>
    </>
  );
};
export default SearchList;
