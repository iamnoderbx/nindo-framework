import { RootState } from "client/modules/interface/root.producer";

export const selectInventoryContents = (state : RootState) => {
    return state.contents.containers;
};
