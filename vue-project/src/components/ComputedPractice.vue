<template>
  <div>
    <h2>Computed vs Methods 성능 비교</h2>

    <div>
      <label>숫자 입력: </label>
      <input type="number" v-model="number" />
    </div>

    <div>
      <label>관련없는 텍스트: </label>
      <input v-model="randomText" />
    </div>

    <div>
      <h3>Computed (캐싱됨)</h3>
      <p>1번째: {{ heavyComputed }}</p>
      <p>2번째: {{ heavyComputed }}</p>
      <p>3번째: {{ heavyComputed }}</p>

      <h3>Methods (매번 계산)</h3>
      <p>1번째: {{ heavyMethod() }}</p>
      <p>2번째: {{ heavyMethod() }}</p>
      <p>3번째: {{ heavyMethod() }}</p>
    </div>

    <p>👀 콘솔을 확인해보세요!</p>
  </div>
</template>

<script>
export default {
  name: "ComputedPractice",
  data() {
    return {
      number: 3,
      randomText: "practice",
    };
  },

  computed: {
    heavyComputed() {
      console.log("🟢 COMPUTED 실행됨!");

      let num = this.number;
      for (let i = 1; i <= 3; i++) {
        num *= num;
      }
      return num;
    },
  },

  methods: {
    heavyMethod() {
      console.log("🔴 METHOD 실행됨!");

      let num = this.number;
      for (let i = 1; i <= 3; i++) {
        num *= num;
      }

      return num;
    },
  },
};
</script>
