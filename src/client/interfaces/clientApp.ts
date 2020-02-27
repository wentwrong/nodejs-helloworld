export interface ClientApp {
    init(): Promise<void>;
    render(): Promise<void>;
    setRoot(html: string): void;
}
