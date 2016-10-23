namespace TreeNotes
{
	export interface INode
	{
		data: string;
		id: number;
		children: INode;
	}

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

		public toJSON(): JSON
		{
			var result: any = {};

			result.data = this.data;
			result.id = this._id;
			result.children = [];

			var i: number = 0;
			while (i < this.children.length)
			{
				result.children.push(this.children[i].toJSON());
				i++;
			}
			return <JSON>result;
		}
	}
}