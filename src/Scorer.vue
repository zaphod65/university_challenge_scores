<template>
    <div id="app">
        <h2>University Challenge Scorer!</h2>
        <h3>Total score: {{ totalScore }}</h3>
        <h4>Starters: {{ starter }}</h4>
        <h4>Bonuses: {{ bonus }}</h4>
        <button-component
            :text="'Starter'"
            :id="'starter'"
            v-on:input="addStarter"
        ></button-component>
        <button-component
            :text="'Bonus'"
            :id="'bonus'"
            v-on:input="addBonus"
        ></button-component>
        <button-component
            :text="'Undo'"
            :id="'undo'"
            v-on:input="undo"
        ></button-component>
        <button-component
            :text="'Submit score'"
            :id="'submit-score'"
            :active="false"
            v-on:input="submitScore"
        ></button-component>
    </div>
</template>

<script>
// import axios from 'axios';

import ButtonComponent from './components/ButtonComponent.vue'

export default {
    name: 'Scorer',
    data: function () {
        return {
            starter: 0,
            bonus: 0,
            actionStack: [],
        };
    },
    computed: {
        totalScore: function() {
            return (this.starter * 10) + (this.bonus * 5);
        }
    },
    methods: {
        addStarter: function () {
            this.starter++;
            this.actionStack.push({
                action: 'starter',
            });
        },
        addBonus: function () {
            this.bonus++;
            this.actionStack.push({
                action: 'bonus',
            });
        },
        undo: function () {
            let lastAction = this.actionStack.pop();
            if (!(typeof lastAction === 'undefined')) {
                this[lastAction.action]--;
            }
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
