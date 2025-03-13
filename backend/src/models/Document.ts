import mongoose, { Document as MongoDocument, Schema } from 'mongoose';

export interface IDocument extends MongoDocument {
  title: string;
  content: any;
  type: 'text' | 'table' | 'code' | 'drawing';
  owner: Schema.Types.ObjectId;
  collaborators: Schema.Types.ObjectId[];
  parentFolder?: Schema.Types.ObjectId;
  settings: {
    isPublic: boolean;
    canEdit: boolean;
  };
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

const documentSchema = new Schema<IDocument>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: Schema.Types.Mixed,
    required: true,
    default: {}
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'table', 'code', 'drawing']
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  collaborators: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  parentFolder: {
    type: Schema.Types.ObjectId,
    ref: 'Folder'
  },
  settings: {
    isPublic: {
      type: Boolean,
      default: false
    },
    canEdit: {
      type: Boolean,
      default: true
    }
  },
  version: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

// Index pour la recherche
documentSchema.index({ title: 'text' });

// Méthode pour vérifier si un utilisateur a accès au document
documentSchema.methods.hasAccess = function(userId: Schema.Types.ObjectId): boolean {
  return (
    this.owner.equals(userId) ||
    this.collaborators.some(collaborator => collaborator.equals(userId)) ||
    this.settings.isPublic
  );
};

// Méthode pour vérifier si un utilisateur peut éditer le document
documentSchema.methods.canEdit = function(userId: Schema.Types.ObjectId): boolean {
  return (
    this.owner.equals(userId) ||
    (this.collaborators.some(collaborator => collaborator.equals(userId)) && this.settings.canEdit)
  );
};

export const Document = mongoose.model<IDocument>('Document', documentSchema); 