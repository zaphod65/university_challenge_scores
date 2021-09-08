<template>
    <div id="app">
        <h2>University Challenge Scorer!</h2>
        <h3>Total score: {{ totalScore }}</h3>
        <h4>Starters: {{ starter }}</h4>
        <h4>Bonuses: {{ bonus }}</h4>
        <text-input
            :placeholder="'Your name...'"
            :id="'name'"
            v-on:value-send="setName"
        ></text-input>
        <custom-button
            :text="'Starter'"
            :id="'starter'"
            v-on:input="addStarter"
        ></custom-button>
        <custom-button
            :text="'Bonus'"
            :id="'bonus'"
            v-on:input="addBonus"
        ></custom-button>
        <custom-button
            :text="'Undo'"
            :id="'undo'"
            v-on:input="undo"
        ></custom-button>
        <custom-button
            :text="'Reset score'"
            :id="'reset'"
            v-on:input="resetScores"
        ></custom-button>
        <custom-button
            :text="'Submit score'"
            :id="'submit-score'"
            v-on:input="submitScore"
        ></custom-button>
    </div>
</template>

<script>
import axios from 'axios';

import CustomButton from './components/CustomButton.vue'
import TextInput from './components/TextInput.vue'

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
            if (!this.name) {
                alert('Please enter a name :)');
                return;
            }
            // TODO: probably abstract this API URL away somehow?
            axios.post('https://kdvqawqelj.execute-api.eu-west-2.amazonaws.com/record_score', {
                score: {
                    name: this.name,
                    score: this.totalScore,
                    starters: this.starter,
                    bonuses: this.bonus,
                },
            }).then(res => {
                console.log(res.data);
                alert('Your score has been recorded! :)');
            }).catch(res => {
                console.log(res);
                alert('Something went wrong recording your score, try again?');
            });
        },
        setName: function (event) {
            this.name = event.value.trim();
        },
    },
    components: {
        CustomButton,
        TextInput,
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
