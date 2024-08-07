import React from 'react'

const ErrorPage = ({error}) => {
 
  return (
    <div>
      <div className="w-full h-screen">
        <div className="h-full text-center container d-flex flex-column justify-content-center align-items-center">
          <div>
            <h1 className="display-1 text-bold">{error?.status}</h1>
            <p className="display-4 text-bold ">{error?.data?.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage