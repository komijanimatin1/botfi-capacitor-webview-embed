import { PluginListenerHandle } from '@capacitor/core';

export interface IWebviewEmbedPlugin {
    /**
     * Open a webview with the given URL
     */
    open(options: OpenOptions): Promise<{result: string}>;

    /**
     * Close an open webview.
     */
    close(options: { webviewId: string }): Promise<void>;

    /**
     * Load a url in the webview.
     */
    loadUrl(options: { webviewId: string, url: string}): Promise<void>;

    /**
     * Get snapshot image
     */
    getSnapshot(options: { webviewId: string }): Promise<{src: string}>;

    show(): Promise<void>;
    hide(): Promise<void>;

    toggleFullscreen(): Promise<void>;

    canGoBack(options: { webviewId: string }): Promise<{result: boolean}>;
    goBack(options: { webviewId: string }): Promise<void>;
    
    canGoForward(options: { webviewId: string }): Promise<{result: boolean}>;
    goForward(options: { webviewId: string }): Promise<void>;
    reload(options: { webviewId: string }): Promise<void>;

    
    handleNavigationEvent(options: {allow: boolean}): Promise<void>;

    updateDimensions(options: Dimensions): Promise<void>;

    postMessage(options: { webviewId: string, message: string }): Promise<void>;

    setActiveWebview(options: { webviewId: string }): Promise<void>;

    /**
     * Execute javascript in the webview.
     *
     * This method will only execute after the page has finished loading.
     * @param options The options to pass to the method.
     * @returns A promise that resolves with the result of the javascript execution.
     */
    executeScript(options: {webviewId: string, script: string}): Promise<{result: string}>;

    addListener(eventName: 
        'pageLoaded' | 
        'updateSnapshot' | 
        'progress' | 
        'navigationHandler' | 
        'message', 
        listenerFunc: (...args: any[]) => void
    ): PluginListenerHandle;
}

interface OpenOptions extends Dimensions {
    /**
     * The URL to open the webview to
     */
    url: string;

    javascript?: string;
    injectionTime?: ScriptInjectionTime;
    userAgent?: string;

    webMessageJsObjectName?: string;

    webviewId: string
}

interface Dimensions {
    webviewId: string;
    width: number;
    height: number;
    x: number;
    y: number;
}

export enum ScriptInjectionTime {
    atDocumentStart,
    atDocumentEnd
}
