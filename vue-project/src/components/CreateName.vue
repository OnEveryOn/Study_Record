<template>
  <div>
    <h2>이름 합치기</h2>
    <input v-model="firstName" placeholder="이름" />
    <input v-model="lastName" placeholder="성" />

    <!-- 여기에 full name을 보여주세요 -->
    <p>전체 이름: {{ joinName }}</p>
  </div>
</template>

<script>
export default {
  name: "CreateName",
  data() {
    return {
      firstName: "",
      lastName: "",
    };
  },

  computed: {
    joinName: function () {
      return this.firstName + this.lastName;
    },
  },
};
</script>
