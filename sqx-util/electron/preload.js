import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  runModule: (moduleName, payload) => ipcRenderer.invoke('run-module', { moduleName, payload })
});
