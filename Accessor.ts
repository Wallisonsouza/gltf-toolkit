import { AcessorDataType, GLTF, GLTFComponentType, GLTFIdentifier } from "./GLTFSchema";

function getNumComponents(type: GLTFIdentifier): number {
    switch (type) {
        case GLTFIdentifier.SCALAR: return 1;
        case GLTFIdentifier.VEC2: return 2;
        case GLTFIdentifier.VEC3: return 3;
        case GLTFIdentifier.VEC4: return 4;
        case GLTFIdentifier.MAT2: return 4;
        case GLTFIdentifier.MAT3: return 9;
        case GLTFIdentifier.MAT4: return 16;
        default: {
            console.error(`Tipo inválido recebido: ${type}`);
            throw new Error('Tipo inválido');
        }
    }
}

export function getAccessorData(gltf: GLTF, accessorIndex: number, buffer: ArrayBuffer): AcessorDataType {
    const accessor = gltf.accessors[accessorIndex];
    const bufferView = gltf.bufferViews[accessor.bufferView];

    const byteOffset = (bufferView.byteOffset || 0) + (accessor.byteOffset || 0);
    const numComponents = getNumComponents(accessor.type);
    const elementCount = accessor.count * numComponents;

    switch (accessor.componentType) {
        case GLTFComponentType.FLOAT:
            return new Float32Array(buffer, byteOffset, elementCount);
        case GLTFComponentType.UNSIGNED_SHORT:
            return new Uint16Array(buffer, byteOffset, elementCount);
        case GLTFComponentType.UNSIGNED_INT:
            return new Uint32Array(buffer, byteOffset, elementCount);
        case GLTFComponentType.BYTE:
            return new Int8Array(buffer, byteOffset, elementCount);
        case GLTFComponentType.UNSIGNED_BYTE:
            return new Uint8Array(buffer, byteOffset, elementCount);
        case GLTFComponentType.SHORT:
            return new Int16Array(buffer, byteOffset, elementCount);
        default:
            throw new Error(`Componente não suportado: ${accessor.componentType}`);
    }
}