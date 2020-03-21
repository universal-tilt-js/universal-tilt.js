import { Settings, Callbacks, Options } from './types';
declare global {
    interface Window {
        UniversalTilt: any;
        jQuery: any;
    }
    interface HTMLElement {
        universalTilt: any;
    }
}
export default class UniversalTilt {
    private element;
    private settings;
    private callbacks;
    private reverse?;
    private listener?;
    private updateCall;
    private timeout?;
    private event;
    private left?;
    private top?;
    private shineWrapper?;
    private shineElement?;
    private width?;
    private height?;
    private x?;
    private y?;
    private axis?;
    constructor(element: HTMLElement, settings?: Settings, callbacks?: Callbacks);
    enableMovementAccess(): Promise<any>;
    private getElementListener;
    private addEventListeners;
    private removeEventListeners;
    destroy(): void;
    private onDeviceOrientation;
    private onMouseEnter;
    private onMouseMove;
    private onMouseLeave;
    reset(): void;
    private resetShine;
    private updateInitialPosition;
    getValues(): {
        tiltX: string;
        tiltY: string;
        percentageX: number;
        percentageY: number;
        angle: number;
    };
    private updateElementPosition;
    private update;
    setValues(x: number, y: number): void;
    private prepareShine;
    private setTransition;
    private extendSettings;
    static init(data?: Options): UniversalTilt | undefined;
}
