namespace TreeNotes
{
	window.onload = () => 
	{
		var el = document.getElementById('content');

		var c = [
			new Node('eight'),
			new Node('nine'),
			new Node('ten'),
		];

		var d = [
			new Node('eleven'),
			new Node('twelve'),
			new Node('thirteen'),
		];

		var b = [
			new Node('two'),
			new Node('three', c),
			new Node('four'),
			new Node('five', d),
			new Node('six'),
			new Node('seven')
		];
		var a: Node = new Node('one', b);

		var t: Tree = new Tree(a);

		var tv: TreeVisualizer = new TreeVisualizer(t, el);

	};
}