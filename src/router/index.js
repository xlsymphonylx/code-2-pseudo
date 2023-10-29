import { createRouter, createWebHistory } from 'vue-router'
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import HomeView from '../views/HomeView.vue'
import LibraryView from '../views/LibraryView.vue'
import BookshelfView from '../views/BookshelfView.vue'
import TranslationView from '../views/TranslationView.vue'
import PricePlansView from '../views/PricePlansView.vue'
import SignUpView from '../views/SignUpView.vue'
import LoginView from '../views/LoginView.vue'

function isAuthenticated() {
  const token = localStorage.getItem('token') // Assuming you store the token in localStorage
  return !!token // Return true if token exists, false otherwise
}

const routes = [
  {
    path: '/',
    children: [
      {
        path: '/inicio',
        name: 'home',
        component: () => HomeView,
        beforeEnter: (to, from, next) => {
          if (isAuthenticated()) {
            next()
          } else {
            next({ name: 'login' })
          }
        }
      },
      {
        path: '/biblioteca',
        name: 'library',
        component: () => LibraryView,
        beforeEnter: (to, from, next) => {
          if (isAuthenticated()) {
            next()
          } else {
            next({ name: 'login' })
          }
        }
      },
      {
        path: '/mi-libreria',
        name: 'bookshelf',
        component: () => BookshelfView,
        beforeEnter: (to, from, next) => {
          if (isAuthenticated()) {
            next()
          } else {
            next({ name: 'login' })
          }
        }
      },
      {
        path: '/traduccion',
        name: 'translation',
        component: () => TranslationView,
        beforeEnter: (to, from, next) => {
          if (isAuthenticated()) {
            next()
          } else {
            next({ name: 'login' })
          }
        }
      },
      {
        path: '/planes',
        name: 'plans',
        component: () => PricePlansView,
        beforeEnter: (to, from, next) => {
          if (isAuthenticated()) {
            next()
          } else {
            next({ name: 'login' })
          }
        }
      }
    ]
  },
  {
    path: '/',
    children: [
      {
        path: '/iniciar-sesion',
        name: 'login',
        component: () => LoginView,
        beforeEnter: (to, from, next) => {
          if (!isAuthenticated()) {
            next()
          } else {
            next({ name: 'home' })
          }
        }
      },
      {
        path: '/registrarse',
        name: 'signup',
        component: () => SignUpView,
        beforeEnter: (to, from, next) => {
          if (!isAuthenticated()) {
            next()
          } else {
            next({ name: 'home' })
          }
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  mode: 'hash',
  routes
})

export default router
