export interface NodeType {
  id: number;
  name: string;
  type: string;
}

export interface RelationshipType {
  id: number;
  fromNode: number;
  toNode: number;
  relationship: string;
}