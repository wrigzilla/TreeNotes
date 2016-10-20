module TreeNotes
{
	export class UserEvent
	{
		public target: EventDispatcher;
		constructor(private _type: string) { }
		public get type(): string
		{
			return this._type;
		}
	}

	class UserEventListener
	{
		constructor(public type: string, public listener: Function, public thisArg: any) { }
	}

	export class EventDispatcher
	{
		private listeners: Array<UserEventListener>;

		constructor()
		{
			this.listeners = new Array<UserEventListener>();
		}

		public hasEventListener(type: string, listener: Function): boolean
		{
			for (var i: number = 0, l: number = this.listeners.length; i < l; i++)
			{
				if (this.listeners[i].type === type && this.listeners[i].listener == listener)
				{
					return true;
				}
			}
			return false;
		}

		public addEventListener(type: string, listener: Function, thisArg: any): void
		{
			if (this.hasEventListener(type, listener)) return;
			this.listeners.push(new UserEventListener(type, listener, thisArg));
		}

		public removeEventListener(type: string, listener: Function): void
		{
			for (var i: number = 0, l: number = this.listeners.length; i < l; i++)
			{
				if (this.listeners[i].type === type && this.listeners[i].listener == listener)
				{
					this.listeners.splice(i, 1);
					return;
				}
			}
		}

		public dispatchEvent(event: UserEvent): void
		{
			event.target = this;
			for (var i: number = 0, l: number = this.listeners.length; i < l; i++)
			{
				if (this.listeners[i].type === event.type)
				{
					this.listeners[i].listener.call(this.listeners[i].thisArg, event);
				}
			}
		}
	}
}
