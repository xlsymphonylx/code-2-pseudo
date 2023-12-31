import axios from 'axios'
const host = 'http://ec2-3-148-106-81.us-east-2.compute.amazonaws.com/'
const authService = {
  async register({ username, password, email, firstName, lastName, profileImg }) {
    console.log(host)
    try {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)
      formData.append('email', email)
      formData.append('first_name', firstName)
      formData.append('last_name', lastName)
      formData.append('profile_img', profileImg) // Assuming profileImg is a File object

      const response = await axios.post(`${host}auth/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      if (error.response.status === 400) {
        throw new Error('Nombre de usuario ya existe')
      } else if (error.response.status === 500) {
        throw new Error('Error interno del servidor')
      } else {
        throw new Error('Error de registro')
      }
    }
  },

  async login(email, password) {
    try {
      const response = await axios.post(`${host}auth/login`, {
        email,
        password
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error('Usuario o contraseña incorrectos')
      } else if (error.response.status === 500) {
        throw new Error('Error interno del servidor')
      } else {
        throw new Error('Error de inicio de sesión')
      }
    }
  }
}

export default authService
