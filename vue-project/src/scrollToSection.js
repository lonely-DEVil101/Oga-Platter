export function useScroll() {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
    
        if(element) {
            element.scrollIntoView({
                behavior: 'smooth'
            })
        }
    }
    return { scrollToSection }
}

import { useRouter } from 'vue-router'

export function useScrollCart() {
  const router = useRouter()

  const goToSection = async (id) => {
    if (router.currentRoute.value.path !== '/') {
      // If not on home page, navigate first
      await router.push({ path: '/', query: { scrollTo: id } })
    } else {
      scrollNow(id)
    }
  }

  const scrollNow = (id) => {
    const el = document.getElementById(id)

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return { goToSection }
}
