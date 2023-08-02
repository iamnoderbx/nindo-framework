import Roact, { Element } from "@rbxts/roact";
import { markPureComponent, useEffect, useState } from "@rbxts/roact-hooked";

interface FrameProps extends Roact.JsxInstance<GuiBase2d> {}

export function AspectRatioConstraint(props: FrameProps) : Element {
    const [ constraint, setConstraint ] = useState<UIAspectRatioConstraint>();

    useEffect(() => {
        if(!constraint) return;

        const baseUi = constraint.Parent as GuiBase2d
        constraint.Parent = undefined;

        let ancestoryConnection
        ancestoryConnection = baseUi.AncestryChanged.Connect(() => {
            const absoluteSize = baseUi.AbsoluteSize;

            const absoluteX = absoluteSize.X
            const absoluteY = absoluteSize.Y

            const ratio = absoluteX / absoluteY

            constraint.AspectRatio = ratio
            constraint.Parent = baseUi;
        });
    })

    return <uiaspectratioconstraint Ref={setConstraint}/>
}

export function SquareAspectRatio() : Element {
    return <uiaspectratioconstraint AspectRatio={1}></uiaspectratioconstraint>
}

markPureComponent(AspectRatioConstraint)