import { RootState } from "../../root.producer";
export const selectMenuVisibility = (state : RootState) => {
    return state.menu.visible;
};

export const selectMenuPage = (state : RootState) => {
    return state.menu.page;
}