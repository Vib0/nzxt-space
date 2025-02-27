import ProgressBar from './progress-bar.js';

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
      };

      if (this.kind === "cpu") {
        return this.monitoringData.cpus[0];
      } 
      else if (this.kind === "gpu") {
        const gpus = this.monitoringData.gpus;
        if (gpus.length > 1) {
          const [mainGpu] = gpus.filter(gpu => !gpu.name.includes('Graphics') && !gpu.name.includes('Display'));
          return mainGpu;
        } else {
          return gpus[0];
        }
      } 
      else if (this.kind === "ram") {
        const ram = this.monitoringData.ram;
        const module = ram.modules[0];

        return {
          name: `${Math.round(ram.totalSize / 1024)+1}GB ${module.kind} ${module.model.split(" ")[0]}`,
          load: ram.inUse / ram.totalSize,
          temperature: ram.totalSize / 1024,
        };
      }
    },
    name() { return this.instance.name.replace("NVIDIA GeForce", ""); },
    load() { return Math.round(this.instance.load * 100); },
    temp() { return Math.round(this.instance.temperature); },
  },
  template: `
    <div class="text-2xl flex flex-col bg-white/5 backdrop-blur-sm rounded-lg gap-1 p-4">
      <div class="flex flex-row gap-2">
        <i :class="['text-4xl', 'bi', kind === 'cpu' ? 'bi-cpu' : kind === 'gpu' ? 'bi-gpu-card' : 'bi-memory']"></i>
        <p class="text-3xl font-bold">{{name}}</p>
      </div>
      <ProgressBar :progress="load"/>
      <div class="flex flex-row justify-between">
        <p class="font-regular text-4xl">{{load}}%</p>
        <p>{{temp}}{{ kind === 'ram' ? 'GB' : '°C' }}</p>
      </div>
    </div>
  `
};

