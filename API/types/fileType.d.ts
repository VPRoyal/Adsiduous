import type { Types, Document, Model } from "mongoose"

export type FileCategory = "image" | "video" | "audio" | "pdf" | "document";

export interface IFileMetadata {
  width?: number;
  height?: number;
  duration?: number;
  format?: string;
  resourceType?: string;
}
export interface IFile {
  filename: string;
  originalName: string;
  url: string;
  thumbnailUrl?: string | null;
  mimeType: string;
  size: number;
  type: FileCategory;
  tags?: string[];
  viewCount: number;
  userId: Types.ObjectId;
  cloudinaryPublicId: string;
  metadata?: IFileMetadata;
  isPublic?: boolean;
  uploadDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IFileMethods {
  incrementViewCount(): Promise<IFileDocument>;
  toJSON(): Object;
}

export interface IFileModel extends Model<IFileDocument> {
  getFileType(mimeType: string): FileCategory;
}

export type IFileDocument = Document<unknown, {}, IFile> &
  IFile &
  IFileMethods;