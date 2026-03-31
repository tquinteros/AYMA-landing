declare module "sortablejs" {
  interface SortableOptions {
    animation?: number;
    handle?: string;
    ghostClass?: string;
    chosenClass?: string;
    dragClass?: string;
    forceFallback?: boolean;
    fallbackOnBody?: boolean;
    fallbackTolerance?: number;
    delay?: number;
    delayOnTouchOnly?: boolean;
    touchStartThreshold?: number;
    onEnd?: (evt: SortableEvent) => void;
  }

  interface SortableEvent {
    oldIndex?: number;
    newIndex?: number;
    item: HTMLElement;
  }

  interface SortableInstance {
    destroy(): void;
  }

  const Sortable: {
    create(el: HTMLElement, options?: SortableOptions): SortableInstance;
  };

  export default Sortable;
}
