<template>
    <Hero></Hero>
    <Menu></Menu>
    <About></About>
    <Footer></Footer>
  </template>
  
  <script setup>
    import Hero from "@/components/sectionalComponent/Hero.vue"
    import Menu from "@/components/sectionalComponent/MenuList.vue"
    import About from "@/components/sectionalComponent/About.vue"
    import Footer from "@/components/sectionalComponent/Footer.vue"
    import { useRoute } from 'vue-router'
import { onMounted, nextTick } from 'vue'

const route = useRoute()

onMounted(async () => {
  if (route.query.scrollTo) {
    await nextTick() // Wait for DOM
    const el = document.getElementById(route.query.scrollTo)

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
})

  </script>