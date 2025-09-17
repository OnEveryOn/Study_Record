<template>
  <div>
    <h2>숫자 더하기</h2>
    <input type="number" v-model="num1" placeholder="첫 번째 숫자" />
    <input type="number" v-model="num2" placeholder="두 번째 숫자" />

    <p>합계: {{ sum }}</p>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      num1: 0,
      num2: 0,
    };
  },
  computed: {
    sum: function () {
      return this.num1 + this.num2;
    },
  },
};
</script>
