/* tslint:disable */
export class OutputWebInterface {
free(): void;
 notifications(): string;

 question(): string;

}
export class SinglePlayerNZSCWebInterface {
free(): void;
static  new(arg0: number): SinglePlayerNZSCWebInterface;

 initial_output(): OutputWebInterface;

 next(arg0: string): OutputWebInterface;

}
