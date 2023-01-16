<template>
  <div
    class="grid grid-rows-[auto_1fr_auto] min-h-screen text-sky-600 font-[Poppins]"
  >
    <NavBar />
    <main>
      <slot></slot>
    </main>
    <FooterSection />
  </div>
</template>
