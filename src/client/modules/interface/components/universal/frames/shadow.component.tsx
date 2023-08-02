import Roact, { Element } from "@rbxts/roact"
import { markPureComponent } from "@rbxts/roact-hooked"

interface FrameProps extends Roact.JsxInstance<Frame> {}

export function PrimaryShadowComponent(props : FrameProps) : Element {
    const children = props[Roact.Children]

    return (
        <frame
            Key={"shadow"}
            BackgroundTransparency={1}
            Size={UDim2.fromScale(1, 1)}
            ZIndex={0}
        >
            <imagelabel
                Key={"shadow1"}
                Image={"rbxassetid://1316045217"}
                ImageColor3={Color3.fromRGB(0, 0, 0)}
                ImageTransparency={0.88}
                ScaleType={Enum.ScaleType.Slice}
                SliceCenter={new Rect(10, 10, 118, 118)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundTransparency={1}
                Position={new UDim2(0.5, 0, 0.5, 6)}
                Size={new UDim2(1, 10, 1, 10)}
                ZIndex={0}
            />

            <imagelabel
                Key={"shadow2"}
                Image={"rbxassetid://1316045217"}
                ImageColor3={Color3.fromRGB(0, 0, 0)}
                ImageTransparency={0.88}
                ScaleType={Enum.ScaleType.Slice}
                SliceCenter={new Rect(10, 10, 118, 118)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundTransparency={1}
                Position={new UDim2(0.5, 0, 0.5, 6)}
                Size={new UDim2(1, 10, 1, 10)}
                ZIndex={0}
            />
            {children}
        </frame>
    )
}

markPureComponent(PrimaryShadowComponent)