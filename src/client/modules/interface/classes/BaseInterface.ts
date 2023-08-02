import { CombineProducers, Producer } from "@rbxts/reflex";
import { Element } from "@rbxts/roact";
import { UseProducerHook } from "@rbxts/roact-reflex";

export interface BaseProducer extends UseProducerHook<CombineProducers<{ [key: string]: Producer; }>> {
    // Add any additional properties or methods specific to BaseProducer here, if needed
}

export interface IBaseInterface {
    name: string;
    
    onRootProducerCreated?(producer : Producer) : void;
    element: () => Element;
    getProducer() : Producer;
};

export class BaseInterface {
    constructor(private producer: Producer) {};

    getProducer() : Producer {
        return this.producer
    }
};