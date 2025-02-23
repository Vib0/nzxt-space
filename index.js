import { createApp } from 'vue'
import DualInfographic from './components/dual-infographic.js'
import Configuration from './components/configuration.js'

const params = new URLSearchParams(window.location.search);
const isKraken = params.get('kraken') === '1';

createApp(isKraken ? DualInfographic : Configuration).mount('#app')
