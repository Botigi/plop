import mongoose, { Document, Schema } from 'mongoose';

export interface IDocumentVersion extends Document {
  documentId: Schema.Types.ObjectId;
  version: number;
  content: any;
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
  comment?: string;
}

const documentVersionSchema = new Schema<IDocumentVersion>({
  documentId: {
    type: Schema.Types.ObjectId,
    ref: 'Document',
    required: true
  },
  version: {
    type: Number,
    required: true
  },
  content: {
    type: Schema.Types.Mixed,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comment: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index composé pour rechercher rapidement les versions d'un document
documentVersionSchema.index({ documentId: 1, version: -1 });

export const DocumentVersion = mongoose.model<IDocumentVersion>('DocumentVersion', documentVersionSchema); 