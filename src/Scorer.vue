<template>
    <div id="app">
        <h2>University Challenge Scorer!</h2>
        <h3>Total score: {{ totalScore }}</h3>
        <h4>Starters: {{ starter }}</h4>
        <h4>Bonuses: {{ bonus }}</h4>
        <text-input-component
            :placeholder="'Your name...'"
            :id="'name'"
            v-on:input="setName"
        ></text-input-component>
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
            :text="'Reset score'"
            :id="'reset'"
            v-on:input="resetScores"
        ></button-component>
        <button-component
            :text="'Submit score'"
            :id="'submit-score'"
            v-on:input="submitScore"
        ></button-component>
    </div>
</template>

<script>
import axios from 'axios';

// TODO: rename these so they don't have 'Component' in the actual file name, it's completely redundant
import ButtonComponent from './components/ButtonComponent.vue'
import TextInputComponent from './components/TextInputComponent.vue'

export default {
    name: 'Scorer',
    data: function () {
        return {
            starter: 0,
            bonus: 0,
            actionStack: [],
            name: '',
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
        resetScores: function () {
            this.starter = 0;
            this.bonus = 0;
            this.actionStack = [];
        },
        submitScore: function () {
            // TODO: probably abstract this API URL away somehow?
            axios.post('https://kdvqawqelj.execute-api.eu-west-2.amazonaws.com/record_score', {
                score: {
                    name: this.name,
                    score: this.totalScore,
                },
            }).then(res => {
                console.log(res.data);
                alert('Your score has been recorded! :)');
            })
        },
        setName: function (event) {
            this.name = event.name;
        },
    },
    components: {
        ButtonComponent,
        TextInputComponent,
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
