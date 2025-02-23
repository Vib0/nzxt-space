export default {
  props: ['progress'],
  template: `
    <div class="w-full bg-gray-700 rounded-sm h-4 overflow-hidden">
      <div
        class="h-full bg-white transition-all duration-300 ease-in-out"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
  `
}
