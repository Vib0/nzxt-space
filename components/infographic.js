import ProgressBar from './progress-bar.js'

export default {
  props: ['kind', 'monitoringData'],
  components: {
    ProgressBar
  },
  computed: {
    instance() {
      if (!this.monitoringData) return {
        name: "...",
        load: 0,
        temperature: 0,
      }

      if (this.kind === "cpu") {
        return this.monitoringData.cpus[0]
      }
      else if (this.kind === "gpu") {
        const gpus = this.monitoringData.gpus;
        if (gpus.length > 1) {
          const [mainGpu] = gpus.filter(gpu => !gpu.name.includes('Graphics') && !gpu.name.includes('Display'))
          return mainGpu;
        } else {
          return gpus.pop();
        }
      }
    },
    name() { return this.instance.name.replace("NVIDIA GeForce", "") },
    load() { return Math.round(this.instance.load * 100) },
    temp() { return Math.round(this.instance.temperature) },
  },
  template: `
    <div class="text-2xl flex flex-col gap-2">
      <div class="flex flex-row gap-4">
        <i :class="['text-4xl', 'bi', kind === 'cpu' ? 'bi-cpu' : 'bi-gpu-card']"></i>
        <p class="text-4xl font-bold">{{name}}</p>
      </div>
      <ProgressBar :progress="load"/>
      <div class="flex flex-row justify-between">
        <p class="font-regular text-4xl">{{load}}%</p>
        <p>{{temp}}°C</p>
      </div>
    </div>
  `
}
