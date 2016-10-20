namespace TreeNotes
{
	window.onload = () => 
	{
		var el = document.getElementById('content');
		//var editor: NodeEditor = new NodeEditor(el, new Node('steve, innit', 'asjkfhejkgehgjkejgh', 1));


		var b = [
			new Node('basein your face', 2),
			new Node('basein your face', 3),
			new Node('basein your face', 4),
			new Node('basein your face', 5),
			new Node('basein your face', 6),
			new Node('basein your face', 7)
		];
		var a: Node = new Node('basein your face', 1, b);

		var t: Tree = new Tree(a);


		var tv: TreeVisualizer = new TreeVisualizer(t, el);


	};
}