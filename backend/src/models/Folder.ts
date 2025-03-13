import mongoose, { Document, Schema } from 'mongoose';

export interface IFolder extends Document {
  name: string;
  owner: Schema.Types.ObjectId;
  parent?: Schema.Types.ObjectId;
  collaborators: Schema.Types.ObjectId[];
  settings: {
    isPublic: boolean;
    canEdit: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const folderSchema = new Schema<IFolder>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Folder'
  },
  collaborators: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  settings: {
    isPublic: {
      type: Boolean,
      default: false
    },
    canEdit: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Index pour la recherche
folderSchema.index({ name: 'text' });

// Méthode pour vérifier si un utilisateur a accès au dossier
folderSchema.methods.hasAccess = function(userId: Schema.Types.ObjectId): boolean {
  return (
    this.owner.equals(userId) ||
    this.collaborators.some(collaborator => collaborator.equals(userId)) ||
    this.settings.isPublic
  );
};

// Méthode pour vérifier si un utilisateur peut modifier le dossier
folderSchema.methods.canEdit = function(userId: Schema.Types.ObjectId): boolean {
  return (
    this.owner.equals(userId) ||
    (this.collaborators.some(collaborator => collaborator.equals(userId)) && this.settings.canEdit)
  );
};

export const Folder = mongoose.model<IFolder>('Folder', folderSchema); 