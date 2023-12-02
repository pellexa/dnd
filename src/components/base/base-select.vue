<template>
  <div class="form__row">
    <label v-if="labelName" :for="id" class="form__row-label">
      <span class="form__row-label-value">{{ labelName }}</span>
    </label>

    <div class="form__row-field-box">
      <select name="name" :id="id" @change="handlerChange" :value="modelValue">
        <option value="">-Выбрать-</option>
        <option v-for="option in options" :value="option.value">{{ option.text }}</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SelectProps {
  id: string;
  name: string;
  modelValue: string;
  labelName?: string;
  options: { value: string; text: string }[];
}

withDefaults(defineProps<SelectProps>(), {
  modelValue: '',
  labelName: '',
});

const handlerChange = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLSelectElement).value);
};

const emit = defineEmits(['update:modelValue']);
</script>
