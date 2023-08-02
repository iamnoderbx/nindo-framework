import { createProducer } from "@rbxts/reflex";
import { ItemContainer } from "shared/schemas/items/item";

export interface InventoryContainer {
	readonly containers: ItemContainer[];
}

const initialState: InventoryContainer = {
	containers: [
        {
            name: "inventory",
            contents: [
                {
                    name: "Musket", uuid: "test", 
                    dimension: {x: 1, y: 1, cell: {x: 1, y: 1}}
                }
            ],
        },
    ],
}

export const inventoryContainerProducer = createProducer(initialState, {
    updateInventoryContainers: (state : InventoryContainer, containers : ItemContainer[]) => ({
        ...state, containers,
    }),
});