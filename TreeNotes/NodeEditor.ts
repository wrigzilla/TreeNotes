namespace TreeNotes
{
	export class NodeEditor extends EventDispatcher
	{
		public static CANCEL_BTN: string = 'cancel';
		public static SAVE_BTN: string = 'save';

		private node: Node;
		private _submit: HTMLInputElement;
		private _cancel: HTMLInputElement;
		private _textArea: HTMLTextAreaElement;

		constructor(anchor: HTMLElement, node: Node = null)
		{
			super();

			if (!node) node = new Node('', 1);
			this.node = node;

			this._textArea = HTMLUtilities.textArea(this.node.data);

			this._submit = HTMLUtilities.input(NodeEditor.SAVE_BTN, 'button');
			this._cancel = HTMLUtilities.input(NodeEditor.CANCEL_BTN, 'button');

			var btns: HTMLElement = HTMLUtilities.div();
			HTMLUtilities.appendList(btns, [this._submit, this._cancel]);
			var editor: HTMLElement = HTMLUtilities.div();

			HTMLUtilities.appendList(editor, [this._textArea, btns]);
			HTMLUtilities.appendList(anchor, [editor]);

			editor.addEventListener('click', (e: Event) => this.onClick(e));
		}

		public get submit(): HTMLInputElement
		{
			return this._submit;
		}

		public get cancel(): HTMLInputElement
		{
			return this._cancel;
		}

		public get textArea(): HTMLTextAreaElement
		{
			return this._textArea;
		}

		private onClick(e: Event): void
		{
			var target: HTMLInputElement = <HTMLInputElement>e.target;
			var popUp: HTMLTextAreaElement = <HTMLTextAreaElement>e.currentTarget;

			if (target.value === NodeEditor.SAVE_BTN)
			{
				var textArea: HTMLTextAreaElement = <HTMLTextAreaElement>popUp.firstChild;
				this.node.data = textArea.value;

				this.dispatchEvent(new NodeEvent(NodeEvent.NODE_SAVED, this.node));
			}
			
			if (target.value === NodeEditor.CANCEL_BTN || target.value === NodeEditor.SAVE_BTN)
			{
				//close pop up
				e.currentTarget.removeEventListener('click', (e: Event) => this.onClick(e));
				popUp.parentElement.removeChild(popUp);
			}
		}
	}
}