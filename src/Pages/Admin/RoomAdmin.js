import React from 'react'

const RoomAdmin = () => {
  return (
    <>
      <div className="flex justify-between items-center mx-auto w-10/12 py-4">
        <h2 className="font-bold text-2xl  mb-5">Quản lý phòng</h2>
        <button
          className=" px-5 py-3 text-white transition-colors duration-150 bg-main border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2"
          // onClick={() => setShowModalCreate(true)}
        >
          + Thêm phòng mới
        </button>
      </div>
    </>
  );
}

export default RoomAdmin