import { defineStore } from 'pinia';

export interface ISettingsItem {
  count: number;
  color: string;
  visibility: boolean;
}

interface ISettingsActions {
  changeCount: (settingsIndex: number, settingsItemIndex: number, count: number) => void;
  changeColor: (settingsIndex: number, settingsItemIndex: number, color: string) => void;
  changeVisibility: (settingsIndex: number, settingsItemIndex: number, value: boolean) => void;
  changeAllVisibility: (settingsIndex: number, value: boolean) => void;
  changeMix: (settingsIndex: number, value: boolean) => void;
  deleteBlock: (settingsIndex: number, settingsItemIndex: number) => void;
}
interface ISettingsState {
  settings: ISettingsItem[][];
  mix: boolean[];
}

export const useSettingsStore = defineStore('settings', {
  state: (): ISettingsState => ({
    settings: [
      [
        { count: 0, color: '#ff2d00', visibility: false },
        { count: 0, color: '#cf4dff', visibility: false },
        { count: 0, color: '#4dff76', visibility: false },
      ],
      [
        { count: 0, color: '#c1ff4d', visibility: false },
        { count: 0, color: '#ffea4d', visibility: false },
        { count: 0, color: '#ff9a4d', visibility: false },
      ],
      [
        { count: 0, color: '#ff6a4d', visibility: false },
        { count: 0, color: '#ff4d4d', visibility: false },
        { count: 0, color: '#ff4d6d', visibility: false },
      ],
      [
        { count: 0, color: '#ff4df6', visibility: false },
        { count: 0, color: '#cf4dff', visibility: false },
        { count: 0, color: '#7c4dff', visibility: false },
      ],
      [
        { count: 0, color: '#38548a', visibility: false },
        { count: 0, color: '#38798a', visibility: false },
        { count: 0, color: '#23b857', visibility: false },
      ],
    ],
    mix: [false, false, false, false, false],
  }),
  actions: {
    changeCount(settingIndex: number, settingsItemIndex: number, count: number) {
      const countMax = 1000;

      if (count <= countMax) {
        this.settings[settingIndex][settingsItemIndex].count = count;
      }
    },
    changeColor(settingIndex: number, settingsItemIndex: number, color: string) {
      this.settings[settingIndex][settingsItemIndex].color = color;
    },
    changeVisibility(settingIndex: number, settingsItemIndex: number, value: boolean) {
      this.settings[settingIndex][settingsItemIndex].visibility = value;
    },
    changeAllVisibility(settingIndex: number, value: boolean) {
      this.settings[settingIndex].forEach((settingsItem: ISettingsItem) => {
        settingsItem.visibility = value;
      });
    },
    changeMix(settingIndex: number, value: boolean) {
      this.mix[settingIndex - 1] = value;
    },
    deleteBlock(settingIndex: number, settingsItemIndex: number) {
      this.settings[settingIndex][settingsItemIndex].count -= 1;
    },
  },
});

export type SettingsStore = ReturnType<typeof useSettingsStore> & ISettingsActions;
