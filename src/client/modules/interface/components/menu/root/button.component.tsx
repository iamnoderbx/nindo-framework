import Roact, { Element } from "@rbxts/roact"
import { PrimaryHolderFrame } from "../../universal/frames/primary.holder.component"
import { HorizontalCentered } from "../../universal/hcenter.component"
import { UICorner } from "../../universal/corner.component"

interface FrameProps extends Roact.JsxInstance<Frame> {
    icon? : string,
    name? : string,
}

export function HeaderImageText(props : Roact.JsxInstance<TextLabel>) {
    return <textlabel
        FontFace={new Font("rbxasset://fonts/families/SourceSansPro.json")}
        Text={props.Text}
        TextColor3={Color3.fromRGB(156, 156, 156)}
        TextScaled={true}
        TextSize={14}
        TextTransparency={0.11}
        TextWrapped={true}
        TextXAlignment={Enum.TextXAlignment.Left}
        BackgroundColor3={Color3.fromRGB(255, 255, 255)}
        BackgroundTransparency={1}
        BorderColor3={Color3.fromRGB(0, 0, 0)}
        BorderSizePixel={0}
        Position={UDim2.fromScale(0.378, 0.3)}
        Size={UDim2.fromScale(0.528, 0.4)}
    />
}

export function HeaderImageLabel(props : Roact.JsxInstance<ImageLabel>) {
    return <imagelabel
        Image={props.Image}
        ImageColor3={Color3.fromRGB(156, 156, 156)}
        ImageTransparency={0.11}
        BackgroundColor3={Color3.fromRGB(255, 255, 255)}
        BackgroundTransparency={1}
        BorderColor3={Color3.fromRGB(0, 0, 0)}
        BorderSizePixel={0}
        Position={UDim2.fromScale(0.0779, 0.224)}
        Size={UDim2.fromScale(0.202, 0.476)}
        LayoutOrder={-1}
    />
}

export function HeaderButtonLabel(props : FrameProps) : Element {
    const children = props[Roact.Children]

    return <PrimaryHolderFrame Size={UDim2.fromScale(0.2, 0.8)}
        Event={{
            MouseEnter: () => print('mouse entered'),
        }}
    >
        <UICorner size={0.3} />
        <HorizontalCentered />

        <HeaderImageLabel Image={props.icon} />
        <HeaderImageText Text={props.name} />

    </PrimaryHolderFrame>
}