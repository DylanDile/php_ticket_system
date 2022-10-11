<template>
  <div id="app-sidepanel" class="app-sidepanel">
    <div id="sidepanel-drop" class="sidepanel-drop"></div>
    <div class="sidepanel-inner d-flex flex-column">
      <a href="#" id="sidepanel-close" class="sidepanel-close d-xl-none">&times;</a>
      <div class="app-branding">
        <a class="app-logo" href="/">
          <img class="logo-icon me-2" src="/app/images/app-logo.svg" alt="logo">
          <span class="logo-text">PORTAL</span>
        </a>
      </div>

      <nav id="app-nav-main" class="app-nav app-nav-main flex-grow-1">
        <ul class="app-menu list-unstyled accordion" id="menu-accordion">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <span class="nav-icon">
                <i class="uil uil-dashboard"></i>
              </span>
              <span class="nav-link-text">Dashboard</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/users">
              <span class="nav-icon">
                <i class="uil uil-users-alt"></i>
              </span>
              <span class="nav-link-text">Users</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/tickets">
              <span class="nav-icon">
                <i class="uil uil-trademark-circle"></i>
              </span>
              <span class="nav-link-text">Tickets</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar"
}
</script>

<style scoped>

</style>