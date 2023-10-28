import axios from 'axios'

const translationService = {
  translateJS: async (code) => {
    try {
      const token = localStorage.getItem('token')
      console.log(token)
      const response = await axios.post(
        'http://localhost:3000/translate/translateJS',
        {
          code
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data.translatedCode
    } catch (error) {
      console.error(error)
      throw new Error('Error en la traducción')
    }
  },

  translatePseudo: async (code) => {
    try {
      const token = localStorage.getItem('token')
      console.log(token)

      const response = await axios.post(
        'http://localhost:3000/translate/translatePseudo',
        {
          code
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data.translatedCode
    } catch (error) {
      console.error(error)
      throw new Error('Error en la traducción')
    }
  },

  saveCourse: async (courseData) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post('http://localhost:3000/translate/saveCourse', courseData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data.course
    } catch (error) {
      console.error(error)
      throw new Error('Error al guardar el curso')
    }
  },

  editCourse: async (courseId, courseData) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(
        `http://localhost:3000/translate/editCourse/${courseId}`,
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data.course
    } catch (error) {
      console.error(error)
      throw new Error('Error al editar el curso')
    }
  },

  getAllCourses: async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:3000/translate/getAllCourses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data.courses
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener los cursos')
    }
  },

  getOfficialCourses: async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:3000/translate/getOfficialCourses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data.officialCourses
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener los cursos oficiales')
    }
  },

  getNonOfficialCourses: async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:3000/translate/getNonOfficialCourses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data.nonOfficialCourses
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener los cursos no oficiales')
    }
  },

  deleteCourse: async (courseId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(
        `http://localhost:3000/translate/deleteCourse/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data.message
    } catch (error) {
      console.error(error)
      throw new Error('Error al eliminar el curso')
    }
  },

  changeSubscriptionModel: async (newSubscriptionModel) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(
        `http://localhost:3000/translate/changeSubscriptionModel/${newSubscriptionModel}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data.message
    } catch (error) {
      console.error(error)
      throw new Error('Error al cambiar el modelo de suscripción')
    }
  }
}

export default translationService
