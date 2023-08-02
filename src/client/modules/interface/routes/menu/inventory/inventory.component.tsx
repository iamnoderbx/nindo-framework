import Roact, { Element } from "@rbxts/roact";

import { DefaultLayoutOrder } from "client/modules/interface/components/universal/vlayout.component";
import { PrimaryHolderFrame } from "client/modules/interface/components/universal/frames/primary.holder.component";
import { StatisticComponent } from "./statistics/statistics.component";
import { VerticalCentered } from "client/modules/interface/components/universal/vcenter.component";
import { ContentsComponent } from "./contents/contents.component";
import { PrimaryBackgroundFrame } from "client/modules/interface/components/universal/frames/primary.background.component";
import { CenteredTextlabelLight } from "client/modules/interface/components/universal/textlabels/centered.light.component";
import { ItemContentComponent } from "./item/item.component";

export function InventoryPageMenu() : Element {
    // Render the Statistics Component
    return (
        <PrimaryHolderFrame id={'inventory'} Size={new UDim2(1, -200, 1, -50)}>
            { /* Layout Order Handler used for left & right bounds */}
            <DefaultLayoutOrder Padding={new UDim(0, 10)} FillDirection={Enum.FillDirection.Horizontal} VerticalAlignment={Enum.VerticalAlignment.Bottom}/>

            { /* Left Bound Frame */ }
            <PrimaryHolderFrame Size={UDim2.fromScale(0.47, 1)}>
                <StatisticComponent />
            </PrimaryHolderFrame>

            { /* Right Bound Frame */ }
            <PrimaryHolderFrame Size={UDim2.fromScale(0.507, 1)}>
                <uiaspectratioconstraint AspectRatio={1.077} />
                <VerticalCentered Padding={new UDim(0, 2)} />
                <ContentsComponent />
                
                <PrimaryHolderFrame Size={UDim2.fromScale(1, 0.076)}>
                    { /* TODO MULTIPLE CONTAINERS IE; BACKPACKS, ETC... */ }
                    <PrimaryBackgroundFrame BackgroundTransparency={0.55}>
                        <uicorner/>
                        <CenteredTextlabelLight Size={UDim2.fromScale(1, 0.45)} Text={"Inventory"} />
                    </PrimaryBackgroundFrame>
                </PrimaryHolderFrame>

                <ItemContentComponent />
            </PrimaryHolderFrame>

        </PrimaryHolderFrame>
    )
};
