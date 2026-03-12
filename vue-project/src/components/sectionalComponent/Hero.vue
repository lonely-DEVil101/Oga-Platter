<template>
    <div class="container">
        <Header class="header"></Header>
        <div class="hero" id="home">
            <div class="text">
                <div class="boldText">
                    Grilled. <br/>
                    <div class="smoked">Smoked.</div>
                    Done the <br />
                    Oga way. <br/>
                </div>                
                <p>Fresh grilled fish, shawarma, <br />barbeque & asun made the Oga way</p>
                <button @click="scrollToSection('menu')">View Menu</button>
            </div>
            <div class="heroImage">
                <img src="@/assets/heroImage.png" />
            </div>
        </div>
        
    </div>
    
</template>

<style scoped>
    .container {
        background:#FFFEE5;
        /* padding: 10px 50px; */
        padding-top: 0;
    }

    .header {
        /* margin-top: 0; */
        position: fixed;
        background-color: #FFFEE5;
        width: 100%;
        z-index: 2;
        margin: 0 auto;
    }

    .hero {
        display: flex;
        /* justify-content: space-between; */
        padding-top: 100px;
        gap: 20px;
    }

    /*text styling*/
    .text {
        font-size: 60px;
        width: 40vw;
        text-wrap: wrap;
        margin-right: 20px;
        margin-left: 40px;
        animation: topSlide ease-in-out 1s;
    }
    .boldText {
        font-family: 'Bowlby One';
        line-height: 70px;
        margin-top: 80px;
    }
    .text p{
        font-family: 'DMSans';
        font-size: medium;
        margin-bottom: 0;
    }
    .smoked {
        color: #FFA705;
        margin: 0;
    }

    .heroImage {
        width: 500px;
        height: 500px;
        animation: appear ease-in-out 1s;
    }
    .hero img {
        object-fit: contain;
        width: 100%;
        height: 100%;
    }

    button {
        background: #FFA705;
        box-shadow: 0 0 5px #ffc54a;
        border: none;
        padding: 10px 15px;
        border-radius: 20px;
    }



    /*animations*/
    @keyframes appear{
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes topSlide {
        from {
            transform: translateY(-100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    /* Tablet */
@media (max-width: 1024px) {

  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .text {
    width: 80%;
    font-size: 48px;
    margin: 0 auto;
  }

  .boldText {
    margin-top: 40px;
  }

  .heroImage {
    width: 400px;
    height: 400px;
  }

}


/* Mobile */
@media (max-width: 768px) {

  .hero {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .text {
    width: 90%;
    font-size: 36px;
    margin: 0 auto;
  }

  .boldText {
    line-height: 45px;
  }

  .text p {
    font-size: 14px;
  }

  .heroImage {
    width: 300px;
    height: 300px;
  }

}


/* Small phones */
@media (max-width: 480px) {

  .text {
    font-size: 28px;
  }

  .boldText {
    line-height: 35px;
  }

  .heroImage {
    width: 250px;
    height: 250px;
  }

}
</style>

<script setup>
    import Header from "@/components/sectionalComponent/Header.vue";

    import { useScroll } from '@/scrollToSection'

    const { scrollToSection } = useScroll()
</script>