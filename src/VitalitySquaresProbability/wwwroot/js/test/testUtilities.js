function getComponentMetadata(component) {
    return Reflect.getMetadata("annotations", component)[0];
}
exports.getComponentMetadata = getComponentMetadata;
