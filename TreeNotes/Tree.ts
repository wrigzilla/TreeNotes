namespace TreeNotes
{
	export class NodeSearchResult
	{
		constructor(public node: Node = null, public parent: Node = null)
		{ }
	}

	export class Tree extends EventDispatcher
	{
		private iterator: number = 0;

		constructor(private rootNode: Node)
		{
			super();

			this.traceNode(this.rootNode);
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

		public removeChildById(id: number): void
		{
			this.getNodeById(id);


		}

		public getNodeById(id: number): Node
		{
			return this.findNode(this.rootNode, id);
		}

		private traceNode(node: Node): void
		{
			console.log(node.id);

			if (node.children.length > 0)
			{
				for (var i: number = 0; i < node.children.length; i++)
				{
					this.traceNode(node.children[i]);
				}
			}
		}

		private findNode(node: Node, id: number): Node
		{
			var result = null;
			if (node.id === id) return node;
			if (node.children.length > 0)
			{
				for (var i: number = 0; i < node.children.length; i++)
				{
					result = this.findNode(node.children[i], id);
					if (result) break;
				}
			}
			return result;
		}
	}
}