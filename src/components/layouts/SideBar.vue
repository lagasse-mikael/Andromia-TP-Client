<template>
  <div class="min-height-300 position-absolute w-100"></div>
  <aside
    class="my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl fixed-start ms-3"
    id="sidenav-main"
    data-color="dark"
  >
    <div class="sidenav-header text-center">
      <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>
      <RouterLink class="navbar-brand" to="/homePage">
        <img
          src="@/assets/img/andromia-logo.png"
          class="h-100"
          alt="main_logo"
        />
        <span class="ms-2 font-weight-bold" id="app-title">Andromia</span>
      </RouterLink>
    </div>
    <hr class="mt-0 horizontal dark dark-fix" />
    <div class="collapse navbar-collapse w-auto h-auto h-100" id="sidenav-collapse-main">
      <div style="text-align:center;margin:10px">
        <img 
          src="@/assets/img/icons/inox.png"
          alt="inoxImg"
          class="imgIcon"/>
        <span id="inoxBalance" style="color:white; font-weight:bold; margin-left: -20px;"> Inox : --</span>
      </div>
      <ul class="navbar-nav">
        <SideBarItem url="/homePage" text="Historique d'explorations">
            <template v-slot:icon>
              <i class="ni ni-world text-success text-sm opacity-10"></i>
            </template>
        </SideBarItem>

        <SideBarItem url="/creatures" text="Créatures">
          <template v-slot:icon>
              <i class="ni ni-badge text-warning text-sm opacity-10"></i>
            </template>
        </SideBarItem>

        <SideBarItem url="/elements" text="Elements">
          <template v-slot:icon>
              <i class="ni ni-atom text-primary text-sm opacity-10"></i>
            </template>
        </SideBarItem>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import SideBarItem from './SideBarItem.vue';

</script>

<style lang="scss" scoped>
.navbar-vertical {
  z-index: 1000;
}

@font-face {
  font-family: Boardmarker;
  src: url("@/assets/fonts/Boardmarker.ttf");
}

#app-title {
  font-family: "Boardmarker", "SB Heading";
  font-weight: normal;
  font-size: 1.5rem;
}

.dark-fix {
  color: #111c44;
}

.imgIcon{
  height: 70px;
  width: 70px;
}

#sidenav-main{
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  background-size: cover;
  backdrop-filter: blur(20px);
	box-shadow: 0px 0px 15px 0px white;

}

</style>
