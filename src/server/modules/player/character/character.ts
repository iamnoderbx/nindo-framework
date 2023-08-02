import { Workspace } from "@rbxts/services"; 
import { PlayerImplementation } from "..";

class Character {
    constructor(private player : PlayerImplementation) {}

    /**
     * This function returns a Humanoid object if the character exists, otherwise it returns undefined.
     * @returns The `getHumanoid()` function returns a `Humanoid` object if the character exists and
     * has a child named "Humanoid", otherwise it returns `undefined`.
     */

    getHumanoid() : Humanoid | undefined {
        return (this.doesCharacterExist()
            && this.getCharacter()?.WaitForChild("Humanoid") as Humanoid) || undefined
    }

    /**
     * This function returns the HumanoidRootPart of a character if it exists, or undefined if it does
     * not.
     * @returns The method `getHumanoidRootPart()` returns a `BasePart` object if the character exists
     * and has a child named "HumanoidRootPart", or `undefined` if either of those conditions are not
     * met...
     */

    getHumanoidRootPart() : BasePart | undefined {
        return (this.doesCharacterExist() && 
            this.getCharacter()?.WaitForChild("HumanoidRootPart") as BasePart) || undefined
    }

    /**
     * The function checks if a character exists in the Workspace and returns a boolean value.
     * @returns A boolean value. The expression `(this.getCharacter() && this.getCharacter()?.Parent ==
     * Workspace)` checks if the `getCharacter()` method returns a truthy value and if its `Parent`
     * property is equal to `Workspace`. If both conditions are true, the expression evaluates to
     * `true`. Otherwise, it evaluates to `false`. The `|| false` part ensures that the function always
     * returns a
     */

    doesCharacterExist() : boolean {
        return (this.getCharacter() && this.getCharacter()?.Parent === Workspace) || false
    }

    /**
     * This function returns the character model of the player or undefined if it doesn't exist.
     * @returns The `getCharacter()` method is returning the `Character` property of the `player`
     * object of the `Model` type. If the `Character` property is not defined, it will return
     * `undefined`.
     */

    getCharacter() : Model | undefined {
        return this.player.player.Character
    }
}

export default Character