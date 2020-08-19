<template>
    <div class="button">
        <input :id="id" type="button" :value="text" v-on:click="buttonClick"/>
    </div>
</template>

<style scoped>
input {
    height: 50px;
    width: 150px;
}

.button {
    margin-bottom: 16px;
}
</style>

<script>
export default {
    name: "button-component",
    props: {
        text: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
    methods: {
        buttonClick: function() {
            this.$emit(
                'input',
                document.querySelector(`#${this.id}`).id
            );
        }
    },
}
</script>