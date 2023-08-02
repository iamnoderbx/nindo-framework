import Roact, { Binding, Element } from "@rbxts/roact"
import { markPureComponent } from "@rbxts/roact-hooked"

/* The `interface FrameProps` is defining a new interface in TypeScript. It extends the
`Roact.JsxInstance<Frame>` interface, which means it inherits all the properties and methods from
that interface. This interface is used to define the props that can be passed to the `Frame`
component in Roact. */

interface FrameProps extends Roact.JsxInstance<Frame> {}

/* The `interface ProgressBarProps` is defining a new interface in TypeScript. It extends the
`Roact.JsxInstance<Frame>` interface, which means it inherits all the properties and methods from
that interface. Additionally, it adds three new properties: `Header` of type `string`, `Color` of
type `Color3`, and `Value` of type `number`. These properties define the props that can be passed to
the `LinearProgressBar` component. */

interface ProgressBarProps extends Roact.JsxInstance<Frame> {
    Header: string,
    Color: Color3,
    Value: number,
}

/* The `interface ProgressBarHeaderProps` is defining a new interface in TypeScript. It extends the
`Roact.JsxInstance<TextLabel>` interface, which means it inherits all the properties and methods
from that interface. Additionally, it adds a new property called `Header` of type `string`. This
interface is used to define the props that can be passed to the `ProgressHeaderLabel` component. */

interface ProgressBarHeaderProps extends Roact.JsxInstance<TextLabel> {
    Header: string,
}

/**
 * The function `ProgressHeaderLabel` returns a React element representing a text label with specific
 * styling and properties.
 * @param {ProgressBarHeaderProps} props - The `props` parameter is an object of type
 * `ProgressBarHeaderProps`. It contains the following properties:
 */

function ProgressHeaderLabel(props : ProgressBarHeaderProps) : Element {
    return <textlabel
        FontFace={new Font(
            "rbxasset://fonts/families/SourceSansPro.json",
            Enum.FontWeight.SemiBold,
            Enum.FontStyle.Normal
        )}
        Text={props.Header}
        TextColor3={Color3.fromRGB(157, 157, 157)}
        TextScaled={true}
        TextSize={14}
        TextWrapped={true}
        TextXAlignment={Enum.TextXAlignment.Left}
        BackgroundColor3={Color3.fromRGB(255, 255, 255)}
        BackgroundTransparency={1}
        BorderColor3={Color3.fromRGB(0, 0, 0)}
        BorderSizePixel={0}
        Position={UDim2.fromScale(0.0277, 0.206)}
        Size={UDim2.fromScale(0.468, 0.444)}
    />
}

markPureComponent(ProgressHeaderLabel)

/* The `ProgressBarContainer` function is a React component that serves as a container for other
components. It takes in a single prop `props` of type `FrameProps`, which represents the properties
of a Roact `Frame` component. */

function ProgressBarContainer(props : FrameProps) : Element {
    const children = props[Roact.Children]

    return <frame
        BackgroundColor3={Color3.fromRGB(255, 255, 255)}
        BackgroundTransparency={1}
        BorderColor3={Color3.fromRGB(0, 0, 0)}
        BorderSizePixel={0}
        LayoutOrder={-1}
        Position={UDim2.fromScale(0.0235, 0)}
        Size={props.Size || new UDim2(1, -20, 0.371, 0)}
    >
        {children}
    </frame>
}

export function LinearProgressBar(props : ProgressBarProps) : Element {
    return <ProgressBarContainer Size={props.Size}>
        <frame
            BackgroundColor3={Color3.fromRGB(44, 44, 44)}
            BackgroundTransparency={0.3}
            BorderColor3={Color3.fromRGB(0, 0, 0)}
            BorderSizePixel={0}
            Position={UDim2.fromScale(0.0277, 0.862)}
            Size={UDim2.fromScale(0.951, 0.138)}
        >
            <frame
                AnchorPoint={new Vector2(0, 0.5)}
                BackgroundColor3={props.Color}
                BorderColor3={Color3.fromRGB(0, 0, 0)}
                BorderSizePixel={0}
                Position={UDim2.fromScale(0, 0.5)}
                Size={UDim2.fromScale(props.Value, 1)}
            >
                <uicorner CornerRadius={new UDim(1, 0)}/>

                <uigradient
                    Color={new ColorSequence([
                        new ColorSequenceKeypoint(0, Color3.fromRGB(255, 255, 255)),
                        new ColorSequenceKeypoint(1, Color3.fromRGB(177, 177, 177)),
                    ])}

                    Rotation={90}
                />
            </frame>

            <uicorner CornerRadius={new UDim(1, 0)}/>
        </frame>

        <ProgressHeaderLabel Header={props.Header} />
        <uiaspectratioconstraint
            Key={"uIAspectRatioConstraint"}
            AspectRatio={10.9}
        />
    </ProgressBarContainer>
};