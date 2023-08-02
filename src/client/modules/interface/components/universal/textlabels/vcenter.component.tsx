import Roact, { Element } from "@rbxts/roact";
import { markPureComponent } from "@rbxts/roact-hooked";

export function VerticalCentered() : Element {
    return <uilistlayout 
        FillDirection={"Vertical"} 
        HorizontalAlignment={"Center"} 
        VerticalAlignment={"Center"}
        Padding={new UDim(0, 5)}
    />
}

markPureComponent(VerticalCentered)