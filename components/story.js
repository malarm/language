import React, { useState } from 'react';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Story = (props) => {
  const { title, content } = props;
  const [ expanded, setExpanded ] = useState(false);
  return (
    <div>
      <div>
        <div className="flex items-center gap-3">
          <FontAwesomeIcon icon={ expanded ? faCaretDown : faCaretRight } onClick={() => setExpanded(!expanded)} size="2x"/>
          <p className="font-bold text-black-400">{title}</p>
        </div>
        {
          expanded && <div className="px-10 pt-2">{content}</div>
        }
      </div>
    </div>
  )
}

export default Story;