namespace TreeNotes
{
	export class Tree extends EventDispatcher
	{
		constructor(private rootNode: Node)
		{
			super();
		}

		public get length(): number
		{
			//TODO count the length of children in whole tree
			return 0;
		}

		public get root(): Node
		{
			return this.rootNode;
		}

		public addChild(node: Node): void
		{
			this.rootNode.addChild(node);
		}

		public removeChildById(id: number): void
		{
			this.rootNode.removeChild(id);
		}

		public getNodeById(id: number): Node
		{
			return this.rootNode.find(id);
		}
	}
}