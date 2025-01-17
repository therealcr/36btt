/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'
import HttpStatusCode from '../constants/HttpStatusCodes'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const notifySuccess = (message: string): void => {
		toast.success(message)
	}

	const BACKEND_BASE_URI: string = import.meta.env.VITE_BACKEND_BASE_URI

	const postData = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault()
		try {
			const response = await fetch(`${BACKEND_BASE_URI}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			})
			const { status } = response
			const jsonData = await response.json()
			if (status === HttpStatusCode.CREATED) {
				localStorage.setItem('jwt', jsonData.token)
				localStorage.setItem('user', jsonData.username)
				setTimeout(() => {
					console.log('Logged in!')
					notifySuccess('Welcome to Sherlocked 2024')
					localStorage.setItem('isLoggedIn', 'true')
					navigate('/level-1')
				}, 500)
			}
		} catch (error) {
			alert("That's what she said")
		}
	}
	return (
		<div className='login-container'>
			<form onSubmit={event => postData(event)} className='login-form'>
				<input
					type='text'
					placeholder='Username'
					value={username}
					onChange={e => setUsername(e.target.value)}
					className='login-input'
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					className='login-input'
				/>
				<button type='submit' className='login-button'>
					Enter Sherlocked :){' '}
				</button>
			</form>
			<ToastContainer autoClose={2000} theme='light' />
		</div>
	)
}
export default Login
