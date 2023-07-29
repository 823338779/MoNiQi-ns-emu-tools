// Utilities
import { defineStore } from 'pinia'
import {CommonResponse} from "@/types";
import {useConsoleDialogStore} from "@/store/ConsoleDialogStore";

const cds = useConsoleDialogStore()

export const useAppStore = defineStore('app', {
  state: () => ({
    targetFirmwareVersion: '' || null,
    availableFirmwareInfos: []
  }),
  getters: {
    availableFirmwareVersions(state) {
      return state.availableFirmwareInfos.map(info => info['version'])
    }
  },
  actions: {
    updateAvailableFirmwareInfos() {
        window.eel.get_available_firmware_infos()((data: CommonResponse) => {
            if (data['code'] === 0) {
              const infos = data['data']
              this.availableFirmwareInfos = infos
              this.targetFirmwareVersion = infos[0]['version']
            } else {
                cds.showConsoleDialog()
                cds.appendConsoleMessage('固件信息加载异常.')
            }
        })
    }
  }
})
