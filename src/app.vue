<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
h1,
h2,
h3 {
  text-align: center;
}

h1::first-letter,
h2::first-letter,
h3::first-letter {
  text-transform: uppercase;
}

a {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

ul {
  list-style: none;
  margin-block-start: 0px;
  margin-block-end: 0px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}

.form__row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(5em, 1fr));
  align-items: end;
}

.form__row-label {
  text-align: right;
  padding: 0 1em 0 0;
}

.form__row-label::first-letter {
  text-transform: uppercase;
}

.form__row-label-value {
  cursor: pointer;
}

.form__row-field-box {
  max-width: 15em;
}
</style>
