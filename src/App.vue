<template>
    <div id="app">
        <h2>University Challenge Scorer!</h2>
        <h3>Total score: {{ totalScore }}</h3>
        <h4>Starters: {{ starters }}</h4>
        <h4>Bonuses: {{ bonuses }}</h4>
        <button-component
            :text="'Starter'"
            :id="'starter'"
            v-on:starter="addStarter"
        ></button-component>
        <button-component
            :text="'Bonus'"
            :id="'bonus'"
            v-on:bonus="addBonus"
        ></button-component>
        <button-component
            :text="'Submit score'"
            :id="'submit-score'"
            v-on:submit-score="submitScore"
        ></button-component>
    </div>
</template>

<script>
// import axios from 'axios';

import ButtonComponent from './components/ButtonComponent.vue'

export default {
    name: 'App',
    data: function () {
        return {
            starters: 0,
            bonuses: 0,
        };
    },
    computed: {
        totalScore: function() {
            return (this.starters * 10) + (this.bonuses * 5);
        }
    },
    methods: {
        addStarter: function () {
            this.starters++;
        },
        addBonus: function () {
            this.bonuses++;
        },
        submitScore: function () {
            console.log("Score submit clicked");
            // axios.get('https://jsonplaceholder.typicode.com/users')
            //     .then(res => {
            //         console.log(res.data);
            //     })
        }
    },
    components: {
        ButtonComponent,
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
