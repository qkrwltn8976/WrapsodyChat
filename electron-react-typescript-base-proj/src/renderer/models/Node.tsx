export type Node = {
   id: string,
   name: string,
   hasChildren?: boolean,
   parentCode?: string,
   type?: string,
   status?: string,
   isExpanded?: boolean,
}