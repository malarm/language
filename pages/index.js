import Layout from '../components/layout';
import PageHeader from '../components/pageHeader';
import Testimonal from '../components/testimonal';
import Story from '../components/story';

const dummyTestimonals = [
  {
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla tempus rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque arcu metus, imperdiet vel justo sit amet.      ',
    user: 'Malar',
    role: 'Developer',
  },
  {
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla tempus rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque arcu metus, imperdiet vel justo sit amet.      ',
    user: 'Ruban',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const dummyStories = [
  {
    title: 'Story 1 about app',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla tempus rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque arcu metus, imperdiet vel justo sit amet.      ',
  },
  {
    title: 'Story 2 about app',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla tempus rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque arcu metus, imperdiet vel justo sit amet.      ',
  },
];

export default () => (
  <Layout>
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-10 py-10">
        <div>
          <img src="https://media.istockphoto.com/photos/group-portrait-of-a-creative-business-team-standing-outdoors-three-picture-id1146473249?k=6&m=1146473249&s=612x612&w=0&h=W1xeAt6XW3evkprjdS4mKWWtmCVjYJnmp-LHvQstitU=" alt="people" />
        </div>
        <div className="col-span-2 self-center">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla tempus rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque arcu metus, imperdiet vel justo sit amet.
          </p>
        </div>
      </div>
      <div className="px-10 pt-5 pb-10 shadow rounded bg-white  min-h-10v">
        <PageHeader title="Guidelines to use this app" className="text-center" />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla tempus rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque arcu metus, imperdiet vel justo sit amet.      </p>
      </div>
      <div className="px-10 pt-5 pb-10 shadow rounded bg-white  min-h-10v ">
        <PageHeader title="Testimonals" className="text-center" />
        <div className="space-y-10">
          { dummyTestimonals.map((testimonal) => <Testimonal details={testimonal} />)}
        </div>
      </div>
      <div className="px-10 pt-5 pb-10 shadow rounded bg-white  min-h-10v ">
        <PageHeader title="Stories" className="text-center" />
        <div className="space-y-10">
          { dummyStories.map((story, index) => <Story key={index} title={story.title} content={story.content} />)}
        </div>
      </div>
    </div>
  </Layout>
);
