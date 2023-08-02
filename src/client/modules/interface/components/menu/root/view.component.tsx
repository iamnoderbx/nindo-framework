import Roact, { Element } from "@rbxts/roact";
import { markPureComponent } from "@rbxts/roact-hooked";

interface ImageProps extends Roact.JsxInstance<ImageLabel> {}

export function VignetteViewShading(props : ImageProps) : Element {
    return <imagelabel
        Key={"view"}
        Image={"rbxassetid://6891912132"}
        ImageColor3={Color3.fromRGB(141, 141, 141)}
        ImageTransparency={props.ImageTransparency || 0.76}
        AnchorPoint={new Vector2(0.5, 0.5)}
        BackgroundColor3={Color3.fromRGB(255, 255, 255)}
        BackgroundTransparency={1}
        Position={UDim2.fromScale(0.5, 0.5)}
        Size={UDim2.fromScale(1, 1)}
        ZIndex={0}
    />
}

markPureComponent(VignetteViewShading)