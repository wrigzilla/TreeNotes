namespace TreeNotes
{
	export class NodeEvent extends UserEvent
	{
		public static NODE_SAVED: string = 'nodeCreated';
		public static NODE_REMOVED: string = 'nodeRemoved';

		constructor(type: string, public node: Node)
		{
			super(type);
		}
	}
}