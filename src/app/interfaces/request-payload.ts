export interface RequestPayload {
    prompt: string | null;
    coreCS: Array<string>;
    problemSolving: Array<string>;
    behavioral: Array<string>;
}
