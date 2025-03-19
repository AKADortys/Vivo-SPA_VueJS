<template>
  <header class="bg-dark border-bottom p-3">
    <div class="container d-flex flex-wrap align-items-center justify-content-between">
      <!-- Logo -->
      <RouterLink to="/" class="d-flex align-items-center text-white text-decoration-none">
        <span class="fs-4 text-warning">Au P'tit Vivo</span>
      </RouterLink>

      <!-- Bouton Menu Burger (Mobile) -->
      <button
        class="navbar-toggler d-md-none text-white border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#menu"
        aria-controls="menu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu de navigation -->
      <div class="collapse w-md-50 d-md-flex justify-content-center" id="menu">
        <ul class="nav">
          <li>
            <RouterLink to="/" class="nav-link px-2 text-white" active-class="active text-light">
              Accueil
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/about"
              class="nav-link px-2 text-white"
              active-class="active text-light"
            >
              Informations
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/contact"
              class="nav-link px-2 text-white"
              active-class="active text-light"
            >
              Contact
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/produits"
              class="nav-link px-2 text-white"
              active-class="active text-light"
            >
              Produits
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Boutons Auth (Login/Signup) -->
      <div class="d-md-flex d-none">
        <button type="button" class="btn btn-outline-warning me-2">Login</button>
        <button type="button" class="btn btn-warning">Sign-up</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.active {
  font-weight: bold;
  text-decoration: underline gold;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}
</style>
