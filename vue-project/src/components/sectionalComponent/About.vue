<template>
    <div class="container">
        <div class="container1 row">
            <div class="text">
                <h2>More Than Food</h2>
                <p>We started this brand because good food shouldn’t be stressful. Too often, meals are rushed, forgettable, or just not worth it. <br/>
So we focused on doing the simple things right ; real ingredients, proper preparation, and food that actually satisfies.</p>
            </div>
            <div class="image one">
                <img :src="containerImage" />
            </div>
        </div>
        <div class="container1 rowRev">
            <div class="text">
                <h2>Food that gets you</h2>
                <p>Busy days, late nights, quick breaks ; we get it. Sometimes you just want food that fits your schedule without cutting corners. <br/>
That's why our meals are made to be fast, satisfying, and easy to enjoy whenever hunger shows up...</p>
<div class="customerDiv">
                    <div class="customerImage">
                        <div class="customers" v-for="i in 4" :key="i"></div>
                    </div>                    
                    <div>Trusted by over 1000 customers</div>
                </div>
            </div>
            
            <div class="subContainer">
                <div class="image two">
                    <img :src="cookImage" />
                </div>
                
            </div>
        </div>
    </div>
</template>

<style scoped>
    h2 {
        font-family: 'Bowlby One';
        font-weight: 400;
        font-size: 45px;
    }
    .container1 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 100px;
        padding:20px 60px;
        height: auto;
        gap: 60px;
        align-items: center;
        flex-wrap: nowrap;
    }
    .row {
        flex-direction: row;
    }
    .rowRev {
        flex-direction: row-reverse;
    }
    .subContainer {
        display: flex;
        flex-direction: column;
    }

    /*text styling*/
    p{
        font-family: 'DMSans';
    }
    .text {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 500px;
        justify-content: center;
    }
    .text p{
        line-height: 3ch;
    }

    /*image styling*/
    .image {
        width: auto;
        max-width: 500px;
        height: auto;
    }
    img {
        object-fit: cover;
        width: 100%;
        height: auto;
    }
    .one {
        transform : rotate(-5deg);
        margin-right: 100px;
    }
    .two {
        transform : rotate(5deg);
    }

    .customerDiv {
        display: flex;
        flex-direction: row;
        background-color: #fb0;
        padding: 10px 20px;
        gap: 20px;
        border-radius: 30px;
        box-shadow: 5px 5px 0 0 ;
        font-family: 'DMSans';
    }
    .customerImage {
        display: flex;
        width: auto;        
        margin-left: 30px;

    }
    .customers {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: grey;
        margin-left: -8px;
    }

@media (max-width: 1024px) {

    .container1 {
    padding: 20px 40px;
    gap: 40px;
    }

    h2 {
    font-size: 36px;
    }

}

@media (max-width: 768px) {

    .container1 {
    /* flex-direction: column; */
    text-align: center;
    padding: 20px;
    }

    .rowRev {
    flex-direction: column;
    }

    .text {
    align-items: center;
    }

    h2 {
    font-size: 30px;
    }

    .customerDiv {
    justify-content: center;
    }

}

@media (max-width: 480px) {

    h2 {
    font-size: 26px;
    }

    p {
    font-size: 14px;
    }

    .customerDiv {
    flex-direction: column;
    align-items: center;
    text-align: center;
    }

}
</style>

<script setup>
    import containerImage from '@/assets/containerImage.png';
    import cookImage from '@/assets/rectangle51.jpg'
</script>


