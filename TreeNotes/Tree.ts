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
			return this.getLength(this.rootNode, 1);
		}

		public get root(): Node
		{
			return this.rootNode;
		}

		public removeNodeById(id: number): void
		{
			var result: NodeSearchResult = this.findNode(this.rootNode, id);
			this.removeNode(result);
		}

		public getNodeById(id: number): Node
		{
			return this.findNode(this.rootNode, id).node;
		}

		public moveNodeToNodeById(child: number, newParent: number): void
		{
			var result: NodeSearchResult = this.findNode(this.rootNode, child);
			this.removeNode(result);

			var newP: Node = this.getNodeById(newParent);
			newP.addChild(result.node);

			console.log(this.rootNode);
		}

		private getLength(node: Node, count: number = 0): number
		{
			count += node.length;
			if (node.children.length > 0)
			{
				for (var i: number = 0; i < node.children.length; i++)
				{
					count = this.getLength(node.children[i], count);
				}
			}
			return count;
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

		private removeNode(result: NodeSearchResult): void
		{
			var index: number = result.parent.children.indexOf(result.node);
			result.parent.children.splice(index, 1);
		}
	}
}