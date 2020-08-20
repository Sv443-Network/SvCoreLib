import * as http from 'http';

declare module 'svcorelib' {
    export function isEmpty(input: any): boolean;
    export function isArrayEmpty(array: any[]): boolean | number;
    export function error(cause: string, log_file_path: string, shutdown: boolean, status: number, consoleMsg: boolean): void;
    export function allEqual(array: any[]): boolean;
    export function softShutdown(funct: (any) => any, code: number): void;
    export function noShutdown(): void;
    export function yesShutdown(): void;
    export function reserialize(obj: object, immutable: boolean): object;
    export function readableArray(array: any[], separators: string, lastSeparator: string): string;
    export function mapRange(value: number, range_1_min: number, range_1_max: number, range_2_min: number, range_2_max: number): number;
    export function unused(any: any[]): void;
    export function replaceAt(input: string, index: number, replacement: string): string;
    export function byteLength(str: string): number;
    export function randRange(min: number, max: number): number;
    export function randomizeArray(array: any[]): any[];
    export function randomItem(array: any[]): any;
    export function removeDuplicates(array: any[]): any[];
    export interface SeededRandomNumbers {
        numbers: number[];
        stringified: string;
        integer: number;
        seed: number;
    }
    export function generateSeededNumbers(count: number, seed: number): SeededRandomNumbers;
    export function generateRandomSeed(digitCount: number): number;
    export function validateSeed(seed: number | string): boolean;
    export function hexadecimal(uuidFormat: string, upperCase: boolean): string;
    export function decimal(uuidFormat: string): string;
    export function alphanumerical(uuidFormat: string, upperCase: boolean): string;
    export function binary(uuidFormat: string, asBooleanArray: boolean): string | boolean[];
    export function custom(uuidFormat: string, possibleValues: string): string;
    export function pipeFile(res: http.ServerResponse, filePath: string, mimeType: string, statusCode: number): null | string;
    export function pipeString(res: http.ServerResponse, text: string, mimeType: string, statusCode: number): null | string;
    export type EncodingName = "br" | "gzip" | "deflate" | "compress" | "identity";
    export function getClientEncoding(req: http.IncomingMessage): EncodingName;
    export interface pingReturnValues {
        statusCode: number;
        statusMessage: string;
        responseTime: number;
        contentType: string;
    }
    export function ping(url: string, timeout: number): Promise<pingReturnValues>;
    export interface DownloadProgress {
        currentB: number;
        currentKB: number;
        currentMB: number;
        totalB: number;
        totalKB: number;
        totalMB: number;
    }
    export interface ProgressCallback {
        DownloadProgress: DownloadProgress;
    }
    export interface FinishedCallback {
        error: string | undefined;
    }
    export interface DownloadOptions {
        fileName: string;
        progressCallback: ProgressCallback;
        finishedCallback: FinishedCallback;
    }
    export function downloadFile(url: string, destPath: string, options: DownloadOptions): Promise<string | void>;
    export interface LoggerOptions {
        append_bottom: boolean;
        timestamp: boolean;
    }
    export function logger(path: string, content: string, options: LoggerOptions): void;
    export function readdirRecursive(folder: string, callback: (any) => any): Promise<any>;
    export function readdirRecursiveSync(folder: string): string[];
    export function pause(text: string): Promise<string>;
    export function inDebugger(): boolean;
    export class ProgressBar {
        constructor(timesToUpdate: number, initialMessage: string);
        initialMessage: string;
        timesToUpdate: number;
        iteration: number;
        progress: number;
        progressDisplay: string;
        filledChar: string;
        blankChar: string;
        finishFunction: undefined;

        next(message: string): void;
        onFinish(callback: (any) => any): void;
        getProgress(): number;
        getRemainingIncrements(): number;
    }
    export interface MenuPromptMenuOption {
        key: string;
        description: string;
    }
    export interface MenuPromptMenu {
        title: string;
        options: MenuPromptMenuOption[];
    }
    export interface MenuPromptResult {
        key: string;
        description: string;
        menuTitle: string;
        optionIndex: number;
        menuIndex: number;
    }
    export interface MenuPromptOnFinishedCallback {
        results: MenuPromptResult[];
    }
    export interface MenuPromptOptions {
        exitKey: string;
        optionSeparator: string;
        cursorPrefix: string;
        retryOnInvalid: boolean;
        onFinished: MenuPromptOnFinishedCallback;
        autoSubmit: boolean;
    }
    export interface MenuPromptLocalization {
        wrongOption: string;
        invalidOptionSelected: string;
        exitOptionText: string;
    }
    export class MenuPrompt {
        constructor(options: MenuPromptOptions);
        options: MenuPromptOptions;
        localization: MenuPromptLocalization;

        open(): boolean | string;
        close(): MenuPromptResult[];
        addMenu(menu: MenuPromptMenu): boolean | string;
        currentMenu(): number;
        result(): MenuPromptResult;
        validateMenu(menu: MenuPromptMenu): boolean | string[];
    }
    export interface info {
        version: string;
        intVersion: number[];
        name: string;
        desc: string;
        author: string;
        contributors: string[];
        license: string;
        documentation: string;
    }
    export interface fg {
        black: string;
        red: string;
        green: string;
        yellow: string;
        blue: string;
        magenta: string;
        cyan: string;
        white: string;
        rst: string;
    }
    export interface bg {
        black: string;
        red: string;
        green: string;
        yellow: string;
        blue: string;
        magenta: string;
        cyan: string;
        white: string;
        rst: string;
    }
    export interface colors {
        rst: string;
        reset: string;
        fat: string;
        blink: string;
        fg: fg;
        bg: bg;
    }
}