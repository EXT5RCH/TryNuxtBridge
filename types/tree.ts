interface TreeItemType {
  id: string;
  label?: string;
  items: TreeItemType[];
  type: "array" | "string";
  open: boolean;
}
