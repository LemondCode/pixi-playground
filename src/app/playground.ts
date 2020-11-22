import { Application, Sprite, Loader } from 'pixi.js';

export class PixiPlayground {
    private app: Application;
    private sprites: Sprite[] = [];
    private initialized: boolean = false;

    public get isInitialized(): boolean { return this.initialized }


    constructor(private parentNode: HTMLElement, setAutosize: boolean = true) {
        this.app = new Application({
            width: 256,
            height: 256,
            antialias: true,
            transparent: false,
            resolution: 1
        });

        this.parentNode.appendChild(this.app.view);
        this.app.renderer.autoDensity = true;
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block";
        this.app.renderer.resize(window.innerWidth, window.innerHeight);

        if (setAutosize) window.addEventListener('resize', () => this.setAutoresize());
    }

    public init(): Loader {
        if (this.isInitialized) throw new Error("Playground is already initialized");
        
        return this.app.loader.add('dot', 'assets/dot.png').load((loader, res) => {
            this.sprites.push(new Sprite(res.dot?.texture));
            this.initialized = true;
        });
    }

    public renderSimpleExample(): void {
        if (!this.initialized) throw new Error("Playground is not initialized");
        
        this.app.renderer.backgroundColor = 0x061639;

        let sprite = this.sprites[0];

        sprite.x = window.innerWidth / 2;
        sprite.y = window.innerHeight / 2;
    
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.rotation = 0.3;
    
        this.app.stage.addChild(sprite);
    
        this.app.ticker.add(() => {
            sprite.rotation += 0.1; 
            if (sprite.width < 400) sprite.width += 1;
            if (sprite.height < 400) sprite.height += 1;
        });
    }

    private setAutoresize(): void {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }
}