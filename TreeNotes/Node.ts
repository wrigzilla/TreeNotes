namespace TreeNotes
{
	export class Node
	{
		public static FindNodeById(element: Node, id: number): boolean
		{
			return element.id === id;
		}

		constructor(public data: string, private _id: number, private _children: Node[] = [])
		{

		}

		public get id(): number
		{
			return this._id;
		}

		public get length(): number
		{
			return this._children.length;
		}

		public addChild(node: Node): void
		{
			this._children.push(node);
		}

		public removeChild(id: number): void
		{
			var i: number = 0; var length: number = 0;
			while (i < length)
			{

			}
		}

		//public getNodeById(id: number): Node
		//{
		//	var result = null;
		//	var searchRoot: Node = this;


		//	console.log(result);

		//	return null;
		//}

		public find(id: number): Node
		{
			return this._children.find((element: Node) => { return Node.FindNodeById.call(this, element, id) }) || null;
		}


		//this is ok because it only returns data and does not allow for modification
		public childIndex(index: number): Node
		{
			return this._children[index] || null;
		}

		private deleteNode(node: Node): void
		{

		}
	}
}