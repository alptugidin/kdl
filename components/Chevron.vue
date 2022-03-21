<template>
  <div :class="direction">
    <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"
         class="custom-chevron hover:cursor-pointer">
      <path
          d="M19.5 38.5C29.9934 38.5 38.5 29.9934 38.5 19.5C38.5 9.00659 29.9934 0.5 19.5 0.5C9.00659 0.5 0.5 9.00659 0.5 19.5C0.5 29.9934 9.00659 38.5 19.5 38.5Z"
          fill="white" stroke="#DBDBDB"/>
      <path
          d="M13.7189 18.5227L21.1611 10.6577C21.6755 10.1141 22.5073 10.1141 23.0162 10.6577L24.2529 11.9647C24.7673 12.5083 24.7673 13.3873 24.2529 13.9251L18.9777 19.5L24.2529 25.0749C24.7673 25.6185 24.7673 26.4975 24.2529 27.0353L23.0162 28.3423C22.5018 28.8859 21.67 28.8859 21.1611 28.3423L13.7189 20.4773C13.2045 19.9453 13.2045 19.0663 13.7189 18.5227Z"
          fill="#4A4A4A" :transform="rotate"/>
    </svg>

  </div>
</template>

<script>
export default {
  name: "Chevron",
  props: ["direction", "rotate"]
}
</script>

<style scoped>
.custom-chevron:hover {
  filter: drop-shadow(0 1px 6px rgb(32 33 36 / 30%));
}

/*rotate(180, 19.5, 19.5)*/

</style>