import React from 'react'

const ReadMore = ({toggle}) => {
  return (
    <div className=" d-flex justify-content-end sticky-bottom align-self-end mb-5 mr-2">
        <button type="button" className="btn btn-link font-weight-bold" onClick={toggle}>
        <strong>Read More</strong>
        </button> 
    </div>
  )
}

export default ReadMore