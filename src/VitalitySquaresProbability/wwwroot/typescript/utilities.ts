
export function copyObject<T>(obj : T) : T {
    var objectCopy = <T>{};

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            objectCopy[key] = obj[key];
        }
    }

    return objectCopy;
}