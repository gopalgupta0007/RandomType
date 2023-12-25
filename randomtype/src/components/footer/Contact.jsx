import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import MailLockIcon from '@mui/icons-material/MailLock';
import MessageIcon from '@mui/icons-material/Message';

const Contact = () => {
  const [email,setEmail] = useState("xyz@rtmail.com")

  let phoneno = '+91 9381024756';
  return (
    <>
      <div className="text-white text-center text-5xl mt-[-50px]">Contact</div>
      <div id="contect" className='text-black w-4/5 m-auto'>
        <div className='w-5/6 m-auto my-5'>
          <div id='display-contect' className='text-white grid grid-cols-2 gap-5'>
            <div id='mail' className='flex justify-center items-center gap-3 p-3 rounded-lg shadow' >
              <EmailIcon sx={{ color: 'red', fontSize: '30px' }} />
              <div className='text-center'>
                <h1 className='font-extrabold'>Email</h1>
                <p className='text-sm'>{email}</p>
              </div>
            </div>
            <div id='phone-number' className='flex justify-center items-center gap-3 rounded-lg shadow' >
              <ContactPhoneIcon sx={{ color: 'red', fontSize: '30px' }} />
              <div className='text-center'>
                <h1 className='font-extrabold'>Phone</h1>
                <p className='text-sm'>{phoneno}</p>
              </div>
            </div>
          </div>
        </div>
        <div id='fill-contect' className='shadow pt-5 pb-5 text-white'>
          <div className='flex gap-y-3 flex-col justify-center items-center caret-white'>
            <div className='w-11/12 flex justify-center border border-2 border-red-500 rounded-lg overflow-hidden'>
              <span><ForwardToInboxOutlinedIcon sx={{backgroundColor:'rgb(200,0,0)', fontSize:'40px'}}/></span>
              <input type="Cemail" name="Cemail" id="Cemail" placeholder='Enter Email(From)' value={email} onChange={(e)=>setEmail(e.target.value)} className='w-full bg-transparent p-2' />
            </div>
            <div className='w-11/12 flex justify-center border border-2 border-red-500 rounded-lg overflow-hidden'>
              <span><PhoneAndroidOutlinedIcon sx={{backgroundColor:'rgb(200,0,0)', fontSize:'40px'}}/></span>
              <input type="tel" name="Cphone" id="Cphone" placeholder='Enter Phone Number' value={phoneno} disabled className='w-full bg-transparent p-2' />
            </div>
            <div className='w-11/12 flex justify-center border border-2 border-red-500 rounded-lg overflow-hidden'>
              <span><MailLockIcon sx={{backgroundColor:'rgb(200,0,0)', fontSize:'40px'}}/></span>
              <input type="Cemail" name="Cemail" id="Cemail" placeholder='Enter Email(To)' value="Admin@rtmail.com" disabled className='w-full bg-transparent p-2' />
            </div>
            <div className='w-11/12 flex justify-center border border-2 border-red-500 rounded-lg overflow-hidden'>
              <span><MessageIcon sx={{backgroundColor:'rgb(200,0,0)', fontSize:'40px',borderRadius:'5px 0'}}/></span>
              <textarea name="comment" id="comment" cols="30" rows="10" placeholder='Enter Comment' className='w-full bg-transparent p-2 outline-none'></textarea>
            </div>
            <button type='button' className='w-32 h-10 text-white bg-red-900 hover:bg-red-600 rounded-lg transition shadow active:scale-95'>Send Message</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact