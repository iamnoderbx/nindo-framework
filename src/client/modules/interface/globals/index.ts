export namespace InterfaceGlobals {
    export let CenterPoint = new Vector2(0.5, 0.5)
    export let CenterPosition = new UDim2(0.5, 0, 0.5, 0)

    export namespace Universal {
        export namespace Primary {
            export let BackgroundColor = Color3.fromRGB(9, 10, 13)
        }

        export let BackgroundColor = Color3.fromRGB(0, 0, 0)
        
    }

    export namespace TextLabel {
        export namespace Primary {

        }

        export namespace Light {
            export let TextColor3 = Color3.fromRGB(185, 185, 185);
        }

        export let BackgroundTransparency = 1;
    }

    export namespace Frame {
        export namespace Primary {
            export let BackgroundTransparency = 0.7;
        }
    }
};

export namespace Margin {
    export namespace Vertical {
        export let Small: UDim2 = new UDim2(0, 0, -0.1, 0)
        export let Medium: UDim2 = new UDim2(0, 0, -0.25, 0)
        export let Half: UDim2 = new UDim2(0, 0, -0.5, 0)
        export let Large: UDim2 = new UDim2(0, 0, -0.6, 0)
        export let Largest: UDim2 = new UDim2(0, 0, -0.75, 0)
    };

    export namespace Horizontal {
        export let Small: UDim2 = new UDim2(-0.1, 0, 0, 0)
        export let Medium: UDim2 = new UDim2(-0.25, 0, 0, 0)
        export let Half: UDim2 = new UDim2(-0.5, 0, 0, 0)
        export let Large: UDim2 = new UDim2(-0.6, 0, 0, 0)
        export let Largest: UDim2 = new UDim2(-0.75, 0, 0, 0)
    }
};

export interface IOffset {
    anchor: {x: number, y: number};
    position: {x: number, y: number};
}

export namespace Offset {
    export let CenteredBottom: IOffset = {
        anchor: {x: 0.5, y: 1},
        position: {x: 0.5, y: 1},
    }

    export let CenteredTop: IOffset = {
        anchor: {x: 0.5, y: 0},
        position: {x: 0.5, y: 0},
    }
};