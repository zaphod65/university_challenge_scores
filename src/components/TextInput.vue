<template>
    <div class="text-input">
        <input
            :id="id"
            :placeholder="placeholder"
            v-on:blur="sendValue"
            type="text"
            v-model="value"
        />
    </div>
</template>

<style scoped>
.text-input {
    margin-bottom: 16px;
}
</style>

<script>
export default {
    name: 'text-input',
    data: function () {
        return {
            value: '',
        }
    },
    props: {
        placeholder: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
    methods: {
        sendValue: function() {
            this.$emit(
                'value-send',
                {
                    value: this.value,
                },
            );
        }
    },
}
</script>