<template>
  <div class="form__row">
    <label v-if="labelName" :for="id" class="form__row-label">
      <span class="form__row-label-value">{{ labelName }}</span>
    </label>

    <div class="form__row-field-box">
      <input :id="id" :name="name" :type="type" :value="modelValue" :placeholder="placeholder" @input="handlerInput" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface InputProps {
  id: string;
  name: string;
  type?: string;
  modelValue: string;
  placeholder?: string;
  labelName?: string;
}

withDefaults(defineProps<InputProps>(), {
  type: 'text',
  modelValue: '',
  labelName: '',
});

const handlerInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};

const emit = defineEmits(['update:modelValue']);
</script>
