import React, { useState } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useCollege } from '../utils/GlobalContext'
import { backend_url } from '../utils/api'
import Modal from 'react-responsive-modal'
import UpdateStudent from './UpdateStudent'
const AdminProfile = () => {
  const {currentUser,role}=useCollege()
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <div>
          <motion.div
              drag
            className='flex justify-center items-center'
            //   dragElastic={0.2}
            //   dragConstraints={{ left: 0, top: 300, right: 300, bottom: 300 }}
            >
              {" "}
              <div className="bg-gray-100 min-w-72 max-w-96 min-h-72 p-3 rounded-lg hover:bg-gray-200">
                <div className=" flex justify-center items-center mb-5">
                  <img
                    src={`${backend_url}/images/${currentUser?.image}`}
                    className="rounded-full w-36 h-36"
                    alt=""
                  />
                </div>
                <div className=" flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span>Name</span>
                    <span>{currentUser?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Email</span>
                    <span>{currentUser?.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mobile Number</span>

                    <span>{currentUser?.mobileNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Address</span>
                    <span>{currentUser?.address}</span>
                  </div>

                 { role!=="Admin"&&<div className="flex justify-between items-center">
                    <span>
                      <button onClick={onOpenModal}>
                        <FaUserEdit className="text-green-500 h-8 w-8" />
                      </button>
                    </span>
                    
                  </div>}
                </div>
              </div>
            </motion.div>
            <Modal open={open} onClose={onCloseModal} center>
      <UpdateStudent currentUser={currentUser}/>
      </Modal>
    </div>
  )
}

export default AdminProfile