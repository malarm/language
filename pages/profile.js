import Layout from '../components/layout';
import PageHeader from '../components/pageHeader';
import ProfileForm from '../components/profileForm';

const Profile = () => (
  <Layout>
    <PageHeader title="Submit Profile" className="text-center" />
    <div className="p-10 shadow rounded bg-white min-h-70v max-w-3xl mx-auto">
      <div className="text-gray-700 space-y-5">
        <ProfileForm />
      </div>
    </div>
  </Layout>
);

export default Profile;
