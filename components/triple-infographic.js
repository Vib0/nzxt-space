import { ref } from 'vue';
import Infographic from './infographic.js';
import Space from './space.js';

export default {
  components: {
    Infographic,
    Space
  },
  setup() {
    const monitoringData = ref(null);

    window.nzxt = {
      v1: {
        onMonitoringDataUpdate: (data) => {
          monitoringData.value = data;
        }
      }
    };

    return {
      monitoringData
    };
  },
  template: `
    <Space class="absolute" />
    <div class="p-15 flex flex-col items-center justify-center min-h-screen gap-5">
      
      <div class="flex flex-row gap-5">
        <Infographic class="flex-1" kind="cpu" :monitoringData="monitoringData"/>
        <Infographic class="flex-1" kind="ram" :monitoringData="monitoringData"/>
      </div>

      <Infographic class="w-full max-w-2xl" kind="gpu" :monitoringData="monitoringData"/>
    </div>
  `
};

