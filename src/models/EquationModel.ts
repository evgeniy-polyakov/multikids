export enum Operator {
    Multi = "*",
    Div = "/",
}

export type EquationModel = [o: Operator, a: number, b: number, c: number];