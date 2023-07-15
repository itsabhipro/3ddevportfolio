import {useState,useRef} from 'react';
import {motion} from "framer-motion";
import SectionWrapper from '../hoc/SectionWrapper';
import emailjs from "@emailjs/browser";
import {styles} from "../style";
import { EarthCanvas } from './canvas';
import { slideIn } from '../utils/motion';


const Contact = () => {
  const formRef = useRef();
  const [form, setform] = useState({
    name:"",
    email:"",
    message:""
  });
  const [loading, setloading] = useState(false);

  function handleChange(e){
    setform({...form,[e.target.name]:e.target.value});
  }

  function handleSubmit(e){
      e.preventDefault();
      setloading(true);
      emailjs.send('<Email-js service key>','template_09o5cxw',{
        from_name:form.name,
        to_name:"<your-bussiness name>",
        from_email:form.email,
        to_email:"<your email>",
        message:form.message
      },'<email js public key>')
      .then(()=>{
        setloading(false);
        alert("Thank you, I will get back to you");
        setform({
          name:"",
          email:"",
          message:""
        })
      },(error)=>{
        setloading(false);
        console.log(error);
        alert("Somethings went wrong");
      });

  }
  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div variants={slideIn("left","tween",0.2,1)}
                  className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={`${styles.sectionSubText}`}>Get in Touch</p>
        <h2 className={`${styles.sectionHeadText}`}>Contact.</h2>

        <form 
        ref={formRef}
        onSubmit={handleSubmit}
        className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <spna className="text-white font-medium mb-4">Your name</spna>
            <input 
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder='What is your name?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
            />
          </label>

          <label className='flex flex-col'>
            <spna className="text-white font-medium mb-4">Your Email</spna>
            <input 
              type='text'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder='example@whatever.com'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
            />
          </label>

          <label className='flex flex-col'>
            <spna className="text-white font-medium mb-4">Message</spna>
            <textarea 
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder="What's in your mind?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
            />
          </label>
          <button
            type='submit'
            disabled={loading}
            className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md rounded-xl shadow-primary'
          >{loading ? "Sending...":"Send"}</button>
        </form>
      </motion.div>

      <motion.div
          variants={slideIn("right",'tween',0.2,1)}
          className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
          <EarthCanvas />
      </motion.div>


    </div>
  )
}

export default SectionWrapper(Contact,"contact");