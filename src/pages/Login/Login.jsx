import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import axios from 'axios';

const Login = () => {
    const {login} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogin = e => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const email = form.get('email')
        const password = form.get('password')
        const user = {email}
        login(email,password)
        .then(result => {
            const loggedInUser = result.user
            console.log(loggedInUser);
            
            axios.post('http://localhost:5000/jwt',user,{withCredentials: true})
            .then(res => {
                console.log(res.data);
                if(res.data.success){
                    navigate(location.state ? location.state : '/')
                }
            })
            // axios.post('http://localhost:5000/jwt',user,{withCredentials: true})
            // .then(res => {
            //     console.log(res.data)
            //     if(res.data.success){
            //         navigate(location.state ? location.state : '/')
            //     }
            // })
            
            
        })
        .catch(error => {
            console.error(error.message)
        })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2 mr-12">
                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-3xl pt-4 text-center font-bold">Login now!</h1>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    <p className='text-center pb-5'>New to Cars Doctors <Link to='/signUp' className='text-orange-600 font-bold'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;