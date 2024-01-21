import React, { useEffect, useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import MailLockIcon from '@mui/icons-material/MailLock';
import MessageIcon from '@mui/icons-material/Message';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { updateMessage } from '../../redux/action/Actions';
import { setFavicons, setThemeOnBody, togglRTIntroAnimation } from '../../Methods/methods';

const Contact = () => {
  const dispatch = useDispatch();
  const author = useSelector(state => state.AuthorReducer.UserData);
  const [comment, setComment] = useState({ message: author.data.message });
  // let phoneno = '+91 9381024756';
  useEffect(() => {
    togglRTIntroAnimation(author.data.setting.intro_animation)
    setThemeOnBody(author.data.setting.theme.replace(/ /g, "_").toLowerCase());
    setFavicons(author.data.setting.theme.replace(/ /g, "_").toLowerCase());
  }, [])

  useEffect(()=>{
    dispatch(updateMessage(comment.message))
  },[comment.message])

  const updateComment = async () => {
    console.log(comment);
    if (!(comment.message === "")) {
      try {
        console.log(author);
        const updatedCommentData = await axios.patch(`/users/contactus/${author._id}`,
          comment,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
          }
        ) // for cookie because we have to use axious method to fetch data
        console.log("updatedCommentData :=> ", updatedCommentData);
        toast.success("Comment sented Successfully")
        setTimeout(() => {
          setComment({ ...comment, message: "" })
        }, 2000);
        console.log(comment);
      } catch (err) {
        console.log(err);
      }
      console.log(comment);
    }
  }

  // const handleComment = () =>{
  //   updateComment()
  // }
  console.log(comment.message);
  return (
    <>
      <HelmetProvider>
        <Helmet><title>Contact us || RandomType</title></Helmet>
        <div className="text-bnw text-center text-5xl mt-[-50px] stroke_colorNwidth">Contact</div>
        <div id="contect" className='text-black w-4/5 m-auto'>
          <div className='w-5/6 m-auto my-5'>
            <div id='display-contect' className='text-bnw grid grid-cols-2 gap-5'>
              <div id='mail' className='flex justify-center items-center gap-3 p-3 rounded-lg shadow' >
                <EmailIcon sx={{ color: 'var(--base_color)', fontSize: '30px' }} />
                <div className='text-center'>
                  <h1 className='font-extrabold'>Email</h1>
                  <p className='text-sm'>{author.email}</p>
                </div>
              </div>
              <div id='phone-number' className='flex justify-center items-center gap-3 rounded-lg shadow' >
                <ContactPhoneIcon sx={{ color: 'var(--base_color)', fontSize: '30px' }} />
                <div className='text-center'>
                  <h1 className='font-extrabold'>Phone</h1>
                  <p className='text-sm'>+91&nbsp;{author.phoneno}</p>
                </div>
              </div>
            </div>
          </div>
          <div id='fill-contect' className='shadow pt-5 pb-5 text-bnw'>
            <div className='flex gap-y-3 flex-col justify-center items-center caret-white'>
              <div className='w-11/12 flex justify-center border border-2 border-base-color rounded-lg overflow-hidden'>
                <span><ForwardToInboxOutlinedIcon sx={{ backgroundColor: 'var(--base_color)', fontSize: '40px' }} /></span>
                <input type="Cemail" name="Cemail" id="Cemail" placeholder='Enter Email(From)' value={author.email} className='w-full bg-transparent p-2' />
              </div>
              <div className='w-11/12 flex justify-center border border-2 border-base-color rounded-lg overflow-hidden'>
                <span><PhoneAndroidOutlinedIcon sx={{ backgroundColor: 'var(--base_color)', fontSize: '40px' }} /></span>
                <input type="tel" name="Cphone" id="Cphone" placeholder='Enter Phone Number' value={author.phoneno} disabled className='w-full bg-transparent p-2' />
              </div>
              <div className='w-11/12 flex justify-center border border-2 border-base-color rounded-lg overflow-hidden'>
                <span><MailLockIcon sx={{ backgroundColor: 'var(--base_color)', fontSize: '40px' }} /></span>
                <input type="Cemail" name="Cemail" id="Cemail" placeholder='Enter Email(To)' value="Admin@rtmail.com" disabled className='w-full bg-transparent p-2' />
              </div>
              <div className='w-11/12 flex justify-center border border-2 border-base-color rounded-lg overflow-hidden'>
                <span><MessageIcon sx={{ backgroundColor: 'var(--base_color)', fontSize: '40px', borderRadius: '5px 0' }} /></span>
                <textarea name="message" id="message" cols="30" rows="10" placeholder='Enter Comment' className='w-full bg-transparent p-2 outline-none' value={comment.message} onChange={e => setComment({ ...comment, [e.target.name]: e.target.value })}></textarea>
              </div>
              <button type='button' onClick={updateComment} className='w-32 h-10 text-bnw bghoverActive hover:border-base-color rounded-lg transition shadow active:scale-95'>Send Message</button>
            </div>
          </div>
        </div>
      </HelmetProvider>
      {/* <ToastContainer /> */}
    </>
  )
}

export default Contact