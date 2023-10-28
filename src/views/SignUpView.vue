<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="box">
            <h1 class="title has-text-centered">Registrarse</h1>
            <form>
              <div class="field">
                <label class="label">Nombre</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Nombre" />
                </div>
              </div>
              <div class="field">
                <label class="label">Usuario</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Usuario" />
                </div>
              </div>
              <div class="field">
                <label class="label">Correo Electrónico</label>
                <div class="control">
                  <input class="input" type="email" placeholder="Correo Electrónico" />
                </div>
              </div>
              <div class="field">
                <label class="label">Contraseña</label>
                <div class="control">
                  <input class="input" type="password" placeholder="Contraseña" />
                </div>
              </div>
              <div class="field is-grouped is-grouped-centered">
                <div class="control">
                  <button type="submit" class="button is-primary">Registrarse</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.title {
  font-size: 2em;
}

.button {
  font-size: 1em;
}
</style>
