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

		public removeNodeById(id: number): void
		{
			var result: NodeSearchResult = this.findNode(this.rootNode, id);
			var index: number = result.parent.children.indexOf(result.node);

			result.parent.children.splice(index, 1);


			console.log(this.rootNode);
		}

		public getNodeById(id: number): Node
		{
			return this.findNode(this.rootNode, id).node;
		}

		private findNode(node: Node, id: number, parent: Node = null): NodeSearchResult
		{
			var result: NodeSearchResult = null;
			if (node.id === id) return new NodeSearchResult(node, parent);
			if (node.children.length > 0)
			{
				for (var i: number = 0; i < node.children.length; i++)
				{
					result = this.findNode(node.children[i], id, node);
					if (result) break;
				}
			}
			return result;
		}
	}
}