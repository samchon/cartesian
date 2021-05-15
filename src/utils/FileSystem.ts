export namespace FileSystem
{
    export function download(fileName: string, content: Buffer): void
    {
        const blob: Blob = new Blob([content], { type: "text/plan" });
        const anchor: HTMLAnchorElement = document.createElement("a");
        anchor.href = URL.createObjectURL(blob);
        anchor.download = fileName;

        document.body.appendChild(anchor);
        anchor.dispatchEvent(new MouseEvent("click"));
        document.body.removeChild(anchor);
        URL.revokeObjectURL(anchor.href);
    }
}