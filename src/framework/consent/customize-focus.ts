let customizeFocusRequested = false;

export function requestCustomizeFocus(): void {
  customizeFocusRequested = true;
}

export function consumeCustomizeFocus(): boolean {
  if (!customizeFocusRequested) return false;
  customizeFocusRequested = false;
  return true;
}
