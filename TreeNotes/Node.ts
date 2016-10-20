namespace TreeNotes
{
	export class Node
	{
		public open: boolean;

		constructor(public data: string, public children: Node[] = [], private _id: number = null)
		{
			this.open = false;
		}

		public get id(): number
		{
			return this._id;
		}

		public set id(id: number)
		{
			this._id = id;
		}

		public get length(): number
		{
			return this.children.length;
		}

		public addChild(node: Node): void
		{
			this.children.push(node);
		}
	}
}