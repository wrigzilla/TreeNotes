namespace TreeNotes
{
	export class TreeVisualizer
	{
		public static VIEW_CHILDREN: string = 'view children';
		public static REMOVE: string = 'remove';
		public static ADD_CHILD: string = 'add child';
		public static EDIT: string = 'edit';

		private renderedTree: HTMLElement;
		private parentNode: Node;

		constructor(private tree: Tree, private anchor: HTMLElement)
		{
			this.renderTree();
		}

		public renderTree(): void
		{
			this.renderedTree = this.renderNode(this.tree.root, true);

			if (this.anchor.children.length > 0) this.anchor.replaceChild(this.renderedTree, this.anchor.firstChild);
			else this.anchor.appendChild(this.renderedTree);

			this.renderedTree.addEventListener('click', (e: Event) => this.onTreeClicked(e));
		}

		private renderNode(node: Node, root: boolean = false): HTMLLIElement
		{
			var nodeHTML: HTMLLIElement = HTMLUtilities.listElement();
			nodeHTML.id = 'node_' + node.id;
			var data: HTMLParagraphElement = HTMLUtilities.paragraph(node.data);

			var edit: HTMLSpanElement = HTMLUtilities.span(TreeVisualizer.EDIT, ['link-btn']);
			edit.setAttribute("data-type", TreeVisualizer.EDIT);

			if (!root)
			{
				var remove: HTMLSpanElement = HTMLUtilities.span(TreeVisualizer.REMOVE, ['link-btn']);
				remove.setAttribute("data-type", TreeVisualizer.REMOVE);
			}
			var addChild: HTMLSpanElement = HTMLUtilities.span(TreeVisualizer.ADD_CHILD, ['link-btn']);
			addChild.setAttribute("data-type", TreeVisualizer.ADD_CHILD);

			var childClasses: string[] = ['link-btn'];
			if (node.children.length < 1) childClasses.push('disabled');
			var viewChildren: HTMLSpanElement = HTMLUtilities.span('view children (' + node.children.length + ')', childClasses);
			viewChildren.setAttribute("data-type", TreeVisualizer.VIEW_CHILDREN);

			var childClass = [];
			if (node.open) childClass.push("open");
			var children: HTMLElement = HTMLUtilities.unorderedList(childClass);
			
			var i: number = 0; var length: number = node.length;
			while (i < length)
			{
				var childeNode: Node = node.children[i];
				if (childeNode)
				{
					var n: HTMLElement = this.renderNode(childeNode);
					if (n) children.appendChild(n);
				}
				i++;
			}
			var elements: HTMLElement[] = root ? [data, edit, addChild, viewChildren, children] : [data, edit, remove, addChild, viewChildren, children];
			return <HTMLLIElement>HTMLUtilities.appendList(nodeHTML, elements);
		}

		private onTreeClicked(e: Event): void
		{
			var target: HTMLElement = <HTMLElement>e.target;
			var id: number = parseInt(target.parentElement.id.replace('node_', ''));

			var dataType: string = target.dataset['type'];

			if (dataType === TreeVisualizer.EDIT)
			{
				var editor: NodeEditor = new NodeEditor(target.parentElement, this.tree.getNodeById(id));

				editor.addEventListener(NodeEvent.NODE_SAVED, this.onEdit, this);
			}
			else if (dataType === TreeVisualizer.REMOVE)
			{
				this.tree.removeNodeById(id);
				this.renderTree();
			}
			else if (dataType === TreeVisualizer.ADD_CHILD)
			{
				var newNode: Node = new Node("", [], this.tree.length + 1);
				var editor: NodeEditor = new NodeEditor(target.parentElement, newNode);
				this.parentNode =  this.tree.getNodeById(id);

				editor.addEventListener(NodeEvent.NODE_SAVED, this.onAddChild, this);
			}
			else if (dataType === TreeVisualizer.VIEW_CHILDREN)
			{
				var node = this.tree.getNodeById(id);
				node.open = !node.open;
				this.toggleChildren(target.parentElement);
			}
		}

		private onAddChild(e: NodeEvent): void
		{
			e.target.removeEventListener(NodeEvent.NODE_SAVED, this.onAddChild);
			this.parentNode.addChild(e.node);
			this.parentNode.open = true;
			this.parentNode = null;
			this.renderTree();
		}

		private onEdit(e: NodeEvent): void
		{
			e.target.removeEventListener(NodeEvent.NODE_SAVED, this.onEdit);
			this.renderTree();
		}

		private toggleChildren(parent: HTMLElement): void
		{
			parent.className.includes('open') ? parent.className = parent.className.replace('open', '') : parent.className += ' open';
		}
	}
}