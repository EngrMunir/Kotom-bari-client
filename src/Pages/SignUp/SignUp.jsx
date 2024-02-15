import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SocialLogin from '../../Component/SocialLogin/SocialLogin';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors },} = useForm();
    const { createUser, updateUserProfile }= useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data =>{
         console.log(data);
         createUser(data.email, data.password)
         .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(data.name, data.photoURL)
            .then(()=>{
            //    create user entry in the database
            const userInfo ={
                name: data.name,
                email: data.email
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                if(res.data.insertedId){
                    console.log('user added to the database');
                    reset();
                    Swal.fire({
                        position: 'top-end',
                        icon:'success',
                        title:'Your profile has been updated',
                        showConfirmationButton: false,
                        timer:1500
                    });
                    navigate('/')
                }
            })
               
            })
            .catch(error=>console.error(error))
         })
    }


    return (
        <>
        <Helmet>
            <title>Bistro Boss | Register</title>
        </Helmet>
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Signup now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} name='name' placeholder="Name" className="input input-bordered" />
                        {errors.name && <span className='text-red-600'>Name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                        {errors.name && <span className='text-red-600'>Photo url is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email",{ required: true })} placeholder="email" className="input input-bordered" />
                        {errors.email && <span className='text-red-600'>Email is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password",{ required: true, 
                            minLength:6, 
                            maxLength:20,
                            pattern:/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
                            
                            })} placeholder="password" className="input input-bordered"/>
                        {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be 6 character</p>}
                        {errors.password?.type === 'maxLength' && <p className='text-red-600'>Password must be less than 20 character</p>}
                        {errors.password?.type === 'pattern' && <p className='text-red-600'>Password must have one uppercase one lowercase one number one special character</p>}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Register</button>
                    </div>
                </form>
                <p className='text-center mb-4 px-6'><small>Already registered? <Link to="/login">Login</Link></small></p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    </div>
        </>
    );
};

export default SignUp;