import { ref } from 'vue';
import Infographic from './infographic.js'
import Space from './space.js'

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
    <div class="p-10 flex items-center justify-center min-h-screen gap-10">
      <Space class="absolute" />
      <Infographic class="flex-1" kind="cpu" :monitoringData="monitoringData"/>
      <Infographic class="flex-1" kind="gpu" :monitoringData="monitoringData"/>
    </div>
  `
}

