var TreeNotes;
(function (TreeNotes) {
    window.onload = () => {
        var el = document.getElementById('content');
        var c = [
            new TreeNotes.Node('eight', 8),
            new TreeNotes.Node('nine', 9),
            new TreeNotes.Node('ten', 10),
        ];
        var d = [
            new TreeNotes.Node('eleven', 11),
            new TreeNotes.Node('twelve', 12),
            new TreeNotes.Node('thirteen', 13),
        ];
        var b = [
            new TreeNotes.Node('two', 2),
            new TreeNotes.Node('three', 3, c),
            new TreeNotes.Node('four', 4),
            new TreeNotes.Node('five', 5, d),
            new TreeNotes.Node('six', 6),
            new TreeNotes.Node('seven', 7)
        ];
        var a = new TreeNotes.Node('one', 1, b);
        var t = new TreeNotes.Tree(a);
        var tv = new TreeNotes.TreeVisualizer(t, el);
    };
})(TreeNotes || (TreeNotes = {}));
var TreeNotes;
(function (TreeNotes) {
    class UserEvent {
        constructor(_type) {
            this._type = _type;
        }
        get type() {
            return this._type;
        }
    }
    TreeNotes.UserEvent = UserEvent;
    class UserEventListener {
        constructor(type, listener, thisArg) {
            this.type = type;
            this.listener = listener;
            this.thisArg = thisArg;
        }
    }
    class EventDispatcher {
        constructor() {
            this.listeners = new Array();
        }
        hasEventListener(type, listener) {
            for (var i = 0, l = this.listeners.length; i < l; i++) {
                if (this.listeners[i].type === type && this.listeners[i].listener == listener) {
                    return true;
                }
            }
            return false;
        }
        addEventListener(type, listener, thisArg) {
            if (this.hasEventListener(type, listener))
                return;
            this.listeners.push(new UserEventListener(type, listener, thisArg));
        }
        removeEventListener(type, listener) {
            for (var i = 0, l = this.listeners.length; i < l; i++) {
                if (this.listeners[i].type === type && this.listeners[i].listener == listener) {
                    this.listeners.splice(i, 1);
                    return;
                }
            }
        }
        dispatchEvent(event) {
            event.target = this;
            for (var i = 0, l = this.listeners.length; i < l; i++) {
                if (this.listeners[i].type === event.type) {
                    this.listeners[i].listener.call(this.listeners[i].thisArg, event);
                }
            }
        }
    }
    TreeNotes.EventDispatcher = EventDispatcher;
})(TreeNotes || (TreeNotes = {}));
var TreeNotes;
(function (TreeNotes) {
    class NodeEvent extends TreeNotes.UserEvent {
        constructor(type, node) {
            super(type);
            this.node = node;
        }
    }
    NodeEvent.NODE_SAVED = 'nodeCreated';
    NodeEvent.NODE_REMOVED = 'nodeRemoved';
    TreeNotes.NodeEvent = NodeEvent;
})(TreeNotes || (TreeNotes = {}));
var TreeNotes;
(function (TreeNotes) {
    class HTMLUtilities {
        static div(classes = []) {
            var div = document.createElement('DIV');
            return HTMLUtilities.addClassList(div, classes);
        }
        static link(name, href = '', classes = []) {
            var link = document.createElement('A');
            link.innerText = name;
            if (href.length > 0)
                link.href = href;
            return HTMLUtilities.addClassList(link, classes);
        }
        static paragraph(text, classes = []) {
            var p = document.createElement('P');
            p.innerHTML = text;
            return HTMLUtilities.addClassList(p, classes);
        }
        static unorderedList(classes = []) {
            var ul = document.createElement('UL');
            return HTMLUtilities.addClassList(ul, classes);
        }
        static listElement(classes = []) {
            var li = document.createElement('LI');
            return HTMLUtilities.addClassList(li, classes);
        }
        static orderedList(classes = []) {
            var ol = document.createElement('OL');
            return HTMLUtilities.addClassList(ol, classes);
        }
        static textArea(text, classes = []) {
            var area = document.createElement('TEXTAREA');
            area.value = text;
            return HTMLUtilities.addClassList(area, classes);
        }
        static input(value, type, classes = []) {
            var input = document.createElement('INPUT');
            input.type = type;
            input.value = value;
            return HTMLUtilities.addClassList(input, classes);
        }
        static span(text, classes) {
            var span = document.createElement('SPAN');
            span.innerHTML = text;
            return HTMLUtilities.addClassList(span, classes);
        }
        static appendList(element, list = []) {
            while (list.length > 0) {
                element.appendChild(list.shift());
            }
            return element;
        }
        static addClassList(element, classList = []) {
            if (classList.length > 0)
                element.className = classList.join(' ');
            return element;
        }
    }
    TreeNotes.HTMLUtilities = HTMLUtilities;
})(TreeNotes || (TreeNotes = {}));
var TreeNotes;
(function (TreeNotes) {
    class Node {
        constructor(data, _id, children = []) {
            this.data = data;
            this._id = _id;
            this.children = children;
            this.open = false;
        }
        get id() {
            return this._id;
        }
        get length() {
            return this.children.length;
        }
        addChild(node) {
            this.children.push(node);
        }
        removeChild(id) {
            var i = 0;
            var length = 0;
            while (i < length) {
            }
        }
    }
    TreeNotes.Node = Node;
})(TreeNotes || (TreeNotes = {}));
var TreeNotes;
(function (TreeNotes) {
    class NodeEditor extends TreeNotes.EventDispatcher {
        constructor(anchor, node = null) {
            super();
            if (!node)
                node = new TreeNotes.Node('', 1);
            this.node = node;
            this._textArea = TreeNotes.HTMLUtilities.textArea(this.node.data);
            this._submit = TreeNotes.HTMLUtilities.input(NodeEditor.SAVE_BTN, 'button');
            this._cancel = TreeNotes.HTMLUtilities.input(NodeEditor.CANCEL_BTN, 'button');
            var btns = TreeNotes.HTMLUtilities.div();
            TreeNotes.HTMLUtilities.appendList(btns, [this._submit, this._cancel]);
            var editor = TreeNotes.HTMLUtilities.div();
            TreeNotes.HTMLUtilities.appendList(editor, [this._textArea, btns]);
            TreeNotes.HTMLUtilities.appendList(anchor, [editor]);
            editor.addEventListener('click', (e) => this.onClick(e));
        }
        get submit() {
            return this._submit;
        }
        get cancel() {
            return this._cancel;
        }
        get textArea() {
            return this._textArea;
        }
        onClick(e) {
            var target = e.target;
            var popUp = e.currentTarget;
            if (target.value === NodeEditor.SAVE_BTN) {
                var textArea = popUp.firstChild;
                this.node.data = textArea.value;
                this.dispatchEvent(new TreeNotes.NodeEvent(TreeNotes.NodeEvent.NODE_SAVED, this.node));
            }
            if (target.value === NodeEditor.CANCEL_BTN || target.value === NodeEditor.SAVE_BTN) {
                e.currentTarget.removeEventListener('click', (e) => this.onClick(e));
                popUp.parentElement.removeChild(popUp);
            }
        }
    }
    NodeEditor.CANCEL_BTN = 'cancel';
    NodeEditor.SAVE_BTN = 'save';
    TreeNotes.NodeEditor = NodeEditor;
})(TreeNotes || (TreeNotes = {}));
var TreeNotes;
(function (TreeNotes) {
    class NodeSearchResult {
        constructor(node = null, parent = null) {
            this.node = node;
            this.parent = parent;
        }
    }
    TreeNotes.NodeSearchResult = NodeSearchResult;
    class Tree extends TreeNotes.EventDispatcher {
        constructor(rootNode) {
            super();
            this.rootNode = rootNode;
            this.iterator = 0;
        }
        get length() {
            return this.getLength(this.rootNode, 1);
        }
        getLength(node, count = 0) {
            count += node.length;
            if (node.children.length > 0) {
                for (var i = 0; i < node.children.length; i++) {
                    count = this.getLength(node.children[i], count);
                }
            }
            return count;
        }
        get root() {
            return this.rootNode;
        }
        removeNodeById(id) {
            var result = this.findNode(this.rootNode, id);
            var index = result.parent.children.indexOf(result.node);
            result.parent.children.splice(index, 1);
        }
        getNodeById(id) {
            return this.findNode(this.rootNode, id).node;
        }
        findNode(node, id, parent = null) {
            var result = null;
            if (node.id === id)
                return new NodeSearchResult(node, parent);
            if (node.children.length > 0) {
                for (var i = 0; i < node.children.length; i++) {
                    result = this.findNode(node.children[i], id, node);
                    if (result)
                        break;
                }
            }
            return result;
        }
    }
    TreeNotes.Tree = Tree;
})(TreeNotes || (TreeNotes = {}));
var TreeNotes;
(function (TreeNotes) {
    class TreeVisualizer {
        constructor(tree, anchor) {
            this.tree = tree;
            this.anchor = anchor;
            this.iterator = 0;
            this.renderTree();
            this.iterator = 0;
        }
        renderTree() {
            this.renderedTree = this.renderNode(this.tree.root);
            if (this.anchor.children.length > 0)
                this.anchor.replaceChild(this.renderedTree, this.anchor.firstChild);
            else
                this.anchor.appendChild(this.renderedTree);
            this.renderedTree.addEventListener('click', (e) => this.onTreeClicked(e));
        }
        renderNode(node) {
            var nodeHTML = TreeNotes.HTMLUtilities.listElement();
            nodeHTML.id = 'node_' + node.id;
            var data = TreeNotes.HTMLUtilities.paragraph(node.data);
            var edit = TreeNotes.HTMLUtilities.link('edit', '', ['link-btn']);
            var remove = TreeNotes.HTMLUtilities.link('remove', '', ['link-btn']);
            var addChild = TreeNotes.HTMLUtilities.link('add child', '', ['link-btn']);
            var viewChildren = TreeNotes.HTMLUtilities.link('view children', '', ['link-btn']);
            var childClass = [];
            if (node.open)
                childClass.push("open");
            var children = TreeNotes.HTMLUtilities.unorderedList(childClass);
            var i = 0;
            var length = node.length;
            while (i < length) {
                var childeNode = node.children[i];
                if (childeNode) {
                    var n = this.renderNode(childeNode);
                    if (n)
                        children.appendChild(n);
                }
                i++;
            }
            return TreeNotes.HTMLUtilities.appendList(nodeHTML, [data, edit, remove, addChild, viewChildren, children]);
        }
        onTreeClicked(e) {
            var target = e.target;
            var id = parseInt(target.parentElement.id.replace('node_', ''));
            if (target.nodeName === 'A' && target.innerHTML === 'edit') {
                new TreeNotes.NodeEditor(target, this.tree.getNodeById(id));
            }
            else if (target.nodeName === 'A' && target.innerHTML === 'remove') {
                this.tree.removeNodeById(id);
                this.renderTree();
            }
            else if (target.nodeName === 'A' && target.innerHTML === 'add child') {
                var newNode = new TreeNotes.Node("", ++this.iterator);
                var editor = new TreeNotes.NodeEditor(target, newNode);
                this.parentNode = this.tree.getNodeById(id);
                editor.addEventListener(TreeNotes.NodeEvent.NODE_SAVED, this.onAddChild, this);
            }
            else if (target.nodeName === 'A' && target.innerHTML === 'view children') {
                var node = this.tree.getNodeById(id);
                node.open = !node.open;
                this.toggleChildren(target.parentElement);
            }
        }
        onAddChild(e) {
            e.target.removeEventListener(TreeNotes.NodeEvent.NODE_SAVED, this.onAddChild);
            this.parentNode.addChild(e.node);
            this.parentNode = null;
            this.renderTree();
        }
        toggleChildren(parent) {
            parent.className.includes('open') ? parent.className = parent.className.replace('open', '') : parent.className += ' open';
        }
    }
    TreeNotes.TreeVisualizer = TreeVisualizer;
})(TreeNotes || (TreeNotes = {}));
