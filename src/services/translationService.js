import axios from 'axios'

const translationService = {
  translateCode: async (code, translationTypeId, translationState) => {
    try {
      const token = localStorage.getItem('token')

      const response = await axios.post(
        `${import.meta.env.VITE_API_HOST}translate/translateCode`,
        {
          code,
          translationTypeId,
          translationState
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
      const response = await axios.post(
        `${import.meta.env.VITE_API_HOST}translate/saveCourse`,
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
      throw new Error('Error al guardar el curso')
    }
  },

  editCourse: async (courseId, courseData) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(
        `${import.meta.env.VITE_API_HOST}translate/editCourse/${courseId}`,
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
  getAllTranslationTypes: async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${import.meta.env.VITE_API_HOST}translate/getAllTranslationTypes`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data.types
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener los cursos')
    }
  },

  getAllCourses: async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${import.meta.env.VITE_API_HOST}translate/getAllCourses`, {
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
      const response = await axios.get(
        `${import.meta.env.VITE_API_HOST}translate/getOfficialCourses`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data.officialCourses
    } catch (error) {
      console.error(error)
      throw new Error('Error al obtener los cursos oficiales')
    }
  },

  getNonOfficialCourses: async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${import.meta.env.VITE_API_HOST}translate/getNonOfficialCourses`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
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
        `${import.meta.env.VITE_API_HOST}translate/deleteCourse/${courseId}`,
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
        `${import.meta.env.VITE_API_HOST}translate/changeSubscriptionModel/${newSubscriptionModel}`,
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
