import Roact, { Element } from "@rbxts/roact"
import { markPureComponent } from "@rbxts/roact-hooked";
import { InterfaceGlobals } from "client/modules/interface/globals";

interface TextlabelProps extends Roact.JsxInstance<TextLabel> {
    Margin?: (UDim2 | UDim2[])
}

export function CenteredTextlabelLight(props : TextlabelProps) : Element {
    const children = props[Roact.Children]
    let margin = new UDim2()

    if (props.Margin && (type(props.Margin) === "table")) {
        const marginArray = props.Margin as UDim2[];
        for (const marginValue of marginArray) {
            margin = margin.add(marginValue)
        };
    } else if (props.Margin !== undefined) {
        const marginAdd = props.Margin as UDim2
        margin = margin.add(marginAdd)
    };

    return (
        <textlabel 
            BackgroundTransparency={InterfaceGlobals.TextLabel.BackgroundTransparency} 
            Text={props.Text} 
            TextColor3={InterfaceGlobals.TextLabel.Light.TextColor3}
            AnchorPoint={InterfaceGlobals.CenterPoint}
            Position={InterfaceGlobals.CenterPosition}
            Font={"SourceSans"}
            Size={props.Size || new UDim2(1, 0, 1, 0).add(margin)}
            TextScaled={true}
        >
            
            {children}
        </textlabel>
    )
}

markPureComponent(CenteredTextlabelLight)