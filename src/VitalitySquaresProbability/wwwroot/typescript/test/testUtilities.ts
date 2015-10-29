

declare var Reflect;

export function getComponentMetadata(component) {
    return Reflect.getMetadata("annotations", component)[0];
}
