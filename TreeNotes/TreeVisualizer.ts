namespace TreeNotes
{
	export class TreeVisualizer
	{
		private renderedTree: HTMLElement;
		private iterator: number = 0;

		private parentNode: Node;

		constructor(private tree: Tree, private anchor: HTMLElement)
		{
			this.renderTree();
			this.iterator = 0;
		}

		public renderTree(): void
		{
			this.renderedTree = this.renderNode(this.tree.root);

			if (this.anchor.children.length > 0) this.anchor.replaceChild(this.renderedTree, this.anchor.firstChild);
			else this.anchor.appendChild(this.renderedTree);

			this.renderedTree.addEventListener('click', (e: Event) => this.onTreeClicked(e));
		}

		private renderNode(node: Node): HTMLLIElement
		{
			var nodeHTML: HTMLLIElement = HTMLUtilities.listElement();
			nodeHTML.id = 'node_' + node.id;

			var data: HTMLParagraphElement = HTMLUtilities.paragraph(node.data);

			var edit: HTMLLinkElement = HTMLUtilities.link('edit', '', ['link-btn']);
			var remove: HTMLLinkElement = HTMLUtilities.link('remove', '', ['link-btn']);
			var addChild: HTMLLinkElement = HTMLUtilities.link('add child', '', ['link-btn']);
			var viewChildren: HTMLLinkElement = HTMLUtilities.link('view children', '', ['link-btn']);

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
			return <HTMLLIElement>HTMLUtilities.appendList(nodeHTML, [data, edit, addChild, viewChildren, children]);
		}

		private onTreeClicked(e: Event): void
		{
			var target: HTMLElement = <HTMLElement>e.target;
			var id: number = parseInt(target.parentElement.id.replace('node_', ''));

			if (target.nodeName === 'A' && target.innerHTML === 'edit')
			{
				new NodeEditor(target, this.tree.getNodeById(id));
			}
			else if (target.nodeName === 'A' && target.innerHTML === 'remove')
			{

			}
			else if (target.nodeName === 'A' && target.innerHTML === 'add child')
			{

				var newNode: Node = new Node("", ++this.iterator);
				var editor: NodeEditor = new NodeEditor(target, newNode);
				this.parentNode =  this.tree.getNodeById(id);

				editor.addEventListener(NodeEvent.NODE_SAVED, this.onAddChild, this);
			}
			else if (target.nodeName === 'A' && target.innerHTML === 'view children')
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
			this.parentNode = null;
			this.renderTree();
		}

		private toggleChildren(parent: HTMLElement): void
		{
			parent.className.includes('open') ? parent.className = parent.className.replace('open', '') : parent.className += ' open';
		}
	}
}