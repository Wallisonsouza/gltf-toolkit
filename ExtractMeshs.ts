import { getAccessorData } from "./Accessor";
import { ParsedMesh } from "./GLTFParsed";
import { GLTF, GLTFMesh } from "./GLTFSchema";

export function extractMeshes(meshes: GLTFMesh[], gltf: GLTF, buffer: ArrayBuffer): ParsedMesh[] {
    const parsedMeshes: ParsedMesh[] = [];

    for (const mesh of meshes) {
        const meshPrimitives = extractPrimitives(mesh, gltf, buffer);
        parsedMeshes.push(...meshPrimitives); 
    }

    return parsedMeshes;
}

function extractPrimitives(mesh: GLTFMesh, gltf: GLTF, buffer: ArrayBuffer): ParsedMesh[] {
    const parsedPrimitives: ParsedMesh[] = [];

    for (const gltfPrimitive of mesh.primitives) {
        const { attributes, indices, material } = gltfPrimitive;


        const vertices = getAccessorData(gltf, gltfPrimitive.attributes.POSITION, buffer);
        const normals = attributes.NORMAL ? getAccessorData(gltf, attributes.NORMAL, buffer) : undefined;
        const uvs = attributes.TEXCOORD_0 ? getAccessorData(gltf, attributes.TEXCOORD_0, buffer) : undefined;
        const indexData = indices ? getAccessorData(gltf, indices, buffer) : undefined;

        parsedPrimitives.push(createParsedMesh(mesh.name, vertices, normals, uvs, indexData, material));
    }

    return parsedPrimitives;
}

function createParsedMesh(
    name: string | undefined,
    vertices: Float32Array,
    normals: Float32Array | undefined,
    uvs: Float32Array | undefined,
    indices: Uint32Array | Uint16Array | undefined,
    materialId: number | undefined
): ParsedMesh {
    return {
        name: name || "Unnamed Mesh",
        vertices,
        normals,
        uvs,
        indices,
        materialIndex: materialId
    };
}
