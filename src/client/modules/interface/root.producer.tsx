import { Producer, InferState, combineProducers } from "@rbxts/reflex";
import { UseSelectorHook, useSelector, UseProducerHook, useProducer } from "@rbxts/roact-reflex";

import { IBaseInterface } from "./classes/BaseInterface";
import { MenuController } from "./routes/menu/menu.producer";
import { Menu } from "./routes/menu/menu.component";
import { statisticProducer } from "./routes/menu/inventory/statistics/statistics.producer";
import { inventoryContainerProducer } from "./routes/menu/inventory/contents/contents.producer";

export const InterfaceSlices: IBaseInterface[] = [
    new MenuController(Menu),
];

const producers: { [key: string]: Producer } = {
    statistics: statisticProducer,
    contents: inventoryContainerProducer
};

InterfaceSlices.forEach((slice: IBaseInterface) => {
    producers[slice.name] = slice.getProducer();
});

export const producer = combineProducers(producers);

export type RootProducer = typeof producer;
export type RootState = InferState<RootProducer>;

export const useRootSelector: UseSelectorHook<RootProducer> = useSelector;
export const useRootProducer: UseProducerHook<RootProducer> = useProducer;

InterfaceSlices.forEach((base : IBaseInterface) => {
    base.onRootProducerCreated?.(producer);
})