namespace TreeNotes
{
	window.onload = () => 
	{
		var el = document.getElementById('content');
		//var editor: NodeEditor = new NodeEditor(el, new Node('steve, innit', 'asjkfhejkgehgjkejgh', 1));




		var c = [
			new Node('eight', 8),
			new Node('nine', 9),
			new Node('ten', 10),
		];

		var d = [
			new Node('eleven', 11),
			new Node('twelve', 12),
			new Node('thirteen', 13),
		];

		var b = [
			new Node('two', 2),
			new Node('three', 3, c),
			new Node('four', 4),
			new Node('five', 5, d),
			new Node('six', 6),
			new Node('seven', 7)
		];
		var a: Node = new Node('one', 1, b);

		var t: Tree = new Tree(a);


		console.log(t.getNodeById(8));
		t.removeNodeById(8);
		t.removeNodeById(6);
		t.removeNodeById(5);

		//t.getnodeById(5);

		//var tv: TreeVisualizer = new TreeVisualizer(t, el);


	};
}