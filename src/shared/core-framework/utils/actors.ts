import { Players, ReplicatedStorage, RunService, Workspace } from "@rbxts/services";

declare global {
    interface shared {
        test: number
    }
}

export interface Thread {
    Thread(_: unknown) : void;
    __id?: string
    __folder?: Folder
    __indexQueue?: number,
    cores?: number
}

export interface ParallelSettings {
    Cores: number
}

/**
 * 
 *   class ActorTest extends BaseActor implements Thread {
 *       constructor() {
 *           super({ Cores: 10 });
 *       }
 *
 *       Thread() {
 *       
 *       }
 *   };
 *
 * 
 */

/**
 * 
 * const handler = new ParallelExecutor()
 *      .thread(this.numberTest)
 * 
 * handler.invoke()?.then(function() { }
 * 
 */
export class ParallelExecutor {
    private __thread: BaseActor | undefined;
    pool: unknown[];

    constructor() {
        this.pool = [];
    }

    thread(thread: BaseActor) {
        this.__thread = thread;
        return this
    }

    invoke() {
        if(!this.__thread) return;
        return this.__thread.thread()
    }

    addThreadPool(pool: unknown[]) {
        this.pool = pool;
        return this;
    }

    invokePool() {
        if(!this.__thread) return;

        const res : Array<unknown> = [];
        const goal_size = this.pool.size();
        if(goal_size === 0) return;

        let cSize = 0;

        let promise = new Promise((resolve) => {
            for (let i = 0; i < goal_size; i++) {
                this.__thread?.thread(this.pool[i])?.then(function(_res) {
                    res[i] = _res

                    cSize++;

                    if(cSize === goal_size) {
                        resolve(res);
                    }
                });
            };
        })
        
        return promise
    }
};

export class BaseActor {
    cores: number;
    __id?: string;
    __indexQueue?: number;

    constructor(settings: ParallelSettings) {
        this.cores = settings.Cores;
    }

    thread(...args : Array<unknown>) {
        const map = ActorData.map.get(this.__id) as Thread;
        if(!map || !map.__indexQueue || !map.__folder) return;

        map.__indexQueue++;

        if(map.__indexQueue > map.__folder?.GetChildren().size() - 1) {
            map.__indexQueue = 1;
        };

        const actor : Actor = map.__folder.GetChildren()[map.__indexQueue] as Actor
        actor.SendMessage("ignite", args)

        let event = actor.FindFirstChildWhichIsA("BindableEvent")

        return new Promise((resolve) => {
            const res = event?.Event.Wait()
            resolve(res);
        });
    }
}

namespace ActorData {
    export let map = new Map();
}

namespace ActorHandler {
    function createActorsContainer(id: string, actor: Thread) : Folder {
        let container
        
        if(RunService.IsClient()) {
            container = Players.LocalPlayer.WaitForChild("PlayerScripts")

            container = container.FindFirstChild("Actors") || new Instance("Folder")
            container.Parent = Players.LocalPlayer.FindFirstChild("PlayerScripts")
            container.Name = "Actors"
        }

        actor.__folder = new Instance("Folder")
        actor.__folder.Parent = container
        actor.__folder.Name = id;

        return actor.__folder
    }

    function createActor(folder : Folder) : Actor {
        const objects : Folder = ReplicatedStorage.WaitForChild("objects") as Folder
        const actorTemplate : Actor = objects.WaitForChild("Actor") as Actor

        const newActor : Actor = actorTemplate.Clone();
        newActor.Parent = folder
        newActor.Name = folder.Name

        return actorTemplate
    };

    export function HandleActorCreation(id: string, actor: Thread, thread: LuaSourceContainer) {
        if(!actor.cores) return;
        actor.__id = id;

        const folder: Folder = createActorsContainer(id, actor)
        thread.Clone().Parent = folder;

        actor.__folder = folder;
        actor.__indexQueue = 1;

        ActorData.map.set(id, actor);

        for (let i = 0; i < actor.cores; i++) {
            const actor: Actor = createActor(folder);
            const container: LocalScript = actor.WaitForChild("Core") as LocalScript
            container.Enabled = true;
            container.Disabled = false;
        }
    }
};

export { ActorHandler, ActorData }