namespace TreeNotes
{
	export class Node
	{
		public open: boolean;

		constructor(public data: string, private _id: number, public children: Node[] = [])
		{
			this.open = false;
		}

		public get id(): number
		{
			return this._id;
		}

		public get length(): number
		{
			return this.children.length;
		}

		public addChild(node: Node): void
		{
			this.children.push(node);
		}

		public removeChild(id: number): void
		{
			var i: number = 0; var length: number = 0;
			while (i < length)
			{

			}
		}
	}
}