var TreeNotes;
(function (TreeNotes) {
    window.onload = () => {
        var el = document.getElementById('content');
        var c = [
            new TreeNotes.Node('eight'),
            new TreeNotes.Node('nine'),
            new TreeNotes.Node('ten'),
        ];
        var d = [
            new TreeNotes.Node('eleven'),
            new TreeNotes.Node('twelve'),
            new TreeNotes.Node('thirteen'),
        ];
        var b = [
            new TreeNotes.Node('two'),
            new TreeNotes.Node('three', c),
            new TreeNotes.Node('four'),
            new TreeNotes.Node('five', d),
            new TreeNotes.Node('six'),
            new TreeNotes.Node('seven')
        ];
        var a = new TreeNotes.Node('one', b);
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
        constructor(data, children = [], _id = null) {
            this.data = data;
            this.children = children;
            this._id = _id;
            this.open = false;
        }
        get id() {
            return this._id;
        }
        set id(id) {
            this._id = id;
        }
        get length() {
            return this.children.length;
        }
        addChild(node) {
            this.children.push(node);
        }
        toJSON() {
            var result = {};
            result.data = this.data;
            result.id = this._id;
            result.children = [];
            var i = 0;
            while (i < this.children.length) {
                result.children.push(this.children[i].toJSON());
                i++;
            }
            return result;
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
                node = new TreeNotes.Node('');
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
        constructor(rootNode = null) {
            super();
            this.rootNode = rootNode;
            this.iterator = 0;
            if (!this.rootNode)
                this.rootNode = new TreeNotes.Node("", [], 1);
            this.fixIds(this.rootNode);
        }
        get length() {
            return this.getLength(this.rootNode, 1);
        }
        get root() {
            return this.rootNode;
        }
        removeNodeById(id) {
            var result = this.findNode(this.rootNode, id);
            this.removeNode(result);
        }
        getNodeById(id) {
            return this.findNode(this.rootNode, id).node;
        }
        moveNodeToNodeById(child, newParent) {
            var result = this.findNode(this.rootNode, child);
            this.removeNode(result);
            var newP = this.getNodeById(newParent);
            newP.addChild(result.node);
        }
        toJSON() {
            var result = {};
            result = this.rootNode.toJSON();
            return result || null;
        }
        fixIds(node) {
            node.id = ++this.iterator;
            if (node.children.length > 0) {
                for (var i = 0; i < node.children.length; i++) {
                    this.fixIds(node.children[i]);
                }
            }
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
        removeNode(result) {
            var index = result.parent.children.indexOf(result.node);
            result.parent.children.splice(index, 1);
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
            this.renderTree();
        }
        renderTree() {
            this.renderedTree = this.renderNode(this.tree.root, true);
            if (this.anchor.children.length > 0)
                this.anchor.replaceChild(this.renderedTree, this.anchor.firstChild);
            else
                this.anchor.appendChild(this.renderedTree);
            this.renderedTree.addEventListener('click', (e) => this.onTreeClicked(e));
        }
        renderNode(node, root = false) {
            var nodeHTML = TreeNotes.HTMLUtilities.listElement();
            nodeHTML.id = 'node_' + node.id;
            var data = TreeNotes.HTMLUtilities.paragraph(node.data);
            var edit = TreeNotes.HTMLUtilities.span(TreeVisualizer.EDIT, ['link-btn']);
            edit.setAttribute("data-type", TreeVisualizer.EDIT);
            if (!root) {
                var remove = TreeNotes.HTMLUtilities.span(TreeVisualizer.REMOVE, ['link-btn']);
                remove.setAttribute("data-type", TreeVisualizer.REMOVE);
            }
            var addChild = TreeNotes.HTMLUtilities.span(TreeVisualizer.ADD_CHILD, ['link-btn']);
            addChild.setAttribute("data-type", TreeVisualizer.ADD_CHILD);
            var childClasses = ['link-btn'];
            if (node.children.length < 1)
                childClasses.push('disabled');
            var viewChildren = TreeNotes.HTMLUtilities.span('view children (' + node.children.length + ')', childClasses);
            viewChildren.setAttribute("data-type", TreeVisualizer.VIEW_CHILDREN);
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
            var elements = root ? [data, edit, addChild, viewChildren, children] : [data, edit, remove, addChild, viewChildren, children];
            return TreeNotes.HTMLUtilities.appendList(nodeHTML, elements);
        }
        onTreeClicked(e) {
            var target = e.target;
            var id = parseInt(target.parentElement.id.replace('node_', ''));
            var dataType = target.dataset['type'];
            if (dataType === TreeVisualizer.EDIT) {
                var editor = new TreeNotes.NodeEditor(target.parentElement, this.tree.getNodeById(id));
                editor.addEventListener(TreeNotes.NodeEvent.NODE_SAVED, this.onEdit, this);
            }
            else if (dataType === TreeVisualizer.REMOVE) {
                this.tree.removeNodeById(id);
                this.renderTree();
            }
            else if (dataType === TreeVisualizer.ADD_CHILD) {
                var newNode = new TreeNotes.Node("", [], this.tree.length + 1);
                var editor = new TreeNotes.NodeEditor(target.parentElement, newNode);
                this.parentNode = this.tree.getNodeById(id);
                editor.addEventListener(TreeNotes.NodeEvent.NODE_SAVED, this.onAddChild, this);
            }
            else if (dataType === TreeVisualizer.VIEW_CHILDREN) {
                var node = this.tree.getNodeById(id);
                node.open = !node.open;
                this.toggleChildren(target.parentElement);
            }
        }
        onAddChild(e) {
            e.target.removeEventListener(TreeNotes.NodeEvent.NODE_SAVED, this.onAddChild);
            this.parentNode.addChild(e.node);
            this.parentNode.open = true;
            this.parentNode = null;
            this.renderTree();
        }
        onEdit(e) {
            e.target.removeEventListener(TreeNotes.NodeEvent.NODE_SAVED, this.onEdit);
            this.renderTree();
        }
        toggleChildren(parent) {
            parent.className.includes('open') ? parent.className = parent.className.replace('open', '') : parent.className += ' open';
        }
    }
    TreeVisualizer.VIEW_CHILDREN = 'view children';
    TreeVisualizer.REMOVE = 'remove';
    TreeVisualizer.ADD_CHILD = 'add child';
    TreeVisualizer.EDIT = 'edit';
    TreeNotes.TreeVisualizer = TreeVisualizer;
})(TreeNotes || (TreeNotes = {}));
