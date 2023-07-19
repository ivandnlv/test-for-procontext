import { defineStore } from 'pinia';

interface IListItem {
  count: number;
  color: string;
  visibility: boolean;
}
interface IListsActions {
  changeCount: (listIndex: number, listItemIndex: number, count: number) => void;
  changeColor: (listIndex: number, listItemIndex: number, color: string) => void;
  changeVisibility: (listIndex: number, listItemIndex: number, value: boolean) => void;
  changeAllVisibility: (listIndex: number, value: boolean) => void;
}
interface IListsState {
  lists: IListItem[][];
}

export const useListsStore = defineStore('lists', {
  state: (): IListsState => ({
    lists: [
      [
        { count: 0, color: '#ffffff', visibility: false },
        { count: 0, color: '#ffffff', visibility: false },
        { count: 0, color: '#ffffff', visibility: false },
      ],
      [
        { count: 0, color: '#ffffff', visibility: false },
        { count: 0, color: '#ffffff', visibility: false },
        { count: 0, color: '#ffffff', visibility: false },
      ],
      [
        { count: 0, color: '#ffffff', visibility: false },
        { count: 0, color: '#ffffff', visibility: false },
        { count: 0, color: '#ffffff', visibility: false },
      ],
      [
        { count: 0, color: '#ffffff', visibility: false },
        { count: 0, color: '#ffffff', visibility: false },
        { count: 0, color: '#ffffff', visibility: false },
      ],
      [
        { count: 0, color: '#ffffff', visibility: false },
        { count: 0, color: '#ffffff', visibility: false },
        { count: 0, color: '#ffffff', visibility: false },
      ],
    ],
  }),
  actions: {
    changeCount(listIndex: number, listItemIndex: number, count: number) {
      this.lists[listIndex][listItemIndex].count = count;
    },
    changeColor(listIndex: number, listItemIndex: number, color: string) {
      this.lists[listIndex][listItemIndex].color = color;
    },
    changeVisibility(listIndex: number, listItemIndex: number, value: boolean) {
      this.lists[listIndex][listItemIndex].visibility = value;
    },
    changeAllVisibility(listIndex: number, value: boolean) {
      this.lists[listIndex].forEach((listItem: IListItem) => {
        listItem.visibility = value;
      });
    },
  },
});

export type ListsState = ReturnType<typeof useListsStore> & IListsActions;
