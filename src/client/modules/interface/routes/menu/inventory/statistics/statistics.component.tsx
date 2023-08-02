import Roact from "@rbxts/roact";
import { useSelector } from "@rbxts/roact-reflex";
import { PrimaryBackgroundFrame } from "client/modules/interface/components/universal/frames/primary.background.component";
import { PrimaryHolderFrame } from "client/modules/interface/components/universal/frames/primary.holder.component";
import { HorizontalCentered } from "client/modules/interface/components/universal/hcenter.component";
import { TextInformationLabel } from "client/modules/interface/components/universal/menus/information.component";
import { LinearProgressBar } from "client/modules/interface/components/universal/menus/progress.component";
import { VerticalCentered } from "client/modules/interface/components/universal/vcenter.component";
import { Offset } from "client/modules/interface/globals";
import { selectHealthState, selectLevelState, selectNutrientStates } from "./statistics.selectors";
import { HealthState, LevelState } from "./statistics.producer";
import { DefaultLayoutOrder } from "client/modules/interface/components/universal/vlayout.component";

export function StatisticComponent() {
    const health : HealthState = useSelector(selectHealthState);
    const level : LevelState = useSelector(selectLevelState)
    const { thirst, hunger } = useSelector(selectNutrientStates);

    return (
        <PrimaryHolderFrame>
            <DefaultLayoutOrder VerticalAlignment={Enum.VerticalAlignment.Bottom} Padding={new UDim(0, 10)}/>

            <PrimaryBackgroundFrame Size={UDim2.fromScale(1, 0.139)} Offset={Offset.CenteredBottom}>
                <uicorner/>
                <PrimaryHolderFrame Size={new UDim2(0.998, 0, 0.803, 0)}>
                    { /* Level Progress Bar */ }
                    <LinearProgressBar Header={`Level ${level.level}`} Size={UDim2.fromScale(0.953, 0.74)} Color={Color3.fromRGB(56, 70, 116)} Value={level.experience / level.required} />
                </PrimaryHolderFrame>
            </PrimaryBackgroundFrame>

            <PrimaryBackgroundFrame Size={UDim2.fromScale(1, 0.3)} Offset={Offset.CenteredBottom}>
                <uicorner/>

                <PrimaryHolderFrame Offset={Offset.CenteredTop}>
                    <VerticalCentered Padding={new UDim(0, 15)} />
                    
                    { /* Health Progress Bar */ }
                    <LinearProgressBar Header="Health" Color={Color3.fromRGB(116, 57, 57)} Value={health.value / health.max} />
                    
                    { /* Hunger and Thirst Statistics Labels */ }
                    <PrimaryHolderFrame Size={UDim2.fromScale(0.953, 0.5)}>
                        <HorizontalCentered Padding={new UDim(0, 0)} />

                        <TextInformationLabel Header="Hunger" Body={hunger} />
                        <TextInformationLabel Header="Thirst" Body={thirst} />

                    </PrimaryHolderFrame>
                </PrimaryHolderFrame>
            </PrimaryBackgroundFrame>
        </PrimaryHolderFrame>
    )
};
