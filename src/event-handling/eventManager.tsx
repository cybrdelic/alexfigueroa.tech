type ListenerType = 'click' | 'mouseover' | 'mouseout' | 'mousedown' | 'mouseup' | 'mousemove'; // Extend this as necessary
type EventCallback = (event: Event) => void;

interface Listeners {
    [key: string]: {
        [type in ListenerType]?: EventCallback[];
    };
}

interface EventListenerOptions extends AddEventListenerOptions {
    priority?: number; // If you want to implement a priority system later
}

class EventManager {
    private listeners: Listeners;

    constructor() {
        this.listeners = {};
    }

    register(element: Element, type: ListenerType, callback: EventCallback, options: EventListenerOptions = {}) {
        const elementKey = element.toString(); // Convert element reference to a string key. Alternatively, use a WeakMap for listeners.

        if (!this.listeners[elementKey]) {
            this.listeners[elementKey] = {};
        }

        if (!this.listeners[elementKey][type]) {
            this.listeners[elementKey][type] = [];
        }

        // Avoid adding duplicates
        if (!this.listeners[elementKey][type]!.includes(callback)) {
            this.listeners[elementKey][type]!.push(callback);
            element.addEventListener(type, callback, options);
        }
    }

    deregister(element: Element | null, type: ListenerType, callback: EventCallback) {
        const elementKey = element?.toString();

        if (elementKey && this.listeners[elementKey] && this.listeners[elementKey][type]) {
            const index = this.listeners[elementKey][type]!.indexOf(callback);
            if (index !== -1) {
                element?.removeEventListener(type, callback);
                this.listeners[elementKey][type]!.splice(index, 1);
            }
        }
    }

    stopPropagation(e: Event) {
        e.stopPropagation();
    }

    // ... More utilities as needed
}

const eventManager = new EventManager();
export default eventManager;
