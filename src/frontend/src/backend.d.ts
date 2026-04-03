import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface ResearchPaper {
    id: bigint;
    title: string;
    pdfBlob: ExternalBlob;
    createdAt: Time;
    tags: Array<string>;
    description: string;
}
export interface GalleryItem {
    id: bigint;
    title: string;
    imageBlob: ExternalBlob;
    createdAt: Time;
    description: string;
    category: string;
}
export interface WritingEntry {
    id: bigint;
    title: string;
    content: string;
    createdAt: Time;
    tags: Array<string>;
    excerpt: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGalleryItem(title: string, description: string, category: string, imageBlob: ExternalBlob): Promise<void>;
    addResearchPaper(title: string, description: string, tags: Array<string>, pdfBlob: ExternalBlob): Promise<void>;
    addWritingEntry(title: string, excerpt: string, content: string, tags: Array<string>): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteGalleryItem(itemId: bigint): Promise<void>;
    deleteResearchPaper(paperId: bigint): Promise<void>;
    deleteWritingEntry(entryId: bigint): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
    listGalleryItems(): Promise<Array<GalleryItem>>;
    listResearchPapers(): Promise<Array<ResearchPaper>>;
    listWritingEntries(): Promise<Array<WritingEntry>>;
}
