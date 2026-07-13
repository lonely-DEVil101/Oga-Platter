<template>
    <div class="container" id="contact">
        <div class="subContainer">
            <div class="footer">
    
                <div class="contacts">
                    <h3>Address</h3>
                    <p>Front of Fotek event Center <br /> Along Akala Express</p>

                    <h3>Phone No:</h3>
                    <p>+234 70530 00005</p>
                </div>

                <div class="links">
                    <h3>Quick Links</h3>
                    <p @click="scrollToSection('home')">Home</p>
                    <p @click="scrollToSection('about')">About</p>
                    <p @click="scrollToSection('menu')">Menu</p>
                </div>

                <div class="goodToKnow">
                    <h3>Good to Know</h3>
                    <div  class="section" v-for="(section, index) in goodToKnow">
                        <div class="sectionQuestion">
                            {{ section.question }}
                            <div style="display: inline;" >
                                <a style="float: right;" @click="toggle(index)">
                                    <img :src="section.open ? minusImage: addImage"/>
                                </a>
                            </div>
                        </div>
                        

                        <div style="font-family: 'DmSans'; color: white" v-if="section.open">
                            {{ section.answer }}
                        </div>
                    </div>
                </div>
            </div>
            <span class="footerText">
                OGA PLATTER
            </span>
        </div>
    </div>  
</template>
  
<script setup>
import { reactive } from 'vue'
  import addImage from "./add_circle.png"
  import minusImage from './minus_circle.png'
  
  const goodToKnow = reactive([
    {
      question: 'Who can I contact for help?',
      answer: 'Click on the contact link',
      open: false
    },
    {
      question: 'How long does it take?',
      answer: 'Orders are usually ready within a short time, depending on your location and order size.',
      open: false
    },
    {
      question: 'How do I place an order?',
      answer: "Click on the 'order' button",
      open: false
    }
  ])
  
  const toggle = (index) => {
    goodToKnow[index].open = !goodToKnow[index].open
  }

  import { useScroll } from '@/scrollToSection'

    const { scrollToSection } = useScroll()
</script>
  
<style scoped>

    .container {
        background-color: #fffdd0;
        padding: 35px 40px;
    }
    .subContainer {
        background-color: #fb0;
        border-radius: 5px;
        padding-bottom: -50px;
        margin-bottom: 0;
    }
    .footer {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 30px;
        color: #4d231f;
         padding: 20px;
    }
    .section {
        background-color: #4d231f; 
        margin-bottom: 20px;
        color: white;
        padding: 20px;
        border-radius: 10px;
        cursor: pointer;
    }

    .sectionQuestion {
        display: flex;
        justify-content: space-between;
    }

    h3{
        font-family: 'Bowlby One';
    }
    p{
        font-family: 'DmSans';
    }
    
    .question {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
    }
    
    .answer {
        display: none;
    }
    .links > p:hover {
        cursor: pointer;
        text-decoration-line: underline;
    }

    .footerText  {
        display: block;
        position: relative;
        bottom: -15px;
        width: 100vw;
        color: #fffdd0;
        margin: -5px;
        font-size: clamp(50px, 10vw, 151px);
        font-family: 'Bowlby One';
        line-height: 1;
        letter-spacing: 3px;
        z-index: 0;
    }

@media (max-width: 768px) {

    .container {
    padding: 30px 20px;
    }

    .footer {
    text-align: center;
    }

    .section {
    padding: 15px;
    }

}
</style>
  