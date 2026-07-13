<!-- <template>
    <div class="profile-wrapper" ref="dropdownRef">
    <img 
      src="@/assets/profile.png" 
      class="profile-icon"
      @click="toggleDropdown"
    />

    
  </div>
</template>
<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import { useAuthStore } from '@/stores/authStore'
    import { useRouter } from 'vue-router'

    const authStore = useAuthStore()
    const router = useRouter()

    const showDropdown = ref(false)
    const dropdownRef = ref(null)

    const toggleDropdown = () => {
        showDropdown.value = !showDropdown.value
    }

    const goToOrders = () => {
        showDropdown.value = false
        router.push('/orders')
    }

    const logout = () => {
        authStore.logout()
        showDropdown.value = false
        router.push('/')
    }
    const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
   .profile-wrapper {
    z-index: 100px;
   } 
</style> -->