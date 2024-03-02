declare module 'svg-canvas' {
    // Define types for svg-canvas here
    // For example:
    export class Canvas {
        constructor(width: number, height: number);
        getContext(contextType: string): CanvasRenderingContext2D | null;
        toSVG(): string;
    }
}
