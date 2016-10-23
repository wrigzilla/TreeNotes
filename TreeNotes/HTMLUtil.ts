namespace TreeNotes
{
	export class HTMLUtilities
	{
		public static div(classes: string[] = []): HTMLElement
		{
			var div = document.createElement('DIV');
			return HTMLUtilities.addClassList(div, classes);
		}

		public static link(name: string, href: string = '', classes: string[] = []): HTMLLinkElement
		{
			var link: HTMLLinkElement = <HTMLLinkElement>document.createElement('A');
			link.innerText = name;
			if (href.length > 0) link.href = href;
			return <HTMLLinkElement>HTMLUtilities.addClassList(link, classes);
		}

		public static paragraph(text: string, classes: string[] = []): HTMLParagraphElement
		{
			var p: HTMLParagraphElement = <HTMLParagraphElement>document.createElement('P');
			p.innerHTML = text;
			return <HTMLParagraphElement>HTMLUtilities.addClassList(p, classes);
		}

		public static unorderedList(classes: string[] = []): HTMLUListElement
		{
			var ul: HTMLUListElement = <HTMLUListElement>document.createElement('UL');
			return <HTMLUListElement>HTMLUtilities.addClassList(ul, classes);
		}

		public static listElement(classes: string[] = []): HTMLLIElement
		{
			var li: HTMLLIElement = <HTMLLIElement>document.createElement('LI');
			return <HTMLLIElement>HTMLUtilities.addClassList(li, classes);
		}

		public static orderedList(classes: string[] = []): HTMLOListElement
		{
			var ol: HTMLOListElement = <HTMLOListElement>document.createElement('OL');
			return <HTMLOListElement>HTMLUtilities.addClassList(ol, classes);
		}

		public static textArea(text: string, classes: string[] = []): HTMLTextAreaElement
		{
			var area: HTMLTextAreaElement = <HTMLTextAreaElement>document.createElement('TEXTAREA');
			area.value = text;
			return <HTMLTextAreaElement>HTMLUtilities.addClassList(area, classes);
		}

		public static input(value: string, type: string, classes: string[] = []): HTMLInputElement
		{
			var input: HTMLInputElement = <HTMLInputElement>document.createElement('INPUT');
			input.type = type;
			input.value = value;
			return <HTMLInputElement>HTMLUtilities.addClassList(input, classes);
		}

		public static span(text: string, classes: string[]): HTMLSpanElement
		{
			var span: HTMLSpanElement = <HTMLSpanElement>document.createElement('SPAN');
			span.innerHTML = text;
			return <HTMLInputElement>HTMLUtilities.addClassList(span, classes);
		}


		public static appendList(element: HTMLElement, list: HTMLElement[] = []): HTMLElement
		{
			while (list.length > 0)
			{
				element.appendChild(list.shift());
			}
			return element;
		}

		public static addClassList(element: HTMLElement, classList: string[] = []): HTMLElement
		{
			if (classList.length > 0) element.className = classList.join(' ');
			return element;
		}
	}
}