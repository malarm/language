import React from 'react';

const defaultStyle = "font-bold leading-normal text-xl my-4";
const PageHeader = (props) => <h4 className={ props.className ? `${defaultStyle} ${props.className}`: defaultStyle } >{props.title}</h4>

export default PageHeader;