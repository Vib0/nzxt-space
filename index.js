import { createApp } from 'vue'
import TripleInfographic from './components/triple-infographic.js'
import Configuration from './components/configuration.js'

const params = new URLSearchParams(window.location.search);
const isKraken = params.get('kraken') === '1';

createApp(isKraken ? TripleInfographic : Configuration).mount('#app')
