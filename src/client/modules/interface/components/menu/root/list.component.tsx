import Roact, { Element } from "@rbxts/roact";
import { markPureComponent } from "@rbxts/roact-hooked";

interface FrameProps extends Roact.JsxInstance<Frame> {}

export function ButtonListHolder(props : FrameProps) : Element {
    const children = props[Roact.Children]

    return <frame
        Key={"frame"}
        AnchorPoint={new Vector2(1, 0.5)}
        BackgroundColor3={Color3.fromRGB(255, 255, 255)}
        BackgroundTransparency={1}
        BorderColor3={Color3.fromRGB(0, 0, 0)}
        BorderSizePixel={0}
        Position={UDim2.fromScale(0.983, 0.499)}
        Size={UDim2.fromOffset(610, 51)}
    >
        <uilistlayout
            Key={"uIListLayout1"}
            Padding={new UDim(0, 5)}
            FillDirection={Enum.FillDirection.Horizontal}
            HorizontalAlignment={Enum.HorizontalAlignment.Right}
            SortOrder={Enum.SortOrder.LayoutOrder}
            VerticalAlignment={Enum.VerticalAlignment.Center}
        />
        {children}
    </frame>
}

markPureComponent(ButtonListHolder)