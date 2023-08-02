import Roact, { Element } from "@rbxts/roact"
import { TextlabelHeavy } from "../../universal/textlabels/heavy.component"
import { TextlabelLight } from "../../universal/textlabels/light.component"
import { markPureComponent } from "@rbxts/roact-hooked"

interface TextlabelProps extends Roact.JsxInstance<TextLabel> {}

export function HeaderTextLabel(props : TextlabelProps) : Element {
    return (
        <TextlabelHeavy 
            Text={"PERDITION"}
            AnchorPoint={new Vector2(0, 0.5)}
            TextTransparency={0.83}
            Position={UDim2.fromScale(0.115, 0.41)}
            Size={UDim2.fromOffset(342, 35)}
        />
    )
}

markPureComponent(HeaderTextLabel)

export function SecondaryTextLabel(props : TextlabelProps) : Element {
    return <TextlabelLight 
        Text={"A PERMANENT DEATH EXPERIENCE."}
        AnchorPoint={new Vector2(0, 0.5)}
        TextTransparency={0.83}
        Position={UDim2.fromScale(0.115, 0.704)}
        Size={UDim2.fromOffset(342, 18)}
    />
}

markPureComponent(SecondaryTextLabel)