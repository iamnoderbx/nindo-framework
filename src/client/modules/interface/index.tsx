import Roact from "@rbxts/roact";
import { withHookDetection, withHooks } from "@rbxts/roact-hooked";
import { ReflexProvider } from "@rbxts/roact-reflex";
import { Players } from "@rbxts/services";
import { Start } from "shared/core-framework/core";

import { IBaseInterface } from "./classes/BaseInterface";
import { InterfaceSlices, producer } from "./root.producer";

const LocalPlayer = Players.LocalPlayer as Player;

class RootInterface implements Start {
    tree: any;

    playerGui: PlayerGui | undefined;
    interface: ScreenGui | undefined;

    Start(): void {
        withHookDetection(Roact);

        this.playerGui = LocalPlayer.WaitForChild("PlayerGui") as PlayerGui
        
        this.interface = new Instance("ScreenGui");
        this.interface.Parent = this.playerGui;
        this.interface.IgnoreGuiInset = true;
        this.interface.Name = 'Interface';
        
        this.interface.ZIndexBehavior = Enum.ZIndexBehavior.Sibling

        Roact.mount(
            <ReflexProvider producer={producer}>
                {InterfaceSlices.map((slice: IBaseInterface) => {
                    const Hooked = withHooks(slice.element);
                    return <Hooked />;
                })}

            </ReflexProvider>,
            this.interface
        );

    }
};

export default RootInterface