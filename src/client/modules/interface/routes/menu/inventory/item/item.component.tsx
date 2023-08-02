import Roact, { Element } from "@rbxts/roact";
import { PrimaryBackgroundFrame } from "client/modules/interface/components/universal/frames/primary.background.component";

export function ItemContentComponent() : Element {
    return (
        <PrimaryBackgroundFrame Size = {UDim2.fromScale(1, 0.389)} LayoutOrder={2}>
            <uicorner />
        </PrimaryBackgroundFrame>
    )
}