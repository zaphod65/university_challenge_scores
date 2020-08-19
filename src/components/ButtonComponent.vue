<template>
    <div class="button">
        <input
            :id="id"
            :value="text"
            :disabled="!active"
            v-on:click="buttonClick"
            type="button"
        />
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
        active: {
            type: Boolean,
            default: true,
        }
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