import Roact, { Element } from "@rbxts/roact";
import { markPureComponent } from "@rbxts/roact-hooked";

interface FrameProps extends Roact.JsxInstance<Frame> {
    id?: string,
}

export function PrimaryBodyBox(props : FrameProps) : Element {
    const children = props[Roact.Children]

    return <frame
        Key={"body"}
        AnchorPoint={new Vector2(0.5, 0)}
        BackgroundColor3={Color3.fromRGB(255, 255, 255)}
        BackgroundTransparency={1}
        BorderColor3={Color3.fromRGB(0, 0, 0)}
        BorderSizePixel={0}
        Position={UDim2.fromScale(0.5, 0)}
        Size={UDim2.fromScale(1, 0.845)}
    > 
    {children}
    </frame>
}

markPureComponent(PrimaryBodyBox)