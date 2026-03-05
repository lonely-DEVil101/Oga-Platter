<template>
    <div class="container">
        <div id="about" class="container1 row">
            <div class="text">
                <h2>More Than Food</h2>
                <p>We started this brand because good food shouldn’t be stressful. Too often, meals are rushed, forgettable, or just not worth it.
So we focused on doing the simple things right ; real ingredients, proper preparation, and food that actually satisfies.</p>
            </div>
            <div class="image one">
                <img src="@/assets/Container Image.png" />
            </div>
        </div>
        <div class="container1 rowRev">
            <div class="text">
                <h2>Food that gets you</h2>
                <p>Busy days, late nights, quick breaks ; we get it. Sometimes you just want food that fits your schedule without cutting corners.
That's why our meals are made to be fast, satisfying, and easy to enjoy ; whenever hunger shows up.</p>
<div class="customerDiv">
                    <div class="customerImage">
                        <div class="customers" v-for="i in 4" :key="i"></div>
                    </div>                    
                    <div class="customerText">Trusted by over 1000 customers</div>
                </div>
            </div>
            
            <div class="subContainer">
                <div class="image two">
                    <img src="@/assets/Rectangle 51.jpg" />
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
        justify-content: space-between;
        margin-bottom: 100px;
        padding:20px 60px;
        height: auto;
        gap: 100px;
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
        width: 40vw;
        justify-content: center;
    }

    /*image styling*/
    .image {
        /* width:600px;
        height: 500px; */
        width: 40vw;
        height: 60vh;
    }
    img {
        object-fit: fill;
        width: 100%;
        height: 100%;
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
        width: 50%;        
        margin-left: 30px;

    }
    .customers {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: grey;
        margin-left: -8px;
    }
</style>


