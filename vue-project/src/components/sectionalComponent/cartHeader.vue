<template>
    <div class="header">
                <router-link to="/">
                <div class="backIcon">
                    <img :src="backIcon" />
                </div>
                </router-link>
                <h3>YOUR CART</h3>
    </div>
</template>

<style scoped>
    .header {
    display: flex;
    margin-bottom: 40px;
    padding: 20px;
}
.backIcon {
        width: 50px;
        height: 50px;
        margin-right: 40px;
    }
</style>

<script setup>
    import backIcon from '@/assets/back_icon.png'

</script>