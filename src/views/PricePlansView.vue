<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">Planes de Precios</h1>
      <div class="content">
        <p>
          Bienvenido a nuestro servicio premium. Estamos encantados de ofrecerte una experiencia de
          aprendizaje única y enriquecedora. Selecciona uno de nuestros planes a continuación y
          comienza tu viaje hacia el éxito.
        </p>
      </div>
      <div class="columns">
        <div class="column" v-for="plan in plans" :key="plan.id">
          <div class="card">
            <div class="card-content">
              <div class="content">
                <h2 class="title is-4">{{ plan.name }}</h2>
                <p v-for="feature in plan.features" :key="feature">{{ feature }}</p>
                <p class="has-text-weight-bold is-size-4">{{ `$${plan.price}/mes` }}</p>
                <button class="button is-primary" @click="handlePayPalPayment(plan.price)">
                  Seleccionar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="is-flex is-justify-content-center">
        <div id="paypal-button-container" class="wider-button"></div>
      </div>
      <div class="content mt-4">
        <p>
          ¡Estamos agradecidos por tu elección! Tu apoyo nos permite seguir ofreciendo un servicio
          excepcional y de alta calidad. Si tienes alguna pregunta o necesitas asistencia, no dudes
          en contactarnos.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { loadScript } from '@paypal/paypal-js'
import { showSuccessDialog } from '../utils/alerts'

const plans = [
  {
    id: 1,
    name: 'Plan Básico',
    features: [
      'Hasta 15 lecciones guardadas',
      'Nombre Dorado',
      'Acceso a API (Limitado)',
      'Nuestro agradecimiento!'
    ],
    price: 10
  },
  {
    id: 2,
    name: 'Plan Estándar',
    features: [
      'Hasta 30 lecciones guardadas',
      'Nombre Dorado',
      'Acceso completo a la API',
      'Análisis de progreso'
    ],
    price: 20
  },
  {
    id: 3,
    name: 'Plan Premium',
    features: [
      'Lecciones ilimitadas',
      'Nombre Dorado con diamantes',
      'Acceso completo a la API',
      'Asesoría personalizada'
    ],
    price: 30
  }
]

const currency = 'USD'
const YOUR_CLIENT_ID =
  'AeBIjh0Oj8RP49gqr1fxiyJdFl3fbuwpW_Nq02_xOpzJNSXnz572xlvyZNnw2XQ7SRRXG8Pj1m_CTJWH'

const handlePayPalPayment = async (amount) => {
  const paypal = await loadScript({ 'client-id': YOUR_CLIENT_ID, currency })

  paypal
    .Buttons({
      style: {
        layout: 'horizontal',
        color: 'gold',
        shape: 'rect',
        label: 'paypal',
        height: 55, // Adjust the height to make the button larger
        align: 'center' // Center the button
      },
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount
              }
            }
          ]
        })
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          showSuccessDialog('Exito!', 'Tu orden ' + details.id + ' se ha registrado correctamente!')
        })
      }
    })
    .render('#paypal-button-container')
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.wider-button {
  width: 500px; /* Adjust the width as needed */
}
</style>
