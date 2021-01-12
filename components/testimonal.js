import React from 'react';
import TestimonalProfileCard from './testimonalProfileCard';

const Testimonal = (props) => {
  const { details:testimonal } = props;
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-2 justify-start">
      <p>{testimonal.content}</p>
      </div>
      <div>              
        <TestimonalProfileCard user={testimonal.user} role={testimonal.role} avatarUrl={testimonal.avatar} />
      </div>
    </div>
  )
}

export default Testimonal;